import './index.css';
import { Composition } from 'remotion';
import { SBAVideo } from './SBAVideo/SBAVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SBAPromo"
        component={SBAVideo}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
