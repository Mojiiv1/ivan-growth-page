import {createRequire} from 'node:module';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true});
const root='http://127.0.0.1:4173/';
const languages=['en','fr','ar'],routes=['home','services','bridal','gallery','locations'],sizes=[320,390,768,1280];
const results=[],errors=[];
await mkdir('qa',{recursive:true});
try{
 for(const lang of languages)for(const route of routes)for(const width of sizes){
   const page=await browser.newPage({viewport:{width,height:900}});
   page.on('pageerror',err=>errors.push(err.message));
   await page.goto(root+'#/'+lang+'/'+route,{waitUntil:'domcontentloaded'});
   await page.locator('h1').waitFor({timeout:10000});
   const v=await page.evaluate(()=>({
     width:document.documentElement.clientWidth,
     scroll:document.documentElement.scrollWidth,
     lang:document.documentElement.lang,
     dir:document.documentElement.dir,
     h1:document.querySelectorAll('main h1').length,
     book:[...document.querySelectorAll('main a')].some(a=>a.href==='https://ivanbeauty.com/booking/'),
     missing:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)
   }));
   assert.equal(v.lang,lang);
   assert.equal(v.dir,lang==='ar'?'rtl':'ltr');
   assert.equal(v.h1,1);
   assert(v.book,lang+'/'+route+' missing booking link');
   assert(v.scroll<=v.width+1,lang+'/'+route+'/'+width+' horizontal overflow '+v.scroll);
   assert.equal(v.missing.length,0,lang+'/'+route+' broken image '+v.missing);
   if(lang==='en'&&route==='home'&&width===390)await page.screenshot({path:'qa/v2-mobile-390.png',fullPage:true});
   if(lang==='en'&&route==='home'&&width===1280)await page.screenshot({path:'qa/v2-desktop-1280.png',fullPage:true});
   results.push({lang,route,width,status:'pass'});
   await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:800}});
 await page.goto(root+'#/en/home');
 await page.locator('[data-lang=fr]').click();
 assert.equal(await page.locator('html').getAttribute('lang'),'fr');
 await page.locator('[data-lang=ar]').click();
 assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
 await page.locator('#menu-toggle').click();
 assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
 assert.equal(errors.length,0,'browser JavaScript errors: '+errors.join(', '));
 await writeFile('qa/v2-results.json',JSON.stringify({status:'pass',cases:results.length,languageToggle:'pass',mobileMenu:'pass',errors},null,2));
 console.log('V2 QA passed:',results.length,'viewport-language-route cases');
 }catch(e){await writeFile('qa/v2-failure.json',JSON.stringify({error:e.message,errors,passed:results.length},null,2));throw e}finally{await browser.close()}
