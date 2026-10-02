import {useEffect,useMemo,useRef,useState} from 'react';
import {Player,type PlayerRef} from '@remotion/player';
import {Salve} from './Salve';
import {LatinSentence} from './LatinSentence';
import {lesson,type WordOrder} from './lesson';
const titles=['A first animation','Three word cards','A subject relationship','An animated explanation','A reusable Player','A word-order experiment'];
export const App=()=>{
 const requested=Number(new URLSearchParams(location.search).get('step')||6);
 const step=Number.isInteger(requested)&&requested>=1&&requested<=6?requested:6;
 const [order,setOrder]=useState<WordOrder>('subject-first');const player=useRef<PlayerRef>(null);
 const [frame,setFrame]=useState(0);
 const [playing,setPlaying]=useState(false);
 useEffect(()=>{const current=player.current;if(!current)return;const update=(event:{detail:{frame:number}})=>setFrame(event.detail.frame);const play=()=>setPlaying(true),pause=()=>setPlaying(false);current.addEventListener('frameupdate',update);current.addEventListener('play',play);current.addEventListener('pause',pause);current.addEventListener('ended',pause);return()=>{current.removeEventListener('frameupdate',update);current.removeEventListener('play',play);current.removeEventListener('pause',pause);current.removeEventListener('ended',pause);};},[]);
 const props=useMemo(()=>({stage:step===5?4:step,order}),[step,order]);
 return <main>
  <header><a className="brand" href="./">Caseflow<span>LATIN SENTENCE LAB</span></a><span className="badge">Remotion · build step {step}</span></header>
  <section className="intro"><p className="eyebrow">ANIMATION → EXPLANATION → APP</p><h1>{titles[step-1]}</h1><p>{step===1?'Salve means “hello.” Play the five-second animation and watch the greeting appear.':'Predict who sees what. Then play the explanation and follow each word’s role.'}</p></section>
  {step===6&&<label className="order-label">Choose the word order<select aria-label="Choose the word order" value={order} onChange={e=>{player.current?.pause();player.current?.seekTo(0);setOrder(e.target.value as WordOrder);}}><option value="subject-first">puella rosam videt</option><option value="object-first">rosam puella videt</option></select><small>Changing the order resets the animation, paused. Press Play to inspect it.</small></label>}
  <section className="player-card" aria-label="Animation preview">{step===1?<Player ref={player} component={Salve} fps={30} durationInFrames={150} compositionWidth={1280} compositionHeight={720} moveToBeginningWhenEnded={false} style={{width:'100%'}}/>:<Player ref={player} component={LatinSentence} inputProps={props} fps={30} durationInFrames={360} compositionWidth={1280} compositionHeight={720} moveToBeginningWhenEnded={false} style={{width:'100%'}}/>}</section>
  <div className="play-note"><button onClick={()=>playing?player.current?.pause():player.current?.play()}>{playing?'Pause animation':'Play animation'}</button><button onClick={()=>{player.current?.seekTo(0);player.current?.play();}}>Replay from the beginning</button><span>Pause or scrub the timeline to inspect a moment.</span></div>
  <label className="timeline">Animation timeline<input aria-label="Animation timeline" type="range" min="0" max={step===1?149:359} value={frame} onChange={e=>{player.current?.pause();player.current?.seekTo(Number(e.target.value));}}/><small>Frame {frame} · 30 frames per second</small></label>
  {step>=4&&<section className="meaning"><div><p className="eyebrow">THE CORE MEANING</p><h2>{lesson.translation}</h2></div><p>{lesson.note}</p></section>}
  {step>=3&&<section className="role-key" aria-label="Readable grammar key">{lesson.tokens.filter(t=>step>=4||t.role==='subject').map(t=><p key={t.id}><strong>{t.id} → {t.role}</strong><br/><span>{t.detail}</span></p>)}</section>}
  <section className="steps"><h2>Follow the six build steps</h2><nav aria-label="Build checkpoints">{titles.map((title,i)=><a key={title} href={`?step=${i+1}`} aria-current={step===i+1?'step':undefined}><span>{i+1}</span>{title}</a>)}</nav></section>
  <details><summary>Grammar record and references</summary><p>This app illustrates one reviewed sentence. It does not analyze new Latin.</p><ul>{lesson.tokens.map(t=><li key={t.id}><strong>{t.id}</strong>: {t.meaning}; {t.role}; {t.detail}.</li>)}</ul><p>Nominative is the analysis of puella in this sentence. An unmarked ending alone does not settle every possible Latin analysis.</p><ul>{lesson.sources.map((url,i)=><li key={url}><a href={url} target="_blank" rel="noreferrer">{['Nominative subject (§339)','Accusative direct object (§387)','Latin word order'][i]}</a></li>)}</ul></details>
  <footer>A prepared learning demonstration for Dr. Plate’s Level 2A class. Predict, play, inspect, explain.</footer>
 </main>;
};
