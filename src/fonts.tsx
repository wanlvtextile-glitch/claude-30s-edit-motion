import { useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

const CSS = `
@font-face {
  font-family: 'WenKai';
  src: url('${staticFile('fonts/WenKai-Regular.woff2')}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'WenKai';
  src: url('${staticFile('fonts/WenKai-Medium.woff2')}') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'KuaiLe';
  src: url('${staticFile('fonts/ZCOOL-KuaiLe.woff2')}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Caveat';
  src: url('${staticFile('fonts/Caveat.woff2')}') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: block;
}
`;

let loaded = false;

export const FontLoader: React.FC = () => {
  const [handle] = useState(() => (loaded ? null : delayRender('Loading handwriting fonts')));
  const [done, setDone] = useState(loaded);

  useEffect(() => {
    if (done) {
      return;
    }
    const run = async () => {
      await Promise.all([
        document.fonts.load('400 16px WenKai', '剪辑调整'),
        document.fonts.load('600 16px WenKai', '剪辑调整'),
        document.fonts.load('16px KuaiLe', '拿捏'),
        document.fonts.load('16px Caveat', 'Opus'),
      ]);
      loaded = true;
      setDone(true);
      if (handle !== null) {
        continueRender(handle);
      }
    };
    run();
  }, [done, handle]);

  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
};
