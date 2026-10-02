import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {geometry,lesson,type WordOrder} from './lesson';
export type SentenceProps={stage:number;order:WordOrder};
export const LatinSentence=({stage,order}:SentenceProps)=>{
 const frame=useCurrentFrame();const {positions,lift,connections}=geometry(frame,order,stage);
 const fade=(start:number)=>interpolate(frame,[start,start+30],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const subject=stage>=3?fade(55):0,object=stage>=4?fade(110):0;
 return <AbsoluteFill data-frame={frame} data-order={order} style={{backgroundColor:'#f6f2e9',color:'#253b43',fontFamily:'system-ui'}}>
  <div style={{position:'absolute',left:65,top:43,fontSize:23,letterSpacing:4,color:'#6c797d'}}>CASEFLOW · A CHECKED SENTENCE</div>
  <div style={{position:'absolute',left:65,top:88,fontFamily:'Georgia,serif',fontSize:48}}>Which word is doing the seeing?</div>
  <svg width="1280" height="720" style={{position:'absolute',inset:0}} aria-label="Grammatical relationships">
   <defs>{connections.map(c=><marker key={c.from} id={'arrow-'+c.from} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill={c.color}/></marker>)}</defs>
   {connections.map((c,i)=><g key={c.from} opacity={i===0?subject:object}>
    <path data-connection={c.from} data-to={c.to} data-x1={c.x1} data-y1={c.y1} data-x2={c.x2} data-y2={c.y2} d={`M ${c.x1} ${c.y1} C ${c.x1} ${c.bend}, ${c.x2} ${c.bend}, ${c.x2} ${c.y2}`} fill="none" stroke={c.color} strokeWidth="4" markerEnd={'url(#arrow-'+c.from+')'}/>
    <text x={(c.x1+c.x2)/2} y={i===0?245:505} textAnchor="middle" fill={c.color} fontSize="24" fontWeight="650">{c.label}</text>
   </g>)}
  </svg>
  {lesson.tokens.map(token=>{
   const opacity=token.role==='subject'?subject:object,p=positions[token.id];
   return <div key={token.id} data-token-id={token.id} data-x={p.x} data-y={p.y} style={{position:'absolute',left:p.x-142,top:p.y,width:284,height:120,backgroundColor:'#fffef9',border:'2px solid #d9ded7',borderRadius:17,textAlign:'center'}}>
    <div style={{marginTop:20,fontSize:62,fontFamily:'Georgia,serif'}}>{token.stem}<span style={{color:opacity?token.color:'#253b43',textDecoration:opacity?'underline':'none',textUnderlineOffset:9,textDecorationThickness:4}}>{token.ending}</span></div>
    <div style={{position:'absolute',top:128,width:'100%',color:token.color,opacity,fontSize:26,fontWeight:650}}>{token.role}</div>
    <div style={{position:'absolute',top:230,width:'100%',color:token.color,opacity:opacity*(1-lift/110),fontSize:22}}>{token.detail}</div>
   </div>;
  })}
  {stage>=4&&<div style={{position:'absolute',left:65,right:65,top:590,opacity:fade(160),fontFamily:'Georgia,serif',fontSize:42}}>{lesson.translation}</div>}
  {stage>=6&&<div style={{position:'absolute',left:65,right:65,top:657,opacity:fade(285),fontSize:22,color:'#566e74'}}>Same subject and object. Word order can change emphasis.</div>}
 </AbsoluteFill>;
};
