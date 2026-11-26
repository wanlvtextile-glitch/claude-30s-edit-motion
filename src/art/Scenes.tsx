import React from 'react';
import { C } from '../theme';

export const NightCity: React.FC<{ showTitle?: boolean }> = ({ showTitle }) => {
  const buildings = [
    { x: 4, w: 26, h: 92, y: 232 },
    { x: 30, w: 20, h: 132, y: 192 },
    { x: 50, w: 28, h: 104, y: 220 },
    { x: 78, w: 22, h: 156, y: 168 },
    { x: 100, w: 30, h: 118, y: 206 },
    { x: 130, w: 20, h: 142, y: 182 },
    { x: 150, w: 32, h: 96, y: 228 },
    { x: 182, w: 16, h: 136, y: 188 },
  ];
  const windows: { x: number; y: number; w: number; h: number }[] = [];
  buildings.forEach((b, bi) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < Math.max(1, Math.floor(b.w / 10)); c++) {
        const seed = (bi * 31 + r * 17 + c * 7) % 11;
        if (seed < 4) continue;
        const w = 3.4;
        windows.push({ x: b.x + 4 + c * 9, y: b.y + 8 + r * 13, w, h: 5.4 });
      }
    }
  });
  return (
    <svg viewBox="0 0 200 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E2050" />
          <stop offset="0.55" stopColor="#33306A" />
          <stop offset="1" stopColor="#5B4680" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8D6BA8" stopOpacity="0.0" />
          <stop offset="1" stopColor="#C9A6D8" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="200" height="400" fill="url(#sky)" />
      <rect y="250" width="200" height="150" fill="url(#glow)" />
      {[
        [22, 48, 1.7],
        [58, 30, 1.2],
        [92, 62, 1.5],
        [128, 36, 1.9],
        [168, 58, 1.3],
        [44, 88, 1.1],
        [150, 96, 1.6],
        [182, 26, 1.2],
        [12, 120, 1.4],
        [110, 116, 1.1],
        [74, 140, 1.2],
        [190, 150, 1.3],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#FFF6D8" opacity={0.85} />
      ))}
      <path d="M 60 14 L 34 30" stroke="#FFF3CC" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M 60 14 L 58 16" stroke="#FFF3CC" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <g>
        <circle cx="132" cy="74" r="30" fill="#F7DC7A" />
        <circle cx="120" cy="64" r="30" fill="#2B2A5E" />
        <circle cx="146" cy="56" r="2.4" fill="#E4C059" opacity="0.6" />
        <circle cx="150" cy="86" r="3.2" fill="#E4C059" opacity="0.55" />
        <circle cx="134" cy="96" r="2" fill="#E4C059" opacity="0.5" />
      </g>
      <g opacity="0.9">
        {buildings.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={i % 2 ? '#26254F' : '#1F1E45'} rx={1.5} />
        ))}
        {windows.map((w, i) => (
          <rect key={i} x={w.x} y={w.y} width={w.w} height={w.h} fill={C.window} opacity={0.85} rx={0.6} />
        ))}
      </g>
      <rect y="320" width="200" height="80" fill="#181736" />
      <path d="M 0 322 L 200 322" stroke="#3A3963" strokeWidth="1" />
      {showTitle && (
        <g>
          <rect x="14" y="14" width="96" height="30" rx="8" fill="#F7DC7A" stroke={C.ink} strokeWidth="2" />
          <text x="62" y="36" textAnchor="middle" fontFamily="WenKai" fontSize="18" fill={C.ink}>
            夜景.mp4
          </text>
        </g>
      )}
    </svg>
  );
};

export const Ramen: React.FC<{ banner?: boolean }> = ({ banner = true }) => {
  return (
    <svg viewBox="0 0 200 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8E7BF" />
          <stop offset="1" stopColor="#F0D49A" />
        </linearGradient>
        <linearGradient id="bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4E9DC" />
        </linearGradient>
      </defs>
      <rect width="200" height="400" fill="url(#rbg)" />
      <rect y="290" width="200" height="110" fill="#DCAE73" />
      <path d="M0 292 H 200" stroke="#C08F55" strokeWidth="2" />
      {[30, 170].map((x) => (
        <ellipse key={x} cx={x} cy="320" rx="12" ry="3" fill="#C99A60" opacity="0.5" />
      ))}
      {banner && (
        <g>
          <rect x="12" y="14" width="42" height="38" rx="6" fill="#3F4F9E" stroke={C.ink} strokeWidth="2" />
          <rect x="60" y="14" width="42" height="38" rx="6" fill="#3F4F9E" stroke={C.ink} strokeWidth="2" />
          <rect x="108" y="14" width="42" height="38" rx="6" fill="#3F4F9E" stroke={C.ink} strokeWidth="2" />
          <circle cx="24" cy="22" r="2.2" fill="#F7F3E7" />
          <circle cx="72" cy="22" r="2.2" fill="#F7F3E7" />
          <circle cx="120" cy="22" r="2.2" fill="#F7F3E7" />
          <text x="33" y="43" textAnchor="middle" fontFamily="WenKai" fontSize="22" fill="#FFF9E8">
            拉
          </text>
          <text x="81" y="43" textAnchor="middle" fontFamily="WenKai" fontSize="22" fill="#FFF9E8">
            面
          </text>
        </g>
      )}
      <g>
        <path d="M 100 118 Q 88 138 96 152" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.75" strokeLinecap="round" />
        <path d="M 118 112 Q 110 132 118 146" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 78 124 Q 70 140 78 154" stroke="#FFFFFF" strokeWidth="3.4" fill="none" opacity="0.55" strokeLinecap="round" />
      </g>
      <g>
        <path d="M 152 96 L 190 176" stroke="#8A5A33" strokeWidth="5" strokeLinecap="round" />
        <path d="M 160 90 L 198 168" stroke="#8A5A33" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g>
        <ellipse cx="100" cy="262" rx="72" ry="22" fill="#C98C55" opacity="0.35" />
        <path d="M 34 210 Q 38 286 100 292 Q 162 286 166 210 Z" fill="url(#bowl)" stroke={C.ink} strokeWidth="2.2" />
        <ellipse cx="100" cy="210" rx="66" ry="17" fill="#FFFDF7" stroke={C.ink} strokeWidth="2.2" />
        <path d="M 36 224 Q 100 252 164 224" fill="none" stroke="#D9584D" strokeWidth="7" />
        <path
          d="M 42 228 q 6 -6 12 0 q 6 6 12 0 q 6 -6 12 0 q 6 6 12 0 q 6 -6 12 0 q 6 6 12 0 q 6 -6 12 0 q 6 6 12 0 q 6 -6 12 0 q 6 6 12 0"
          fill="none"
          stroke="#F4B9AF"
          strokeWidth="3"
        />
        <g>
          <path d="M 62 202 q 10 -22 26 -6 q 8 22 -14 26 q -16 -2 -12 -20 z" fill="#F0D07E" stroke="#D8A94E" strokeWidth="1.4" />
          <circle cx="76" cy="210" r="9" fill="#F5A63F" stroke="#D7892E" strokeWidth="1.4" />
          <circle cx="76" cy="210" r="4" fill="#F7C36A" />
          <ellipse cx="118" cy="208" rx="16" ry="8" fill="#E9D9B8" stroke="#C9B48B" strokeWidth="1.2" />
          <path d="M 118 201 q 8 0 12 7" stroke="#D9584D" strokeWidth="2.4" fill="none" />
          <rect x="94" y="192" width="16" height="11" rx="2" fill="#3F5D3C" transform="rotate(-12 102 197)" />
          <path d="M 138 202 q 10 2 8 12" stroke="#6E9A5B" strokeWidth="3" fill="none" />
        </g>
        <path d="M 46 252 q 54 30 108 0" fill="none" stroke="#E8DDCB" strokeWidth="2" opacity="0.8" />
      </g>
    </svg>
  );
};

export const Shiba: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <svg viewBox="0 0 200 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4F6E9" />
          <stop offset="0.6" stopColor="#C4E9D7" />
          <stop offset="1" stopColor="#9FD5C2" />
        </linearGradient>
      </defs>
      <rect width="200" height="400" fill="url(#sbg)" />
      {[
        [30, 60],
        [170, 44],
        [158, 120],
        [26, 150],
        [184, 200],
        [20, 260],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 2 : 3} fill="#FFFFFF" opacity="0.75" />
      ))}
      <g>
        <ellipse cx="100" cy="356" rx="78" ry="16" fill="#7FBDAA" opacity="0.35" />
        <path d="M 54 268 Q 100 236 146 268 L 162 372 Q 100 392 38 372 Z" fill="#E39A57" stroke={C.ink} strokeWidth="2" />
        <path d="M 74 300 Q 100 286 126 300 L 136 372 Q 100 384 64 372 Z" fill="#FFF6E6" />
        <g>
          <path d="M 46 186 L 40 118 L 88 152 Z" fill="#E39A57" stroke={C.ink} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 154 186 L 160 118 L 112 152 Z" fill="#E39A57" stroke={C.ink} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 52 172 L 48 134 L 80 156 Z" fill="#F8C9AC" />
          <path d="M 148 172 L 152 134 L 120 156 Z" fill="#F8C9AC" />
          <ellipse cx="100" cy="210" rx="62" ry="52" fill="#E8A05D" stroke={C.ink} strokeWidth="2.4" />
          <path d="M 100 258 q -40 -4 -46 -30 q 22 4 46 8 q 24 -4 46 -8 q -6 26 -46 30 z" fill="#FFF6E6" />
          <ellipse cx="100" cy="234" rx="40" ry="30" fill="#FFF6E6" />
          <path d="M 70 196 q 6 -8 13 -1" stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 117 195 q 7 -7 13 1" stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="82" cy="222" rx="7" ry="4" fill="#F3B3B3" opacity="0.85" />
          <ellipse cx="118" cy="222" rx="7" ry="4" fill="#F3B3B3" opacity="0.85" />
          <path d="M 96 216 l 4 -3 l 4 3 l -4 4 z" fill={C.ink} />
          <path d="M 100 220 q 0 5 4 6 M 100 220 q 0 5 -4 6" stroke={C.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 88 250 q 12 8 24 0" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M 64 238 q -8 6 -4 14 M 84 238 q -8 5 -4 13 M 136 238 q 8 6 4 14 M 116 238 q 8 5 4 13" stroke="#C9813F" strokeWidth="1.6" opacity="0.6" fill="none" />
          <g>
            <path d="M 138 152 q 6 -8 12 0 q -6 8 -12 0 z" fill="#F4A7B9" stroke="#D97E92" strokeWidth="1.4" />
            <path d="M 40 180 q 6 -8 12 0 q -6 8 -12 0 z" fill="#F4A7B9" stroke="#D97E92" strokeWidth="1.4" />
          </g>
        </g>
      </g>
      {text && (
        <g transform="rotate(-2 100 330)">
          <text
            x="100"
            y="336"
            textAnchor="middle"
            fontFamily="KuaiLe"
            fontSize="27"
            fill="#F6D763"
            stroke={C.ink}
            strokeWidth="6"
            paintOrder="stroke"
          >
            {text}
          </text>
        </g>
      )}
    </svg>
  );
};

export const Disco: React.FC<{ withMascot?: boolean }> = ({ withMascot = true }) => {
  return (
    <svg viewBox="0 0 200 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6C4A96" />
          <stop offset="0.55" stopColor="#8B5AA6" />
          <stop offset="1" stopColor="#4C3B86" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3C3F86" />
          <stop offset="1" stopColor="#22234F" />
        </linearGradient>
      </defs>
      <rect width="200" height="400" fill="url(#dbg)" />
      <g opacity="0.25">
        <path d="M 100 40 L 10 320 L 34 320 Z" fill="#F3D2F8" />
        <path d="M 100 40 L 166 320 L 190 320 Z" fill="#D2E6F8" />
        <path d="M 100 40 L 80 320 L 120 320 Z" fill="#F8E4C2" />
      </g>
      <g>
        <line x1="100" y1="0" x2="100" y2="40" stroke="#2E2545" strokeWidth="3" />
        <circle cx="100" cy="52" r="22" fill="#C9C3D6" stroke="#2E2545" strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            if ((r + c) % 3 === 0) return null;
            const x = 79 + c * 7;
            const y = 31 + r * 7;
            return <rect key={`${r}-${c}`} x={x} y={y} width="6.4" height="6.4" fill="#F6F0E0" opacity={0.8} />;
          })
        )}
        <path d="M 78 52 A 22 22 0 0 0 122 52" fill="none" stroke="#8D86A3" strokeWidth="1" />
      </g>
      <path d="M 0 300 H 200 V 400 H 0 Z" fill="url(#floor)" />
      <g opacity="0.9">
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 300 + i * 15;
          const w = 200 + i * 40;
          const x = 100 - w / 2;
          return (
            <g key={i}>
              <line x1={0} y1={y} x2={200} y2={y} stroke="#5C5FA8" strokeWidth="1" opacity="0.7" />
              <line x1={x} y1={y} x2={x + w} y2={y + 16} stroke="#5C5FA8" strokeWidth="1" opacity="0.5" />
              <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + 16} stroke="#5C5FA8" strokeWidth="1" opacity="0.5" />
            </g>
          );
        })}
      </g>
      {withMascot && (
        <g transform="translate(50 218) scale(0.84)">
          <g>
            <path d="M 30 70 Q 4 42 14 20" stroke={C.red} strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M 90 70 Q 116 42 106 20" stroke={C.red} strokeWidth="9" fill="none" strokeLinecap="round" />
            <rect x="34" y="84" width="15" height="34" rx="7" fill={C.redDark} />
            <rect x="71" y="84" width="15" height="34" rx="7" fill={C.redDark} />
            <rect x="22" y="30" width="76" height="58" rx="10" fill={C.red} stroke="#8E3B2A" strokeWidth="1.5" />
            <rect x="22" y="30" width="76" height="10" rx="5" fill={C.redLight} opacity="0.6" />
            <path d="M 44 52 q 5 -6 10 0" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 66 52 q 5 -6 10 0" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 52 66 q 8 6 16 0" stroke="#2B2118" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}
      <g fill="#FFF3C4">
        <path d="M 30 120 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z" opacity="0.9" />
        <path d="M 172 90 l 2.4 6 l 6 2.4 l -6 2.4 l -2.4 6 l -2.4 -6 l -6 -2.4 l 6 -2.4 z" opacity="0.8" />
        <path d="M 156 180 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 z" opacity="0.7" />
        <path d="M 38 210 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 z" opacity="0.6" />
      </g>
    </svg>
  );
};

export const FocusBlur: React.FC = () => (
  <svg viewBox="0 0 200 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="focusblur">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>
    <rect width="200" height="400" fill="#CFC7BA" />
    <g filter="url(#focusblur)" opacity="0.85">
      <ellipse cx="100" cy="250" rx="70" ry="46" fill="#EFE6D4" />
      <ellipse cx="100" cy="238" rx="52" ry="20" fill="#E2C28C" />
      <rect x="60" y="80" width="80" height="120" rx="10" fill="#E6DAC4" />
      <circle cx="100" cy="60" r="26" fill="#D9CDB6" />
    </g>
    <g fill="#B4AA9A" opacity="0.5">
      <circle cx="30" cy="330" r="18" />
      <circle cx="180" cy="320" r="12" />
    </g>
  </svg>
);

export const SceneArt: React.FC<{ scene: 'night' | 'ramen' | 'shiba' | 'disco' | 'blur'; overlayText?: string }> = ({
  scene,
  overlayText,
}) => {
  if (scene === 'night') return <NightCity />;
  if (scene === 'ramen') return <Ramen />;
  if (scene === 'shiba') return <Shiba text={overlayText} />;
  if (scene === 'disco') return <Disco />;
  return <FocusBlur />;
};
