import React from 'react';
import { AbsoluteFill, Audio, Easing, interpolate, spring, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT } from './theme';
import { Editor, SliderValues, Tab, SceneKey, sliderGeom, formatTimecode } from './components/Editor';
import { Frame, HLine, OutlinedText, SpeechBubble, KeyCap, Stamp, Tape, Sparkle } from './components/Sketch';
import { Mascot, Pose } from './components/Mascot';
import { SceneArt } from './art/Scenes';
import { FontLoader } from './fonts';

const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const ease = Easing.inOut(Easing.cubic);

const seg = (f: number, a: number, b: number, from: number, to: number, easing = ease) =>
  interpolate(f, [a, b], [from, to], { ...clamp, easing });

const pop = (f: number, at: number, damping = 14) =>
  spring({ frame: f - at, fps: 30, config: { damping, stiffness: 160, mass: 0.7 } });

const Camera: React.FC<{ frame: number; children: React.ReactNode }> = ({ frame, children }) => {
  const keys = [
    { f: 42, s: 1.04, x: 640, y: 360 },
    { f: 62, s: 1.0, x: 640, y: 360 },
    { f: 150, s: 1.04, x: 650, y: 340 },
    { f: 160, s: 1.38, x: 640, y: 560 },
    { f: 186, s: 1.42, x: 650, y: 565 },
    { f: 214, s: 1.18, x: 400, y: 300 },
    { f: 246, s: 1.22, x: 470, y: 290 },
    { f: 272, s: 1.14, x: 560, y: 300 },
    { f: 318, s: 1.1, x: 600, y: 310 },
    { f: 352, s: 1.0, x: 640, y: 360 },
    { f: 392, s: 1.04, x: 700, y: 330 },
    { f: 452, s: 1.22, x: 850, y: 300 },
    { f: 500, s: 1.16, x: 780, y: 320 },
    { f: 552, s: 1.02, x: 700, y: 340 },
    { f: 620, s: 1.0, x: 640, y: 360 },
    { f: 678, s: 1.0, x: 660, y: 350 },
    { f: 760, s: 1.04, x: 760, y: 330 },
    { f: 786, s: 1.0, x: 640, y: 360 },
    { f: 900, s: 0.97, x: 640, y: 360 },
  ];
  const pick = (k: 's' | 'x' | 'y') =>
    interpolate(
      frame,
      keys.map((v) => v.f),
      keys.map((v) => v[k]),
      { ...clamp, easing: ease }
    );
  const s = pick('s');
  const fx = pick('x');
  const fy = pick('y');
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
        transform: `translate(${640 - s * fx}px, ${360 - s * fy}px) scale(${s})`,
        transformOrigin: '0 0',
      }}
    >
      {children}
    </div>
  );
};

const Terminal: React.FC<{ frame: number }> = ({ frame }) => {
  const full = '$ 小克 帮我剪条 30 秒的片';
  const chars = Math.floor(seg(frame, 4, 30, 0, full.length, Easing.linear));
  const done = frame > 32;
  const cmd = full.slice(0, chars);
  const cursorOn = Math.floor(frame / 8) % 2 === 0;
  return (
    <div style={{ position: 'absolute', left: 340, top: 236, width: 600, height: 232 }}>
      <Frame style={{ left: 0, top: 0, width: 600, height: 210 }} radius={16} fill="#FDFBF4" border={2.6}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 34,
            background: '#F1EBDD',
            borderBottom: `1.6px solid ${C.ink}`,
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          }}
        >
          <div style={{ position: 'absolute', left: 16, top: 12, display: 'flex', gap: 6 }}>
            {['#DE6E60', '#E7BC57', '#82BC8D'].map((col) => (
              <div key={col} style={{ width: 9, height: 9, borderRadius: 9, background: col, border: `1.2px solid ${C.ink}` }} />
            ))}
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 9, textAlign: 'center', fontFamily: FONT.body, fontSize: 12, color: C.inkSoft }}>
            小克 cli — 终端
          </div>
        </div>
        <div style={{ position: 'absolute', left: 30, top: 54, fontFamily: FONT.mono, fontSize: 14, color: C.inkFaint }}>1</div>
        <div style={{ position: 'absolute', left: 54, top: 50 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 17, color: C.ink }}>{cmd}</span>
          {(!done || cursorOn) && (
            <span
              style={{
                display: 'inline-block',
                width: 9,
                height: 19,
                marginLeft: 3,
                background: C.red,
                transform: 'translateY(3px)',
                opacity: done ? (cursorOn ? 1 : 0.2) : 1,
              }}
            />
          )}
        </div>
        <div style={{ position: 'absolute', left: 30, top: 94, fontFamily: FONT.mono, fontSize: 14, color: C.inkFaint }}>2</div>
        {done && (
          <div style={{ position: 'absolute', left: 54, top: 90, fontFamily: FONT.mono, fontSize: 14, color: '#4B8A62', opacity: seg(frame, 33, 40, 0, 1) }}>
            ✔ 已载入 4 段素材 · 打开剪辑器
          </div>
        )}
        <div style={{ position: 'absolute', left: 30, top: 134, fontFamily: FONT.mono, fontSize: 14, color: C.inkFaint }}>3</div>
      </Frame>
    </div>
  );
};

const StickyNote: React.FC<{ frame: number; at: number }> = ({ frame, at }) => {
  const p = pop(frame, at, 16);
  const opacity = seg(frame, at, at + 10, 0, 1);
  const line2 = seg(frame, at + 14, at + 24, 0, 1);
  const line3 = seg(frame, at + 24, at + 34, 0, 1);
  const underline = seg(frame, at + 30, at + 40, 0, 1);
  const footer = seg(frame, at + 40, at + 50, 0, 1);
  return (
    <div
      style={{
        position: 'absolute',
        left: 44,
        top: 132,
        width: 396,
        height: 340,
        transform: `rotate(-2deg) scale(${0.9 + 0.1 * p})`,
        opacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FFFDF6',
          border: `2px solid ${C.ink}`,
          borderRadius: 6,
          boxShadow: '0 10px 24px rgba(49,46,40,0.22)',
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: 'absolute', left: 24, right: 24, top: 78 + i * 44, height: 1, background: '#E7E0CE' }} />
        ))}
        <Tape style={{ left: 24, top: -12 }} rotate={-6} width={66} height={18} />
        <div style={{ position: 'absolute', left: 30, top: 26, fontFamily: FONT.body, fontSize: 32, color: C.ink, letterSpacing: 1 }}>30 秒剪完，</div>
        <div
          style={{
            position: 'absolute',
            left: 28,
            top: 96 + (1 - line2) * 8,
            fontFamily: FONT.hand,
            fontSize: 86,
            color: C.ink,
            lineHeight: 1,
            opacity: line2,
          }}
        >
          Opus
          <span style={{ opacity: line3, marginLeft: 6 }}>5.5</span>
        </div>
        <div style={{ position: 'absolute', left: 30, top: 196, width: 286, height: 4, background: C.red, borderRadius: 2, opacity: 0.85, transform: `scaleX(${underline})`, transformOrigin: 'left center' }} />
        <div
          style={{
            position: 'absolute',
            left: 30,
            top: 232 + (1 - footer) * 6,
            fontFamily: FONT.body,
            fontSize: 21,
            color: C.inkSoft,
            opacity: footer,
          }}
        >
          — 小克 收工 ✨
        </div>
      </div>
    </div>
  );
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();

  const time = (() => {
    const keys: [number, number][] = [
      [0, 0],
      [50, 0],
      [150, 2.2],
      [160, 3.4],
      [190, 4.0],
      [246, 5.1],
      [264, 7.4],
      [318, 7.9],
      [356, 10.0],
      [452, 10.7],
      [552, 11.2],
      [620, 11.8],
      [678, 12.2],
      [760, 12.7],
      [900, 13.0],
    ];
    let value = 0;
    for (let i = 0; i < keys.length - 1; i++) {
      const [f0, v0] = keys[i];
      const [f1, v1] = keys[i + 1];
      if (frame >= f0 && frame <= f1) {
        value = seg(frame, f0, f1, v0, v1, Easing.linear);
        break;
      }
    }
    return value;
  })();

  const ramenBVisible = frame < 160 || frame > 196;
  const clips = [
    { id: 'night', name: '夜景.mp4', start: 0, dur: 3.2, scene: 'night' as SceneKey, grow: pop(frame, 52) },
    { id: 'ramenA', name: '拉面.mp4', start: 3.2, dur: 1.8, scene: 'ramen' as SceneKey, grow: pop(frame, 84) },
    {
      id: 'ramenB',
      name: '拉面.mp4',
      start: 5.0,
      dur: 2.4,
      scene: 'ramen' as SceneKey,
      grow: ramenBVisible ? pop(frame, 112) : seg(frame, 160, 172, 1, 0),
    },
    { id: 'shiba', name: '柴犬.mov', start: 7.4, dur: 2.6, scene: 'shiba' as SceneKey, grow: pop(frame, 140) },
    { id: 'disco', name: '小克蹦迪.mp4', start: 10.0, dur: 3.0, scene: 'disco' as SceneKey, grow: pop(frame, 168) },
  ];

  const sliders: SliderValues = {
    flash: frame < 396 ? 0 : frame < 430 ? seg(frame, 396, 430, 0, 0.63) : 0.7,
    sat: frame < 456 ? 1.0 : frame < 500 ? seg(frame, 456, 470, 1.0, 1.2) : frame < 552 ? 1.0 : seg(frame, 552, 580, 1.0, 1.1),
    zoom: frame < 590 ? 0 : seg(frame, 590, 620, 0, 0.6),
    speed: 1.0,
  };

  const satHot = frame >= 456 && frame <= 552;
  const hotSlider: keyof SliderValues | undefined =
    frame >= 396 && frame < 452 ? 'flash' : satHot ? 'sat' : frame >= 590 && frame < 640 ? 'zoom' : undefined;

  const phoneFilter =
    frame >= 470 && frame <= 545
      ? `saturate(${1 + 1.6 * Math.min(1, (frame - 470) / 10)}) brightness(${1 + 0.22 * Math.min(1, (frame - 470) / 10)})`
      : undefined;

  let tabs: Tab = 'media';
  if (frame >= 200 && frame < 252) tabs = 'trans';
  if (frame >= 252 && frame < 366) tabs = 'text';

  let preview: SceneKey = 'night';
  if (frame >= 162 && frame < 186) preview = 'blur';
  if (frame >= 186) preview = 'ramen';
  if (frame >= 264) preview = 'shiba';
  if (frame >= 356) preview = 'disco';

  const previewText = preview === 'shiba' ? '前方高能预警' : undefined;
  const previewTextOpacity = seg(frame, 268, 282, 0, 1);

  const stickerDrag = frame >= 252 && frame < 264 ? 0 : -1;

  const mascot = (() => {
    if (frame < 46) return { x: 300, y: 550, scale: 1.05, pose: 'idle' as Pose, legPhase: 0 };
    if (frame < 160) return { x: seg(frame, 46, 150, 250, 430), y: 552, scale: 1.08, pose: 'idle' as Pose, legPhase: frame / 14 };
    if (frame < 200) return { x: 560, y: 552, scale: 1.12, pose: 'idle' as Pose, legPhase: frame / 9 };
    if (frame < 252) return { x: 320, y: 552, scale: 1.06, pose: 'idle' as Pose, legPhase: frame / 20 };
    if (frame < 330) return { x: 520, y: 552, scale: 1.06, pose: 'happy' as Pose, legPhase: 0 };
    if (frame < 366) return { x: 380, y: 550, scale: 1.06, pose: 'happy' as Pose, legPhase: frame / 10 };
    if (frame < 456) return { x: 620, y: 552, scale: 1.06, pose: 'idle' as Pose, legPhase: 0 };
    if (frame < 552) return { x: 600, y: 552, scale: 1.1, pose: 'shades' as Pose, legPhase: frame / 8 };
    if (frame < 620) return { x: 660, y: 552, scale: 1.06, pose: 'happy' as Pose, legPhase: frame / 8 };
    if (frame < 678) return { x: 540, y: 552, scale: 1.06, pose: 'idle' as Pose, legPhase: frame / 6 };
    if (frame < 735) return { x: 900, y: 552, scale: 1.06, pose: 'shades' as Pose, legPhase: frame / 10 };
    return { x: 940, y: 552, scale: 1.06, pose: 'sleep' as Pose, legPhase: 0 };
  })();

  let armTo: { x: number; y: number } | null = null;
  if (frame >= 158 && frame < 190) armTo = { x: 578, y: 628 };
  if (frame >= 400 && frame < 452) armTo = { x: sliderGeom(0.63).x + 14, y: 152 };
  if (frame >= 470 && frame < 545) armTo = { x: sliderGeom(1.2).x + 13, y: 222 };
  if (frame >= 690 && frame < 740) armTo = { x: 1170, y: 40 };

  const timecode = formatTimecode(time);
  const status = frame >= 700 && frame < 780 ? '正在渲染' : '已自动保存';
  const exportLabel =
    frame >= 700 && frame < 780 ? `渲染中 ${Math.min(99.99, 42 + (frame - 700) * 2.9).toFixed(2)}%` : '导出';
  const exportGlow = frame >= 690 && frame < 745 ? (Math.sin(frame / 4) + 1) / 2 : 0;
  const trash = frame >= 160 && frame < 200 ? seg(frame, 160, 166, 0, 1) * seg(frame, 192, 200, 1, 0) : 0;
  const beatProgress = frame < 620 ? 0 : seg(frame, 620, 660, 0, 1);
  const beatHighlight = frame >= 654 && frame < 672 ? 1 : 0;
  const editorDim = frame >= 786 ? seg(frame, 786, 812, 0, 0.86) : 0;

  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <FontLoader />
      <Audio src={staticFile('audio/bgm.wav')} volume={0.95} />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%), radial-gradient(80% 60% at 80% 100%, rgba(214,196,158,0.18), rgba(255,255,255,0) 70%)',
        }}
      />

      {frame >= 42 && (
        <Camera frame={frame}>
          <div style={{ position: 'absolute', left: 14, top: 10 }}>
            <Editor
              frame={frame}
              time={time}
              tabs={tabs}
              clips={clips}
              textClipOpacity={frame >= 264 ? seg(frame, 264, 276, 0, 1) : 0}
              sliders={sliders}
              preview={preview}
              previewText={previewText}
              previewTextOpacity={previewTextOpacity}
              previewSocial={frame >= 786 ? { likes: '10.2w', comments: '2323', shares: '分享' } : null}
              previewCaption={frame >= 786}
              titleSticker={frame >= 824 ? pop(frame, 824) : 0}
              phoneGlow={satHot ? 1 : 0}
              timecode={timecode}
              status={status}
              exportLabel={exportLabel}
              exportGlow={exportGlow}
              activeTransition={frame >= 200 ? Math.floor((frame - 206) / 7) % 6 : -1}
              stickerDrag={stickerDrag}
              mascot={mascot}
              armTo={armTo}
              trash={trash}
              beatProgress={beatProgress}
              beatHighlight={beatHighlight}
              dim={editorDim}
              selectedClip={frame >= 160 && frame < 200 ? 'ramenB' : undefined}
              hotSlider={hotSlider}
              phoneFlash={frame >= 460 && frame < 470 ? seg(frame, 460, 470, 0.5, 0) : 0}
              phoneFilter={phoneFilter}
              hidePreview={frame >= 786}
            />
          </div>
          {frame < 60 && <div style={{ position: 'absolute', inset: 0, background: '#FFFDF7', opacity: seg(frame, 44, 58, 0.9, 0) }} />}
        </Camera>
      )}

      {frame < 48 && (
        <div style={{ opacity: seg(frame, 40, 46, 1, 0) }}>
          <Terminal frame={frame} />
        </div>
      )}

      {frame >= 44 && frame < 70 && (
        <AbsoluteFill style={{ pointerEvents: 'none', opacity: seg(frame, 44, 50, 0, 1) * seg(frame, 62, 70, 1, 0) }}>
          <Sparkle x={980} y={150} size={26} rotate={frame * 2} />
          <Sparkle x={1030} y={520} size={18} rotate={-frame * 2} />
        </AbsoluteFill>
      )}

      {frame >= 156 && frame < 196 && (
        <div style={{ position: 'absolute', left: 610, top: 250, opacity: seg(frame, 156, 164, 0, 1) * seg(frame, 186, 196, 1, 0) }}>
          <OutlinedText color="#F0699B" size={72} rotate={-7} strokeWidth={7}>
            唰!
          </OutlinedText>
        </div>
      )}

      {trash > 0 && (
        <div style={{ position: 'absolute', left: 560, top: 560, opacity: trash, transform: `rotate(${8 - trash * 6}deg) scale(${0.9 + trash * 0.15})` }}>
          <OutlinedText color={C.yellow} size={46} strokeWidth={6}>
            哐当!
          </OutlinedText>
        </div>
      )}

      {frame >= 212 && frame < 252 && (
        <div style={{ position: 'absolute', left: 690, top: 330, opacity: seg(frame, 212, 220, 0, 1) * seg(frame, 244, 252, 1, 0) }}>
          <div style={{ fontFamily: FONT.body, fontSize: 22, color: C.inkSoft, letterSpacing: 3, transform: 'rotate(-4deg)' }}>溶解 · 入画</div>
        </div>
      )}

      {frame >= 318 && frame < 366 && (
        <>
          <KeyCap
            style={{
              left: 330,
              top: 540,
              transform: `rotate(-3deg) scale(${frame > 326 && frame < 336 ? 0.94 : 1})`,
              opacity: seg(frame, 318, 324, 0, 1) * seg(frame, 356, 366, 1, 0),
            }}
            fontSize={22}
            width={160}
          >
            Ctrl+Z
          </KeyCap>
          <div
            style={{
              position: 'absolute',
              left: 780,
              top: 252,
              opacity: seg(frame, 336, 342, 0, 1) * seg(frame, 384, 396, 1, 0),
              transform: `rotate(-8deg) scale(${1.4 - 0.4 * pop(frame, 336)})`,
            }}
          >
            <Stamp text="已修正" size={36} rotate={0} />
          </div>
        </>
      )}

      {frame >= 456 && frame < 556 && (
        <div
          style={{
            position: 'absolute',
            left: 336,
            top: 50,
            opacity: seg(frame, 456, 464, 0, 1) * seg(frame, 546, 556, 1, 0),
            transform: `rotate(-4deg) scale(${0.8 + 0.2 * pop(frame, 456)})`,
          }}
        >
          <OutlinedText color="#F0699B" size={54} strokeWidth={7} shadow>
            饱和度：拉满
          </OutlinedText>
        </div>
      )}

      {satHot && (
        <div
          style={{
            position: 'absolute',
            left: 1095,
            top: 204,
            transform: `rotate(9deg) scale(${0.6 + 0.4 * pop(frame, 460)})`,
            opacity: seg(frame, 460, 466, 0, 1) * seg(frame, 540, 552, 1, 0),
          }}
        >
          <OutlinedText color={C.red} size={30} strokeWidth={5}>
            爆表!!
          </OutlinedText>
        </div>
      )}

      {frame >= 500 && frame < 552 && (
        <SpeechBubble style={{ left: 250, top: 396 }} rotate={-3} fontSize={19} tail="down">
          ……太亮了
        </SpeechBubble>
      )}

      {frame >= 620 && frame < 684 && (
        <div
          style={{
            position: 'absolute',
            left: 186,
            top: 424,
            transform: `rotate(-6deg) scale(${0.8 + 0.2 * pop(frame, 620)})`,
            opacity: seg(frame, 620, 628, 0, 1) * seg(frame, 674, 684, 1, 0),
          }}
        >
          <OutlinedText color="#4FBFA8" size={56} strokeWidth={7}>
            卡点!
          </OutlinedText>
        </div>
      )}

      {frame >= 740 && frame < 786 && (
        <SpeechBubble style={{ left: 1010, top: 456 }} rotate={3} fontSize={22} tail="down">
          ...
        </SpeechBubble>
      )}

      {frame >= 690 && frame < 760 && (
        <div style={{ position: 'absolute', left: 890, top: 426, opacity: seg(frame, 690, 698, 0, 1) * seg(frame, 752, 760, 1, 0) }}>
          <div style={{ fontFamily: FONT.body, fontSize: 16, color: C.inkSoft, letterSpacing: 2 }}>一键导出</div>
        </div>
      )}

      {frame >= 786 && (
        <AbsoluteFill style={{ background: 'rgba(250,247,238,0.35)' }}>
          <StickyNote frame={frame} at={806} />
          <div
            style={{
              position: 'absolute',
              left: 560,
              top: 96,
              width: 300,
              height: 600,
              transform: `scale(${0.92 + 0.08 * pop(frame, 792)})`,
              opacity: seg(frame, 792, 806, 0, 1),
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 48,
                background: '#2A2723',
                border: `3px solid ${C.ink}`,
                boxShadow: '0 20px 40px rgba(40,36,28,0.28)',
              }}
            >
              <div style={{ position: 'absolute', left: 10, right: 10, top: 10, bottom: 10, borderRadius: 40, overflow: 'hidden', background: '#1E1C19' }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                  <SceneArt scene="disco" />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 34,
                    transform: `translateX(-50%) rotate(-3deg) scale(${pop(frame, 824)})`,
                    fontFamily: FONT.display,
                    fontSize: 62,
                    color: C.yellow,
                    WebkitTextStroke: `7px ${C.ink}`,
                    paintOrder: 'stroke fill',
                    whiteSpace: 'nowrap',
                    filter: 'drop-shadow(0 5px 0 rgba(0,0,0,0.3))',
                  }}
                >
                  拿捏了!
                </div>
                <div style={{ position: 'absolute', right: 10, bottom: 92, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: C.red, border: '2px solid #fff', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 10, top: 11, width: 5, height: 7, borderRadius: 2, background: '#2B2118' }} />
                    <div style={{ position: 'absolute', left: 20, top: 11, width: 5, height: 7, borderRadius: 2, background: '#2B2118' }} />
                  </div>
                  {[
                    { icon: '♥', val: '10.2w', color: '#F27C93' },
                    { icon: '💬', val: '2323', color: '#FFF3DC' },
                    { icon: '↪', val: '分享', color: '#FFF3DC' },
                  ].map((it, i) => (
                    <div key={i} style={{ textAlign: 'center', color: '#FFF9EC', fontFamily: FONT.body, fontSize: 10 }}>
                      <div style={{ fontSize: 20, lineHeight: 1, color: it.color }}>{it.icon}</div>
                      <div style={{ marginTop: 2 }}>{it.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'absolute', left: 14, right: 60, bottom: 14, color: '#FFF9EC', fontFamily: FONT.body }}>
                  <div style={{ fontSize: 11.5 }}>@小克 · Opus 5.5</div>
                  <div style={{ fontSize: 10, opacity: 0.8, marginTop: 3 }}>#AI剪辑 #卡点 #code2video</div>
                </div>
              </div>
              <div style={{ position: 'absolute', left: '50%', top: 12, transform: 'translateX(-50%)', width: 76, height: 9, borderRadius: 8, background: '#171512' }} />
            </div>
          </div>

          <Mascot x={1030} y={622} scale={1.65} pose="shades" legPhase={0} />
        </AbsoluteFill>
      )}

      {frame >= 60 && frame < 70 && <AbsoluteFill style={{ background: '#FFFDF7', opacity: seg(frame, 60, 70, 0.65, 0) }} />}

      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, rgba(90,72,45,0) 62%, rgba(90,72,45,0.07) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
