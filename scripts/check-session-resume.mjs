// Run against the local development server only; personal accounts are mocked.
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:5176';
if (!['127.0.0.1', 'localhost'].includes(new URL(BASE).hostname)) throw new Error('Use a local test server');
{
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:950}});let errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await p.goto(`${BASE}/#/unit/a1-02`);await p.getByRole('button',{name:/Start lesson/}).click();
for(let i=0;i<3;i++)await p.getByRole('button',{name:'Next',exact:true}).click();
const word=await p.locator('.learn-es').textContent();await p.reload();await p.getByRole('button',{name:'Resume session',exact:true}).click();assert.equal(await p.locator('.learn-es').textContent(),word);
await p.getByRole('button',{name:'Exit',exact:true}).click();await p.getByRole('button',{name:'Resume session',exact:true}).click();assert.equal(await p.locator('.learn-es').textContent(),word);
await p.goto(`${BASE}/#/`);await p.getByRole('link',{name:'Resume session',exact:true}).click();await p.getByRole('button',{name:'Start over',exact:true}).click();await p.getByRole('button',{name:/Start lesson/}).click();assert.equal(await p.locator('.learn-es').textContent(),'cero');
// Enter the quiz and reload while feedback is shown.
await p.reload();await p.getByRole('button',{name:'Resume session',exact:true}).click();
while(await p.getByRole('button',{name:'Next',exact:true}).count())await p.getByRole('button',{name:'Next',exact:true}).click();
await p.getByRole('button',{name:'Start quiz',exact:true}).click();await p.locator('.options button').first().click();await p.locator('.feedback').waitFor();
const feedback=await p.locator('.feedback').innerText();const records=await p.evaluate(()=>JSON.parse(localStorage.getItem('hablo:progress:v1')).learning);
await p.reload();await p.getByRole('button',{name:'Resume session',exact:true}).click();assert.equal(await p.locator('.feedback').innerText(),feedback);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('hablo:progress:v1')).learning),records);
await p.getByRole('button',{name:'Continue',exact:true}).click();assert.equal(await p.locator('.feedback').count(),0);
console.log('PASS flashcards, pause/resume, home shortcut, start over, submitted feedback and learning history preserved.');console.log('errors',errors);assert.deepEqual(errors,[]);await b.close();

}
{
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',headless:true,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(`${BASE}/#/review`);await p.getByRole('heading',{name:'Review',exact:true}).waitFor();
await p.evaluate(async()=>{const s=await import('/src/lib/store.ts');s.gradeWord('cero',0);s.gradeWord('uno',0);const x=s.getProgress();for(const c of Object.values(x.cards))c.due=0;s.replaceProgress(x);});await p.reload();
await p.getByRole('button',{name:/Recall with flashcards/}).click().catch(async e=>{ console.log(await p.locator('body').innerText()); throw e; });await p.getByRole('button',{name:'Reveal meaning'}).click();await p.getByRole('button',{name:/Good/}).click();const word=await p.locator('.learn-es').textContent();const cards=await p.evaluate(()=>JSON.parse(localStorage.getItem('hablo:progress:v1')).cards);
await p.reload();await p.getByRole('button',{name:'Resume session'}).click();assert.equal(await p.locator('.learn-es').textContent(),word);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('hablo:progress:v1')).cards),cards);
assert(!await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
// New profile for a daily lesson with no reviews due.
const d=await b.newPage();d.on('pageerror',e=>errors.push(e.message));await d.goto(`${BASE}/#/daily`);await d.getByRole('button',{name:'Begin daily session'}).click();await d.getByRole('button',{name:'Next',exact:true}).click();const dailyWord=await d.locator('.learn-es').textContent();
const plan=await d.evaluate(()=>JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>k.startsWith('hablo:session:')))).fields.daily.plan);
await d.reload();await d.getByRole('button',{name:'Resume session'}).click();assert.equal(await d.locator('.learn-es').textContent(),dailyWord);assert.deepEqual(await d.evaluate(()=>JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>k.startsWith('hablo:session:')))).fields.daily.plan),plan);
assert.deepEqual(errors,[]);console.log('PASS review position/rating not replayed, daily frozen plan and lesson position, mobile fit.');await b.close();

}
{
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',headless:true,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route('**/resume-fixture.html',r=>r.fulfill({contentType:'text/html',body:`<html><head><link rel="stylesheet" href="/src/styles.css"/></head><body><div id="root"></div><script type="module">import RefreshRuntime from '/@react-refresh';RefreshRuntime.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;await import('/scripts/fixtures/resume.tsx');</script></body></html>`}));
await p.route('**/src/lib/sync.ts*',r=>r.fulfill({contentType:'application/javascript',body:`
const uid=localStorage.getItem('test:owner')??'alice';const user={id:uid};export const accountsEnabled=true;export const useSync=()=>({user,status:'synced'});
const content={lessons:[],tests:[{id:'exam',title:'Resume exam',exam:{minutes:5,pass:50},questions:[{type:'type',q:'one',answer:'uno'},{type:'build',q:'I am Ana',answer:'Soy Ana'},{type:'choice',q:'two',options:['dos','tres'],answer:0}]}]};
export async function supabase(){return {auth:{getSession:async()=>({data:{session:{user}}})},from:(table)=>({select:()=>({eq:()=>table==='personal_access'?Promise.resolve({data:uid==='alice'?[{set_id:'set-a',tab_name:'Private'}]:[]}):({order:()=>({limit:async()=>({data:[]})})}),in:async()=>({data:[{id:'set-a',lang:'es',title:'My material',content}]})}),upsert:async(row)=>{const rows=JSON.parse(localStorage.getItem('test:results')??'[]');if(!rows.some(r=>r.id===row.id))rows.push(row);localStorage.setItem('test:results',JSON.stringify(rows));return {error:null};}})}};
`}));
await p.goto(`${BASE}/resume-fixture.html`);await p.getByRole('button',{name:/Start the exam/}).click();
const read=()=>p.evaluate(()=>JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>k.startsWith('hablo:session:')))).fields);
const initial=await read();let seenType=false,seenBuild=false;
for(let j=0;j<3;j++){
 const fields=await read();const ex=fields['session:queue'][fields['session:index']];
 if(ex.kind==='type'){
  await p.locator('.answer-form input').fill('un');await p.reload();await p.getByRole('button',{name:'Resume session'}).click();assert.equal(await p.locator('.answer-form input').inputValue(),'un');assert.equal((await read()).personal.started,initial.personal.started);await p.locator('.answer-form input').fill(ex.answer);await p.getByRole('button',{name:'Check',exact:true}).click();seenType=true;
 }else if(ex.kind==='build'){
  const tiles=ex.tiles;const words=ex.es.split(' ');await p.locator('.tile').filter({hasText:words[0]}).last().click();await p.reload();await p.getByRole('button',{name:'Resume session'}).click();assert.equal((await read())['answer:'+fields['session:index']+':tiles'].length,1);
  for(const w of words.slice(1))await p.getByRole('button',{name:w,exact:true}).last().click();await p.getByRole('button',{name:'Check',exact:true}).click();seenBuild=true;
 }else await p.locator('.options button').filter({hasText:ex.answer}).click();
 await p.locator('.feedback').waitFor();await p.reload();await p.getByRole('button',{name:'Resume session'}).click();await p.getByRole('button',{name:'Continue',exact:true}).click().catch(async e=>{console.log(await p.locator('body').innerText());console.log(await read());throw e;});
}
await p.getByText('Your result is saved.',{exact:true}).waitFor();assert(seenType&&seenBuild);const result=await p.evaluate(()=>JSON.parse(localStorage.getItem('test:results')));assert.equal(result.length,1);assert.equal(result[0].score,3);assert.equal(result[0].answers.length,3);
const xp=await p.evaluate(()=>JSON.parse(localStorage.getItem('hablo:progress:v1:user:alice')).xp);await p.reload();await p.getByRole('button',{name:/Start the exam/}).waitFor();assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('hablo:progress:v1:user:alice')).xp),xp);assert.equal(await p.getByRole('button',{name:'Resume session'}).count(),0);
await p.getByRole('button',{name:/Start the exam/}).click();await p.evaluate(()=>localStorage.setItem('test:owner','bob'));await p.reload();await p.getByText('There’s nothing here for this language yet.').waitFor();assert.equal(await p.getByRole('button',{name:'Resume session'}).count(),0);
assert.deepEqual(errors,[]);console.log('PASS timed personal exam, typed/tile drafts, feedback, full score, single result/XP award, completed draft removal, account isolation.');await b.close();

}