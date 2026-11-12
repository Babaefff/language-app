// Disposable PostgreSQL-compatible database; never connects to production.
const { PGlite } = await import(process.env.PGLITE_MODULE ?? '@electric-sql/pglite');
import fs from 'node:fs';
import assert from 'node:assert/strict';
const db=new PGlite();
await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key,email text,created_at timestamptz default now(),last_sign_in_at timestamptz); create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid$$; grant usage on schema auth to authenticated;`);
const root=new URL('../', import.meta.url).pathname;await db.exec(fs.readFileSync(root+'supabase/schema.sql','utf8'));await db.exec(fs.readFileSync(root+'supabase/migrations/20261112_security_fixes.sql','utf8'));
const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222';
await db.exec(`insert into auth.users(id,email) values('${a}','a@example.test'),('${b}','b@example.test');insert into public.admins values('${b}'); grant select, insert, update, delete on all tables in schema public to authenticated;set role authenticated;set request.jwt.claim.sub='${a}';`);
for(let i=0;i<30;i++)await db.query(`insert into public.feedback(user_id,lang,category,created_at) values($1,'es','other','2000-01-01')`,[a]);
await assert.rejects(()=>db.query(`insert into public.feedback(user_id,lang,category) values($1,'es','other')`,[a]),/Too many reports/);
assert.equal((await db.query(`select count(*)::int n from feedback where created_at>now()-interval '1 day'`)).rows[0].n,30);
await db.query(`insert into progress(user_id,lang,data) values($1,'es',$2)`,[a,{units:[],cards:{x:{interval:'NaN',due:'wrong',lapses:'9'.repeat(1000)}}}]);
await db.exec(`set request.jwt.claim.sub='${b}'`);assert.equal((await db.query('select * from admin_learners()')).rows.length,2);
await db.exec(`set request.jwt.claim.sub='${a}'`);await assert.rejects(()=>db.query('select * from admin_learners()'),/Only admins/);
await db.query('select delete_cloud_progress(auth.uid())');assert.equal((await db.query('select * from progress')).rows.length,0);
await assert.rejects(()=>db.query(`insert into progress(user_id,lang,data) values($1,'es','{}')`,[a]),/CLOUD_PROGRESS_PAUSED/);
assert.equal((await db.query('select cloud_progress_paused() paused')).rows[0].paused,true);
await assert.rejects(()=>db.query(`update progress_sync_controls set paused=false where user_id=$1 returning *`,[a]).then(r=>{if(r.rows.length===0)throw new Error('RLS blocked');}),/RLS blocked/);
await db.exec(`set request.jwt.claim.sub='${b}';select resume_cloud_progress(auth.uid());set request.jwt.claim.sub='${a}';`);assert.equal((await db.query('select cloud_progress_paused() paused')).rows[0].paused,true);
await assert.rejects(()=>db.query('select resume_cloud_progress($1)',[b]),/Account changed/);
await db.query('select resume_cloud_progress(auth.uid())');await db.query(`insert into progress(user_id,lang,data) values($1,'es','{}')`,[a]);
// INSERT ON CONFLICT DO NOTHING needs no update policy and cannot edit another result.
await db.exec('reset role');await db.query(`insert into personal_sets(id,lang,title,content) values($1,'es','Test','{}')`,[b]);await db.query('insert into personal_access(set_id,user_id) values($1,$2)',[b,a]);await db.exec(`set role authenticated;set request.jwt.claim.sub='${a}'`);
for(let i=0;i<2;i++)await db.query(`insert into personal_results(id,user_id,set_id,test_id,score,total) values($1,$1,$2,'test',1,1) on conflict(id) do nothing`,[a,b]);assert.equal((await db.query('select count(*)::int n from personal_results')).rows[0].n,1);
console.log('PASS: migration re-run, enforced feedback timestamps/quota, malformed admin JSON, authorization, durable deletion, explicit resume, idempotent result insertion with RLS.');await db.close();
