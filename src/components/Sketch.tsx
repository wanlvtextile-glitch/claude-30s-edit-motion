import React from 'react';
import { C, FONT } from '../theme';

type Style = React.CSSProperties;

export const Frame: React.FC<{
  style?: Style;
  children?: React.ReactNode;
  fill?: string;
  radius?: number;
  border?: number;
  shadow?: boolean;
}> = ({ style, children, fill = C.panel, radius = 10, border = 2, shadow = true }) => (
  <div
    style={{
      position: 'absolute',
      background: fill,
      border: `${border}px solid ${C.ink}`,
      borderRadius: radius,
      boxShadow: shadow ? '0 3px 0 rgba(49,46,40,0.10), 0 14px 28px rgba(49,46,40,0.10)' : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

export const HLine: React.FC<{ style?: Style; color?: string }> = ({ style, color = C.ink }) => (
  <div style={{ position: 'absolute', height: 1.5, background: color, opacity: 0.55, ...style }} />
);

export const Capsule: React.FC<{
  children?: React.ReactNode;
  style?: Style;
  fill?: string;
  active?: boolean;
  fontSize?: number;
  radius?: number;
}> = ({ children, style, fill = C.panelSoft, active, fontSize = 13, radius = 8 }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: fill,
      border: `1.6px solid ${C.ink}`,
      borderRadius: radius,
      color: C.ink,
      fontFamily: FONT.body,
      fontSize,
      lineHeight: 1,
      boxShadow: active ? '0 2px 0 rgba(49,46,40,0.18)' : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Tape: React.FC<{ style?: Style; rotate?: number; width?: number; height?: number; color?: string }> = ({
  style,
  rotate = -4,
  width = 54,
  height = 16,
  color = 'rgba(241,205,102,0.78)',
}) => (
  <div
    style={{
      position: 'absolute',
      width,
      height,
      background: color,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
      ...style,
    }}
  />
);

export const OutlinedText: React.FC<{
  children: React.ReactNode;
  style?: Style;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
  font?: string;
  size?: number;
  shadow?: boolean;
  rotate?: number;
}> = ({
  children,
  style,
  color = C.white,
  stroke = C.ink,
  strokeWidth = 5,
  font = FONT.display,
  size = 40,
  shadow = true,
  rotate = 0,
}) => (
  <div
    style={{
      fontFamily: font,
      fontSize: size,
      lineHeight: 1.05,
      color,
      WebkitTextStroke: `${strokeWidth}px ${stroke}`,
      paintOrder: 'stroke fill',
      letterSpacing: 1,
      transform: `rotate(${rotate}deg)`,
      filter: shadow ? 'drop-shadow(0 4px 0 rgba(49,46,40,0.28))' : undefined,
      whiteSpace: 'pre',
      ...style,
    }}
  >
    {children}
  </div>
);

export const SpeechBubble: React.FC<{
  children: React.ReactNode;
  style?: Style;
  tail?: 'down' | 'left' | 'right' | 'none';
  rotate?: number;
  fontSize?: number;
  fill?: string;
}> = ({ children, style, tail = 'down', rotate = -2, fontSize = 20, fill = C.panel }) => (
  <div style={{ position: 'absolute', transform: `rotate(${rotate}deg)`, ...style }}>
    <div
      style={{
        background: fill,
        border: `2px solid ${C.ink}`,
        borderRadius: 14,
        padding: '8px 14px',
        fontFamily: FONT.body,
        fontSize,
        color: C.ink,
        whiteSpace: 'pre',
        boxShadow: '0 3px 0 rgba(49,46,40,0.10)',
      }}
    >
      {children}
    </div>
    {tail === 'down' && (
      <div
        style={{
          position: 'absolute',
          left: 24,
          bottom: -9,
          width: 16,
          height: 16,
          background: fill,
          borderRight: `2px solid ${C.ink}`,
          borderBottom: `2px solid ${C.ink}`,
          transform: 'rotate(45deg)',
        }}
      />
    )}
    {tail === 'left' && (
      <div
        style={{
          position: 'absolute',
          left: -9,
          top: 16,
          width: 16,
          height: 16,
          background: fill,
          borderLeft: `2px solid ${C.ink}`,
          borderBottom: `2px solid ${C.ink}`,
          transform: 'rotate(45deg)',
        }}
      />
    )}
  </div>
);

export const KeyCap: React.FC<{
  children: React.ReactNode;
  style?: Style;
  rotate?: number;
  fontSize?: number;
  width?: number;
}> = ({ children, style, rotate = -3, fontSize = 22, width = 160 }) => (
  <div
    style={{
      position: 'absolute',
      width,
      padding: '10px 12px',
      background: C.panel,
      border: `2.4px solid ${C.ink}`,
      borderRadius: 10,
      boxShadow: '0 6px 0 #D8D0BE, 0 10px 18px rgba(49,46,40,0.16)',
      fontFamily: FONT.mono,
      fontWeight: 700,
      fontSize,
      color: C.ink,
      textAlign: 'center',
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Stamp: React.FC<{ text: string; style?: Style; rotate?: number; color?: string; size?: number }> = ({
  text,
  style,
  rotate = -6,
  color = C.stamp,
  size = 40,
}) => (
  <div
    style={{
      position: 'absolute',
      padding: '6px 18px',
      border: `4px solid ${color}`,
      borderRadius: 8,
      color,
      fontFamily: FONT.display,
      fontSize: size,
      letterSpacing: 2,
      whiteSpace: 'nowrap',
      transform: `rotate(${rotate}deg)`,
      opacity: 0.92,
      boxShadow: `inset 0 0 0 2px rgba(255,255,255,0.5)`,
      ...style,
    }}
  >
    {text}
  </div>
);

export const Sparkle: React.FC<{ x: number; y: number; size?: number; color?: string; rotate?: number }> = ({
  x,
  y,
  size = 14,
  color = '#FFF7D6',
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `rotate(${rotate}deg)` }}
  >
    <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill={color} />
  </svg>
);

export const HandArrow: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  curve?: number;
  color?: string;
  width?: number;
}> = ({ from, to, curve = 0, color = C.red, width = 4 }) => {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curve;
  const cy = my + ny * curve;
  const ang = Math.atan2(to.y - cy, to.x - cx);
  const ah = 16;
  const p1 = { x: to.x - ah * Math.cos(ang - 0.45), y: to.y - ah * Math.sin(ang - 0.45) };
  const p2 = { x: to.x - ah * Math.cos(ang + 0.45), y: to.y - ah * Math.sin(ang + 0.45) };
  return (
    <svg width={1280} height={720} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      <path
        d={`M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        opacity={0.9}
        strokeDasharray="0.5 9"
      />
      <path
        d={`M ${p1.x} ${p1.y} L ${to.x} ${to.y} L ${p2.x} ${p2.y}`}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
    </svg>
  );
};

export const DoodleSparkleRow: React.FC<{ style?: Style }> = ({ style }) => (
  <svg width={80} height={30} viewBox="0 0 80 30" style={{ position: 'absolute', ...style }}>
    {[10, 28, 46, 64].map((x, i) => (
      <path
        key={x}
        d={`M ${x} ${4 + (i % 2) * 6} l 4 8 l 8 1 l -6 6 l 2 8 l -8 -4 l -8 4 l 2 -8 l -6 -6 l 8 -1 z`}
        fill={C.yellow}
        stroke={C.ink}
        strokeWidth={1.2}
      />
    ))}
  </svg>
);
