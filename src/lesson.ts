export type WordOrder = 'subject-first' | 'object-first';
export const lesson = {
  translation: 'The girl sees the rose.',
  tokens: [
    {id:'puella',stem:'puell',ending:'a',role:'subject',detail:'nominative singular',meaning:'the girl',color:'#305bcc'},
    {id:'rosam',stem:'ros',ending:'am',role:'object',detail:'accusative singular',meaning:'the rose',color:'#a44723'},
    {id:'videt',stem:'vide',ending:'t',role:'verb',detail:'present · third-person singular',meaning:'sees',color:'#21705a'}
  ],
  note: 'In these two versions, the subject and object stay the same. Word order can change emphasis. These endings are not universal rules for every Latin word.',
  sources: ['https://dcc.dickinson.edu/grammar/latin/nominative','https://dcc.dickinson.edu/grammar/latin/accusative-direct-object','https://dcc.dickinson.edu/grammar/latin/order-words']
} as const;
// One movement changes positions, not the grammatical identities.
export function geometry(frame:number,order:WordOrder,stage:number){
  const t=stage>=6&&order==='object-first'?Math.max(0,Math.min(1,(frame-210)/60)):0;
  const ease=t*t*(3-2*t),lift=Math.sin(Math.PI*t)*110;
  const positions={puella:{x:285+355*ease,y:300-lift},rosam:{x:640-355*ease,y:300+lift},videt:{x:995,y:300}};
  return {positions,lift,connections:[
    {from:'puella',to:'videt',x1:positions.puella.x,y1:positions.puella.y,x2:995,y2:300,bend:210,label:'subject',color:'#305bcc'},
    {from:'rosam',to:'videt',x1:positions.rosam.x,y1:positions.rosam.y+120,x2:995,y2:420,bend:540,label:'object',color:'#a44723'}
  ]};
}
