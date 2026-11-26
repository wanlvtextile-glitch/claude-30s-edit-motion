import React from 'react';
import { C } from '../theme';

export type Pose = 'idle' | 'happy' | 'dance' | 'sleep' | 'shades' | 'wink';

export const Mascot: React.FC<{
  x: number;
  y: number;
  scale?: number;
  pose?: Pose;
  legPhase?: number;
  flip?: boolean;
  style?: React.CSSProperties;
  bodyColor?: string;
}> = ({ x, y, scale = 1, pose = 'idle', legPhase = 0, flip = false, style, bodyColor = C.red }) => {
  const bob = Math.sin(legPhase * Math.PI * 2) * 2;
  const legSwing = Math.sin(legPhase * Math.PI * 2) * 5;
  const isHappy = pose === 'happy' || pose === 'dance' || pose === 'shades' || pose === 'wink';
  const shades = pose === 'shades';
  const armsUp = pose === 'dance' || pose === 'happy';

  return (
    <svg
      width={140 * scale}
      height={140 * scale}
      viewBox="0 0 140 140"
      style={{ position: 'absolute', left: x - 70 * scale, top: y - 118 * scale, overflow: 'visible', ...style }}
    >
      <defs>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bodyColor} />
          <stop offset="1" stopColor={C.redDark} />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="127" rx="34" ry="6" fill="#3A3020" opacity="0.16" />
      <g transform={`translate(0 ${bob})`}>
        <g transform={`rotate(${legSwing} 52 100)`}>
          <rect x="45" y="96" width="17" height="29" rx="8" fill={C.redDark} />
          <rect x="43" y="117" width="21" height="9" rx="4.5" fill={C.redDark} />
        </g>
        <g transform={`rotate(${-legSwing} 88 100)`}>
          <rect x="78" y="96" width="17" height="29" rx="8" fill={C.redDark} />
          <rect x="76" y="117" width="21" height="9" rx="4.5" fill={C.redDark} />
        </g>
        {armsUp ? (
          <>
            <path d="M 40 62 Q 20 45 24 30" stroke={bodyColor} strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 100 62 Q 120 45 116 30" stroke={bodyColor} strokeWidth="11" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <rect x="28" y="66" width="12" height="18" rx="6" fill={bodyColor} />
            <rect x="100" y="66" width="12" height="18" rx="6" fill={bodyColor} />
          </>
        )}
        <rect x="36" y="26" width="68" height="78" rx="11" fill="url(#mascotGrad)" stroke="#8E3B2A" strokeWidth="1.2" />
        <rect x="36" y="26" width="68" height="14" rx="7" fill={C.redLight} opacity="0.45" />
        <rect x="36" y="92" width="68" height="12" rx="6" fill="#8E3B2A" opacity="0.18" />
        {pose === 'wink' ? (
          <>
            <ellipse cx="55" cy="56" rx="4.6" ry="7.4" fill="#2B2118" />
            <path d="M 72 58 q 6 -7 12 0" stroke="#2B2118" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          </>
        ) : shades ? (
          <>
            <rect x="41" y="47" width="22" height="15" rx="4" fill="#22201C" />
            <rect x="73" y="47" width="22" height="15" rx="4" fill="#22201C" />
            <path d="M 63 51 H 73" stroke="#22201C" strokeWidth="3" />
            <path d="M 45 50 l 5 0" stroke="#6B665C" strokeWidth="1.6" />
            <path d="M 77 50 l 5 0" stroke="#6B665C" strokeWidth="1.6" />
          </>
        ) : isHappy ? (
          <>
            <path d="M 48 58 q 7 -9 14 0" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 76 58 q 7 -9 14 0" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="47" cy="68" rx="4.5" ry="2.6" fill="#F2AE9C" opacity="0.8" />
            <ellipse cx="93" cy="68" rx="4.5" ry="2.6" fill="#F2AE9C" opacity="0.8" />
          </>
        ) : pose === 'sleep' ? (
          <>
            <path d="M 49 56 q 6 3 12 0" stroke="#2B2118" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 77 56 q 6 3 12 0" stroke="#2B2118" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="50" cy="56" rx="4.4" ry="7.6" fill="#2B2118" />
            <ellipse cx="88" cy="56" rx="4.4" ry="7.6" fill="#2B2118" />
            <circle cx="48.6" cy="53.4" r="1.2" fill="#FFFFFF" opacity="0.55" />
            <circle cx="86.6" cy="53.4" r="1.2" fill="#FFFFFF" opacity="0.55" />
            <path d="M 64 70 q 6 4 12 0" stroke="#2B2118" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </>
        )}
      </g>
    </svg>
  );
};

export const RubberArm: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  bend?: number;
  width?: number;
}> = ({ from, to, bend = 0.25, width = 13 }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const nx = -dy / (len || 1);
  const ny = dx / (len || 1);
  const cx = from.x + dx * 0.45 + nx * bend * len * 0.2;
  const cy = from.y + dy * 0.45 + ny * bend * len * 0.2;
  return (
    <svg width={1280} height={720} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      <path
        d={`M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`}
        fill="none"
        stroke={C.red}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <path
        d={`M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`}
        fill="none"
        stroke={C.redLight}
        strokeWidth={width * 0.35}
        strokeLinecap="round"
        opacity="0.45"
        transform="translate(-1 -2)"
      />
      <circle cx={to.x} cy={to.y} r={width * 0.62} fill={C.red} />
      <circle cx={to.x} cy={to.y} r={width * 0.28} fill={C.redLight} opacity="0.35" />
    </svg>
  );
};
