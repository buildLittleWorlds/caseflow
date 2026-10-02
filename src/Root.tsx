import {Composition} from 'remotion';
import {Salve} from './Salve';
import {LatinSentence} from './LatinSentence';
export const RemotionRoot=()=> <>
 <Composition id="Salve" component={Salve} durationInFrames={150} fps={30} width={1280} height={720}/>
 <Composition id="LatinCards" component={LatinSentence} durationInFrames={360} fps={30} width={1280} height={720} defaultProps={{stage:2,order:'subject-first'}}/>
 <Composition id="LatinSubject" component={LatinSentence} durationInFrames={360} fps={30} width={1280} height={720} defaultProps={{stage:3,order:'subject-first'}}/>
 <Composition id="LatinSentence" component={LatinSentence} durationInFrames={360} fps={30} width={1280} height={720} defaultProps={{stage:4,order:'subject-first'}}/>
 <Composition id="Caseflow" component={LatinSentence} durationInFrames={360} fps={30} width={1280} height={720} defaultProps={{stage:6,order:'object-first'}}/>
</>;
