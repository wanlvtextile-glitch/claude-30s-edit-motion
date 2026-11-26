import React from 'react';
import { C, FONT } from '../theme';
import { Frame, HLine, Capsule } from './Sketch';
import { SceneArt, NightCity, Ramen, Shiba, Disco } from '../art/Scenes';
import { Mascot, Pose, RubberArm } from './Mascot';

export type SceneKey = 'night' | 'ramen' | 'shiba' | 'disco' | 'blur';
export type Tab = 'media' | 'trans' | 'text';
export type SliderValues = { flash: number; sat: number; zoom: number; speed: number };

export const ED = { w: 1252, h: 700, pad: 12 };
export const TL = {
  left: 12,
  top: 422,
  width: 1228,
  height: 266,
  originX: 88,
  pxPerSec: 72,
  videoY: 500,
  videoH: 52,
  textY: 470,
  textH: 20,
  audioY: 562,
  audioH: 32,
};

export const sliderGeom = (v: number) => ({ x: 966 + 258 * v, y: 146 });

export const formatTimecode = (seconds: number) => {
  const total = Math.max(0, Math.floor(seconds * 30));
  const f = total % 30;
  const s = Math.floor(total / 30) % 60;
  const m = Math.floor(total / 1800);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `00:${pad(m)}:${pad(s)}:${pad(f)}`;
};

const TrafficLights: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div style={{ position: 'absolute', left: x, top: y, display: 'flex', gap: 5 }}>
    {['#DE6E60', '#E7BC57', '#82BC8D'].map((col) => (
      <div
        key={col}
        style={{ width: 9, height: 9, borderRadius: 9, background: col, border: `1.2px solid ${C.ink}`, opacity: 0.95 }}
      />
    ))}
  </div>
);

const ClapperIcon: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ position: 'absolute', left: x, top: y }}>
    <rect x="2" y="8" width="20" height="13" rx="2" fill={C.panel} stroke={C.ink} strokeWidth="1.6" />
    <path d="M2 8 L5 3 L9 5 L6 10 Z" fill={C.ink} opacity="0.85" />
    <path d="M9 5 L13 7 L10 12 L6 10 Z" fill={C.ink} opacity="0.85" />
    <path d="M13 7 L17 9 L14 14 L10 12 Z" fill={C.ink} opacity="0.85" />
  </svg>
);

const TransIcon: React.FC<{ kind: string }> = ({ kind }) => {
  const stroke = C.ink;
  const common = { fill: 'none', stroke, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="40" height="34" viewBox="0 0 40 34">
      {kind === '旋转' && <path d="M 20 6 a 11 11 0 1 1 -9 5" {...common} />}
      {kind === '旋转' && <path d="M 9 5 L 10 12 L 17 10" {...common} />}
      {kind === '翻页' && <path d="M 12 5 H 30 V 28 H 12 Z M 12 5 L 6 9 V 31 L 12 28" {...common} />}
      {kind === '故障' && (
        <>
          <rect x="8" y="10" width="24" height="15" rx="2" {...common} />
          <path d="M 14 6 v 22 M 26 6 v 22" stroke={stroke} strokeWidth="2" opacity="0.5" />
        </>
      )}
      {kind === '缩放' && (
        <>
          <circle cx="18" cy="15" r="8" {...common} />
          <path d="M 24 21 L 32 29" {...common} />
          <path d="M 15 15 h 6 M 18 12 v 6" {...common} />
        </>
      )}
      {kind === '滑动' && (
        <>
          <rect x="7" y="12" width="12" height="10" rx="2" fill={C.ink} opacity="0.9" />
          <path d="M 23 17 h 9 M 29 13 l 4 4 l -4 4" {...common} />
        </>
      )}
      {kind === '溶解' && (
        <>
          <rect x="9" y="9" width="14" height="14" rx="2" {...common} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={26 + (i % 3) * 5} cy={12 + Math.floor(i / 3) * 7} r={1.6} fill={stroke} />
          ))}
        </>
      )}
    </svg>
  );
};

const Phone: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  scene: SceneKey;
  overlayText?: string;
  overlayTextOpacity?: number;
  focus?: boolean;
  flash?: number;
  social?: { likes: string; comments: string; shares: string } | null;
  caption?: boolean;
  titleSticker?: number;
  glow?: number;
  filter?: string;
}> = ({ x, y, w, h, scene, overlayText, overlayTextOpacity = 1, focus, flash = 0, social, caption, titleSticker = 0, glow = 0, filter }) => {
  const radius = w * 0.16;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
      {glow > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: -18,
            borderRadius: radius + 18,
            background: 'radial-gradient(circle, rgba(240,105,155,0.45), rgba(240,105,155,0) 70%)',
            opacity: glow,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          background: '#2A2723',
          border: `2px solid ${C.ink}`,
          boxShadow: '0 14px 30px rgba(40,36,28,0.28), inset 0 0 0 2px #514C43',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 7,
            right: 7,
            top: 7,
            bottom: 7,
            borderRadius: radius - 5,
            overflow: 'hidden',
            background: '#1E1C19',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, filter }}>
            <SceneArt scene={scene} />
          </div>
          {overlayText && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 54,
                display: 'flex',
                justifyContent: 'center',
                opacity: overlayTextOpacity,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: w * 0.125,
                  color: C.yellow,
                  WebkitTextStroke: `${w * 0.012}px ${C.ink}`,
                  paintOrder: 'stroke fill',
                  letterSpacing: 1,
                  filter: 'drop-shadow(0 3px 0 rgba(0,0,0,0.35))',
                }}
              >
                {overlayText}
              </div>
            </div>
          )}
          {scene === 'blur' && (
            <>
              <div style={{ position: 'absolute', left: '18%', top: '31%', width: '26%', height: '15%', border: `2px solid rgba(255,255,255,0.9)`, borderRight: 'none', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', right: '18%', top: '31%', width: '26%', height: '15%', border: `2px solid rgba(255,255,255,0.9)`, borderLeft: 'none', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', left: '18%', bottom: '31%', width: '26%', height: '15%', border: `2px solid rgba(255,255,255,0.9)`, borderRight: 'none', borderTop: 'none' }} />
              <div style={{ position: 'absolute', right: '18%', bottom: '31%', width: '26%', height: '15%', border: `2px solid rgba(255,255,255,0.9)`, borderLeft: 'none', borderTop: 'none' }} />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '46%',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontFamily: FONT.body,
                  fontSize: w * 0.12,
                  textShadow: '0 2px 6px rgba(0,0,0,0.45)',
                }}
              >
                对焦中..
              </div>
            </>
          )}
          {titleSticker > 0 && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 18,
                transform: `translateX(-50%) rotate(-2deg) scale(${titleSticker})`,
                fontFamily: FONT.display,
                fontSize: w * 0.19,
                color: C.yellow,
                WebkitTextStroke: `${w * 0.022}px ${C.ink}`,
                paintOrder: 'stroke fill',
                whiteSpace: 'nowrap',
                filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.3))',
              }}
            >
              拿捏了!
            </div>
          )}
          {social && (
            <div style={{ position: 'absolute', right: 8, bottom: 64, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, background: C.red, border: '2px solid #fff', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 9, top: 10, width: 4, height: 6, borderRadius: 2, background: '#2B2118' }} />
                <div style={{ position: 'absolute', left: 17, top: 10, width: 4, height: 6, borderRadius: 2, background: '#2B2118' }} />
              </div>
              {[
                { icon: '♥', val: social.likes, color: '#F27C93' },
                { icon: '💬', val: social.comments, color: '#FFF3DC' },
                { icon: '↪', val: social.shares, color: '#FFF3DC' },
              ].map((it, i) => (
                <div key={i} style={{ textAlign: 'center', color: '#FFF9EC', fontFamily: FONT.body, fontSize: 9 }}>
                  <div style={{ fontSize: 17, lineHeight: 1, color: it.color }}>{it.icon}</div>
                  <div style={{ marginTop: 1 }}>{it.val}</div>
                </div>
              ))}
            </div>
          )}
          {social && caption && (
            <div style={{ position: 'absolute', left: 10, right: 46, bottom: 10, color: '#FFF9EC', fontFamily: FONT.body }}>
              <div style={{ fontSize: 9.5, opacity: 0.95 }}>@小克 · Opus 5.5</div>
              <div style={{ fontSize: 8.5, opacity: 0.8, marginTop: 2 }}>#AI剪辑 #卡点 #code2video</div>
            </div>
          )}
          {flash > 0 && <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF', opacity: flash }} />}
          {focus && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)' }} />}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 9,
            transform: 'translateX(-50%)',
            width: w * 0.26,
            height: 7,
            borderRadius: 6,
            background: '#171512',
          }}
        />
      </div>
      {[0.16, 0.28].map((p) => (
        <div
          key={p}
          style={{
            position: 'absolute',
            right: -3.5,
            top: h * p,
            width: 3,
            height: h * 0.09,
            borderRadius: 2,
            background: '#2A2723',
          }}
        />
      ))}
      <div style={{ position: 'absolute', left: -3.5, top: h * 0.2, width: 3, height: h * 0.07, borderRadius: 2, background: '#2A2723' }} />
    </div>
  );
};

const Slider: React.FC<{ label: string; value: number; max?: number; y: number; display: string; hot?: boolean }> = ({
  label,
  value,
  max = 1,
  y,
  display,
  hot,
}) => {
  const frac = Math.max(0, Math.min(1, value / max));
  return (
    <div style={{ position: 'absolute', left: 16, right: 16, top: y }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: FONT.body, fontSize: 15, color: C.ink }}>{label}</span>
        <span style={{ fontFamily: FONT.body, fontSize: 12, color: hot ? '#D9455C' : C.inkSoft }}>{display}</span>
      </div>
      <div
        style={{
          position: 'relative',
          marginTop: 10,
          height: 3,
          borderRadius: 3,
          background: '#E3DCCB',
          border: `0.8px solid ${C.ink}`,
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${frac * 100}%`, background: hot ? '#F0699B' : C.mintDeep, borderRadius: 3 }} />
        <div
          style={{
            position: 'absolute',
            left: `calc(${frac * 100}% - 7px)`,
            top: -5,
            width: 14,
            height: 14,
            borderRadius: 14,
            background: C.panel,
            border: `2.2px solid ${hot ? '#F0699B' : C.ink}`,
            boxShadow: hot ? '0 0 0 4px rgba(240,105,155,0.22)' : undefined,
          }}
        />
      </div>
    </div>
  );
};

const Waveform: React.FC<{ width: number; height: number; color: string }> = ({ width, height, color }) => {
  const bars = Math.floor(width / 3.2);
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 4 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.31)) * (height - 8);
        return <rect key={i} x={i * 3.2} y={(height - h) / 2} width={1.7} height={h} rx={0.8} fill={color} opacity={0.75} />;
      })}
    </svg>
  );
};

const MediaThumb: React.FC<{ x: number; y: number; w: number; h: number; scene: SceneKey; label: string; dur?: string; active?: boolean }> = ({
  x,
  y,
  w,
  h,
  scene,
  label,
  dur,
  active,
}) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w }}>
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 6,
        overflow: 'hidden',
        border: `1.6px solid ${C.ink}`,
        boxShadow: active ? `0 0 0 3px ${C.yellow}` : undefined,
        position: 'relative',
        background: '#1E1C19',
      }}
    >
      {scene === 'night' ? <NightCity /> : scene === 'ramen' ? <Ramen banner={false} /> : scene === 'shiba' ? <Shiba /> : <Disco />}
      {dur && (
        <div
          style={{
            position: 'absolute',
            right: 3,
            bottom: 3,
            background: 'rgba(30,28,24,0.75)',
            color: '#FFF8E7',
            fontFamily: FONT.body,
            fontSize: 8,
            padding: '1px 4px',
            borderRadius: 3,
          }}
        >
          {dur}
        </div>
      )}
    </div>
    <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.ink, marginTop: 3, textAlign: 'center' }}>{label}</div>
  </div>
);

const AddSlot: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w }}>
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 6,
        border: `1.4px dashed #A79F8E`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A79F8E',
        fontFamily: FONT.body,
        fontSize: 20,
      }}
    >
      +
    </div>
    <div style={{ fontFamily: FONT.body, fontSize: 10, color: C.inkFaint, marginTop: 3, textAlign: 'center' }}>导入素材</div>
  </div>
);

const Clip: React.FC<{
  x: number;
  w: number;
  name: string;
  scene: SceneKey;
  grow: number;
  selected?: boolean;
  brightness?: number;
}> = ({ x, w, name, scene, grow, selected, brightness = 1 }) => {
  if (grow < 0.02) return null;
  const ww = Math.max(4, w * grow);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: TL.videoY - TL.top,
        width: ww,
        height: TL.videoH,
        borderRadius: 5,
        overflow: 'hidden',
        border: `1.8px solid ${selected ? C.playhead : C.ink}`,
        background: '#2A2723',
        filter: brightness !== 1 ? `brightness(${brightness})` : undefined,
        boxShadow: selected ? '0 0 0 2px rgba(217,69,92,0.35)' : undefined,
      }}
    >
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        {Array.from({ length: Math.max(1, Math.ceil(w / 96)) }).map((_, i) => (
          <div key={i} style={{ width: 96, height: '100%', flexShrink: 0, borderRight: `1px solid rgba(255,255,255,0.18)` }}>
            <div style={{ width: '100%', height: '100%' }}>
              {scene === 'night' ? <NightCity /> : scene === 'ramen' ? <Ramen banner={false} /> : scene === 'shiba' ? <Shiba /> : <Disco />}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 4,
          top: 3,
          background: 'rgba(252,248,238,0.88)',
          borderRadius: 3,
          padding: '0 4px',
          fontFamily: FONT.body,
          fontSize: 9,
          color: C.ink,
          whiteSpace: 'nowrap',
          maxWidth: ww - 8,
          overflow: 'hidden',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export type EditorProps = {
  frame: number;
  time: number;
  tabs: Tab;
  clips: { id: string; name: string; start: number; dur: number; scene: SceneKey; grow: number; brightness?: number }[];
  textClipOpacity: number;
  sliders: SliderValues;
  preview: SceneKey;
  previewText?: string;
  previewTextOpacity?: number;
  previewSocial?: { likes: string; comments: string; shares: string } | null;
  previewCaption?: boolean;
  titleSticker?: number;
  phoneGlow?: number;
  timecode: string;
  status: string;
  exportLabel: string;
  exportGlow: number;
  activeTransition: number;
  stickerDrag: number;
  mascot: { x: number; y: number; scale: number; pose: Pose; legPhase: number } | null;
  armTo: { x: number; y: number } | null;
  trash: number;
  beatProgress: number;
  beatHighlight: number;
  dim: number;
  selectedClip?: string;
  hotSlider?: keyof SliderValues;
  phoneFlash?: number;
  phoneFilter?: string;
  hidePreview?: boolean;
};

export const Editor: React.FC<EditorProps> = (p) => {
  const mediaX = 12;
  const mediaY = 54;
  const tw = 128;
  const th = 74;

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: ED.w, height: ED.h }}>
      <Frame style={{ left: 0, top: 0, width: ED.w, height: ED.h }} radius={14} fill={C.panelSoft} border={2.2}>
        {/* title bar */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 44 }}>
          <TrafficLights x={16} y={17} />
          <ClapperIcon x={62} y={12} />
          <div style={{ position: 'absolute', left: 86, top: 13, fontFamily: FONT.body, fontSize: 13.5, color: C.ink, letterSpacing: 0.2 }}>
            小克剪辑_最终版_打死不改(3).mp4
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 9,
              transform: 'translateX(-50%)',
              background: '#2C2A25',
              color: '#F7F1E0',
              borderRadius: 7,
              padding: '4px 14px',
              fontFamily: FONT.mono,
              fontSize: 12.5,
              letterSpacing: 1,
            }}
          >
            {p.timecode}
          </div>
          <div style={{ position: 'absolute', left: 726, top: 15, fontFamily: FONT.body, fontSize: 10.5, color: C.inkFaint }}>
            · {p.status}
          </div>
          <div style={{ position: 'absolute', right: 150, top: 10 }}>
            <Capsule style={{ width: 52, height: 24 }} fontSize={11}>
              1080p
            </Capsule>
          </div>
          <div
            style={{
              position: 'absolute',
              right: 14,
              top: 9,
              width: 124,
              height: 27,
              borderRadius: 8,
              border: `1.8px solid ${C.ink}`,
              background: p.exportLabel.includes('渲染') ? C.yellow : C.mint,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              fontFamily: FONT.body,
              fontSize: 13,
              color: C.ink,
              boxShadow: p.exportGlow > 0 ? `0 0 0 ${3 * p.exportGlow}px rgba(241,205,102,0.55)` : undefined,
              transform: `scale(${1 + 0.02 * p.exportGlow})`,
            }}
          >
            <span style={{ fontSize: 13, marginTop: -1 }}>⇧</span>
            {p.exportLabel}
          </div>
          <HLine style={{ left: 0, right: 0, top: 44 }} />
        </div>

        {/* left panel */}
        <Frame style={{ left: 12, top: 56, width: 290, height: 356 }} radius={10} border={1.8} fill={C.panel}>
          <div style={{ display: 'flex', gap: 6, position: 'absolute', left: 10, top: 9 }}>
            {(['素材', '转场', '文字'] as const).map((label, i) => {
              const key = (['media', 'trans', 'text'] as Tab[])[i];
              const active = p.tabs === key;
              return (
                <Capsule key={label} fill={active ? C.yellow : C.panelSoft} style={{ width: 84, height: 28, borderWidth: 1.5, opacity: active ? 1 : 0.85 }} fontSize={13}>
                  {label}
                </Capsule>
              );
            })}
          </div>

          {p.tabs === 'media' && (
            <>
              <MediaThumb x={mediaX} y={mediaY} w={tw} h={th} scene="night" label="夜景.mp4" dur="2.4s" />
              <MediaThumb x={152} y={mediaY} w={tw} h={th} scene="ramen" label="拉面.mp4" dur="4.6s" />
              <MediaThumb x={mediaX} y={mediaY + 105} w={tw} h={th} scene="shiba" label="柴犬.mov" dur="2.4s" active />
              <MediaThumb x={152} y={mediaY + 105} w={tw} h={th} scene="disco" label="小克蹦迪.mp4" dur="2.8s" />
              <AddSlot x={mediaX} y={mediaY + 210} w={tw} h={th} />
              <AddSlot x={152} y={mediaY + 210} w={tw} h={th} />
            </>
          )}

          {p.tabs === 'trans' && (
            <>
              {['旋转', '翻页', '故障', '缩放', '滑动', '溶解'].map((name, i) => {
                const col = i % 2;
                const row = Math.floor(i / 2);
                const sel = p.activeTransition === i;
                const fills = [C.lav, C.mintPale, C.pink, '#D9E9F7', C.yellowPale, C.lavPale];
                return (
                  <div key={name} style={{ position: 'absolute', left: 12 + col * 140, top: 50 + row * 98, width: 128 }}>
                    <div
                      style={{
                        height: 68,
                        borderRadius: 8,
                        border: `1.6px solid ${C.ink}`,
                        background: fills[i],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: sel ? `0 0 0 3px ${C.yellow}` : undefined,
                      }}
                    >
                      <TransIcon kind={name} />
                    </div>
                    <div style={{ textAlign: 'center', fontFamily: FONT.body, fontSize: 11, marginTop: 3, color: C.ink }}>{name}</div>
                  </div>
                );
              })}
            </>
          )}

          {p.tabs === 'text' && (
            <>
              {[
                { label: '前方高能', fill: C.yellowPale, color: C.ink, size: 22, dark: true },
                { label: '好耶~', fill: C.pinkPale, color: '#E0607C', size: 19, dark: false },
                { label: '霓虹 NEON', fill: '#2B2B36', color: '#F4C7E6', size: 19, dark: true },
              ].map((s, i) => {
                const drag = p.stickerDrag === i ? 1 : 0;
                return (
                  <div
                    key={s.label}
                    style={{
                      position: 'absolute',
                      left: 14,
                      top: 48 + i * 96,
                      width: 262,
                      height: 78,
                      borderRadius: 10,
                      border: `1.6px solid ${C.ink}`,
                      background: s.fill,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `translate(${drag * 6}px, ${drag * -4}px) rotate(${drag * 2}deg)`,
                      boxShadow: drag ? '0 8px 14px rgba(0,0,0,0.18)' : undefined,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: s.size,
                        color: s.color,
                        WebkitTextStroke: s.dark ? '0px' : `4px ${C.ink}`,
                        paintOrder: 'stroke fill',
                        textShadow: s.dark
                          ? s.label === '前方高能'
                            ? '0.6px 0 0 rgba(43,33,24,0.85)'
                            : '0 0 8px rgba(244,199,230,0.7)'
                          : undefined,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
              <div style={{ position: 'absolute', left: 16, bottom: 6, fontFamily: FONT.body, fontSize: 10, color: C.inkFaint }}>拖到时间轴</div>
            </>
          )}
        </Frame>

        {/* preview */}
        {!p.hidePreview && (
          <>
            <Phone
          x={552}
          y={56}
          w={176}
          h={352}
          scene={p.preview}
          overlayText={p.previewText}
          overlayTextOpacity={p.previewTextOpacity}
          social={p.previewSocial}
          caption={p.previewCaption}
          titleSticker={p.titleSticker}
          glow={p.phoneGlow}
          flash={p.phoneFlash}
          filter={p.phoneFilter}
        />
        <div style={{ position: 'absolute', left: 588, top: 412, display: 'flex', gap: 18, alignItems: 'center', color: C.ink }}>
          <span style={{ fontSize: 11 }}>⏮</span>
          <div style={{ width: 22, height: 22, borderRadius: 22, border: `1.6px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ marginLeft: 2, display: 'flex' }}>▶</span>
          </div>
          <span style={{ fontSize: 11 }}>⏭</span>
        </div>
          </>
        )}

        {/* right panel */}
        <Frame style={{ left: 950, top: 56, width: 290, height: 356 }} radius={10} border={1.8} fill={C.panel}>
          <div style={{ position: 'absolute', left: 16, top: 10, fontFamily: FONT.body, fontSize: 21, color: C.ink, letterSpacing: 1 }}>
            调整 <span style={{ fontSize: 15 }}>✦</span>
          </div>
          <HLine style={{ left: 16, right: 16, top: 44 }} />
          <Slider label="闪光" value={p.sliders.flash} y={54} display={`${Math.round(p.sliders.flash * 100)}%`} hot={p.hotSlider === 'flash'} />
          <Slider label="饱和度" value={p.sliders.sat} max={1.2} y={124} display={`${Math.round(p.sliders.sat * 100)}%`} hot={p.hotSlider === 'sat'} />
          <Slider label="缩放冲击" value={p.sliders.zoom} y={194} display={`${Math.round(p.sliders.zoom * 100)}%`} hot={p.hotSlider === 'zoom'} />
          <Slider label="速度" value={p.sliders.speed} max={2} y={264} display={`${p.sliders.speed.toFixed(1)}x`} hot={p.hotSlider === 'speed'} />
        </Frame>

        {/* timeline panel */}
        <Frame style={{ left: TL.left, top: TL.top, width: TL.width, height: TL.height }} radius={10} border={1.8} fill={C.panel}>
          <div style={{ position: 'absolute', left: TL.originX, right: 16, top: 8, height: 26 }}>
            {Array.from({ length: 33 }).map((_, i) => {
              const x = i * (TL.pxPerSec / 2);
              const major = i % 4 === 0;
              return (
                <div key={i}>
                  <div style={{ position: 'absolute', left: x, top: major ? 8 : 15, width: 1, height: major ? 8 : 4, background: C.ink, opacity: 0.55 }} />
                  {major && (
                    <div style={{ position: 'absolute', left: x + 3, top: 0, fontFamily: FONT.body, fontSize: 9, color: C.inkSoft }}>
                      0:{String(i / 2).padStart(2, '0')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 16,
                top: 48 + i * 42,
                width: 34,
                height: 34,
                borderRadius: 7,
                border: `1.5px solid ${C.ink}`,
                background: [C.yellow, C.mint, C.lav][i],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.body,
                fontSize: 15,
              }}
            >
              {['T', '▶', '♪'][i]}
            </div>
          ))}

          {p.textClipOpacity > 0 && (
            <div
              style={{
                position: 'absolute',
                left: TL.originX + 7.4 * TL.pxPerSec,
                top: TL.textY - TL.top,
                width: 2.0 * TL.pxPerSec,
                height: TL.textH,
                borderRadius: 4,
                border: `1.4px solid ${C.ink}`,
                background: C.yellow,
                opacity: p.textClipOpacity,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                paddingLeft: 5,
                fontFamily: FONT.body,
                fontSize: 10,
                color: C.ink,
                transform: `translateY(${(1 - p.textClipOpacity) * -6}px)`,
              }}
            >
              <span style={{ fontSize: 9 }}>T</span> 前方高能预警
            </div>
          )}

          {p.clips.map((c) => (
            <Clip
              key={c.id}
              x={TL.originX + c.start * TL.pxPerSec}
              w={c.dur * TL.pxPerSec}
              name={c.name}
              scene={c.scene}
              grow={c.grow}
              brightness={c.brightness}
              selected={p.selectedClip === c.id}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              left: TL.originX,
              top: TL.audioY - TL.top,
              width: 13 * TL.pxPerSec,
              height: TL.audioH,
              borderRadius: 5,
              border: `1.5px solid ${C.ink}`,
              background: '#F7F3FC',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', left: 5, top: 3, fontFamily: FONT.body, fontSize: 8.5, color: C.ink, zIndex: 2 }}>♪ bgm_小克.wav</div>
            <div style={{ position: 'absolute', left: 0, top: 12 }}>
              <Waveform width={13 * TL.pxPerSec} height={18} color={C.lavDeep} />
            </div>
          </div>

          <div style={{ position: 'absolute', left: TL.originX, top: 600 - TL.top, width: 13 * TL.pxPerSec, height: 16 }}>
            {Array.from({ length: 34 }).map((_, i) => {
              const on = i / 34 < p.beatProgress;
              if (!on) return null;
              return (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12" style={{ position: 'absolute', left: i * (TL.pxPerSec * 0.5) + 2 }}>
                  <path d="M 6 1 L 11 10 L 1 10 Z" fill={C.yellow} stroke={p.beatHighlight > 0.5 ? C.playhead : C.ink} strokeWidth="1.2" />
                </svg>
              );
            })}
          </div>

          <div
            style={{
              position: 'absolute',
              left: TL.originX + p.time * TL.pxPerSec - 1,
              top: 30,
              width: 2,
              height: 216,
              background: C.playhead,
              opacity: 0.9,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -5,
                top: -2,
                width: 12,
                height: 14,
                background: C.playhead,
                border: `1.4px solid #8E2436`,
                clipPath: 'polygon(0 0, 100% 0, 100% 55%, 50% 100%, 0 55%)',
              }}
            />
          </div>

          {p.trash > 0 && (
            <div style={{ position: 'absolute', left: 540, top: 592 - TL.top, opacity: p.trash }}>
              <svg width="70" height="86" viewBox="0 0 70 86">
                <path d="M 18 20 L 52 20 L 47 78 L 23 78 Z" fill="#CFCABC" stroke={C.ink} strokeWidth="2.4" strokeLinejoin="round" />
                <path d="M 14 20 H 56" stroke={C.ink} strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 26 12 H 44 L 46 20 H 24 Z" fill="#E3DED0" stroke={C.ink} strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M 31 34 L 29 66 M 39 34 L 39 66" stroke={C.ink} strokeWidth="1.6" opacity="0.45" />
              </svg>
            </div>
          )}

          <div style={{ position: 'absolute', left: 16, bottom: 6, width: 120, height: 16 }}>
            <div style={{ position: 'absolute', top: 7, left: 0, width: 100, height: 2, background: '#D8D1C1' }} />
            <div style={{ position: 'absolute', top: 3, left: 44, width: 9, height: 9, borderRadius: 9, background: C.panel, border: `1.4px solid ${C.ink}` }} />
            <div style={{ position: 'absolute', top: 1, left: 2, fontFamily: FONT.body, fontSize: 9, color: C.inkSoft }}>−</div>
            <div style={{ position: 'absolute', top: 0, left: 104, fontFamily: FONT.body, fontSize: 9, color: C.inkSoft }}>+</div>
          </div>
          <div style={{ position: 'absolute', right: 16, bottom: 8, fontFamily: FONT.body, fontSize: 9.5, color: C.inkFaint }}>片段 4 · 总时长 0:13.0</div>
        </Frame>

        {p.armTo && p.mascot && <RubberArm from={{ x: p.mascot.x + 48, y: p.mascot.y - 62 }} to={p.armTo} width={13} />}
        {p.mascot && <Mascot x={p.mascot.x} y={p.mascot.y} scale={p.mascot.scale} pose={p.mascot.pose} legPhase={p.mascot.legPhase} />}
      </Frame>

      {p.dim > 0 && <div style={{ position: 'absolute', inset: 0, background: C.panelSoft, opacity: p.dim, borderRadius: 14 }} />}
    </div>
  );
};
