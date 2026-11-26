import { Composition } from 'remotion';
import { DURATION, FPS, H, W } from './theme';
import { Video } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="OpusEdit" component={Video} durationInFrames={DURATION} fps={FPS} width={W} height={H} />
    </>
  );
};
