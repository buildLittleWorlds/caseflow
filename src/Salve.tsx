import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
export const Salve=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill data-frame={frame} style={{backgroundColor:'#f6f2e9',color:'#253b43',justifyContent:'center',alignItems:'center',fontFamily:'Georgia,serif'}}>
  <div style={{fontSize:150,opacity:interpolate(frame,[0,fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Salve!</div>
  <div style={{fontFamily:'system-ui',fontSize:32,marginTop:30,opacity:interpolate(frame,[30,60],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>A greeting. A frame. A first animation.</div>
 </AbsoluteFill>;
};
