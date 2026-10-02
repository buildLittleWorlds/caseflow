import test from 'node:test';
import assert from 'node:assert/strict';
import {geometry,lesson} from '../src/lesson';
test('reviewed word forms have their fixed roles and full translation',()=>{
 assert.deepEqual(lesson.tokens.map(t=>[t.stem+t.ending,t.role]),[['puella','subject'],['rosam','object'],['videt','verb']]);
 assert.equal(lesson.translation,'The girl sees the rose.');
});
test('the second order exchanges positions while preserving identities',()=>{
 const first=geometry(359,'subject-first',6),second=geometry(359,'object-first',6);
 assert.equal(first.positions.puella.x,second.positions.rosam.x);
 assert.equal(first.positions.rosam.x,second.positions.puella.x);
 assert.deepEqual(first.positions.videt,second.positions.videt);
});
test('all intermediate connection endpoints track the actual card positions',()=>{
 for(let frame=0;frame<360;frame++){
  const g=geometry(frame,'object-first',6);
  for(const c of g.connections){
   const token=g.positions[c.from as keyof typeof g.positions];
   assert.equal(c.x1,token.x);assert.equal(c.y1,token.y+(c.from==='rosam'?120:0));
   assert.equal(c.x2,g.positions.videt.x);assert.equal(c.y2,g.positions.videt.y+(c.from==='rosam'?120:0));
  }
 }
});
test('swapping word cards do not overlap at any frame',()=>{
 for(let frame=0;frame<360;frame++){
  const {puella,rosam}=geometry(frame,'object-first',6).positions;
  assert.ok(Math.abs(puella.x-rosam.x)>=284||Math.abs(puella.y-rosam.y)>=120,`overlap at ${frame}`);
 }
});
test('earlier checkpoints stay stationary and geometry is seek-deterministic',()=>{
 for(const stage of [2,3,4,5]) assert.deepEqual(geometry(359,'object-first',stage).positions,geometry(0,'subject-first',stage).positions);
 assert.deepEqual(geometry(240,'object-first',6),geometry(240,'object-first',6));
});
