import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const springConfig = { damping: 20, stiffness: 80 };
const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

// ── FadeIn ──────────────────────────────────────────────────────────────────
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 20, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], clamp);
  return <div style={{ opacity, ...style }}>{children}</div>;
};

// ── SlideUp ──────────────────────────────────────────────────────────────────
export const SlideUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  fromY?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, fromY = 60, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: springConfig });
  const translateY = interpolate(progress, [0, 1], [fromY, 0]);
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], clamp);

  return (
    <div style={{ transform: `translateY(${translateY}px)`, opacity, ...style }}>
      {children}
    </div>
  );
};

// ── ScaleIn ──────────────────────────────────────────────────────────────────
export const ScaleIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  fromScale?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, fromScale = 0.8, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: springConfig });
  const scale = interpolate(progress, [0, 1], [fromScale, 1]);
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], clamp);

  return (
    <div style={{ transform: `scale(${scale})`, opacity, ...style }}>
      {children}
    </div>
  );
};

// ── WordReveal ────────────────────────────────────────────────────────────────
// Splits text into words, each slides up with a stagger
export const WordReveal: React.FC<{
  text: string;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
  delay?: number;
  staggerDelay?: number;
}> = ({ text, style, wordStyle, delay = 0, staggerDelay = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.28em',
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * staggerDelay;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: springConfig,
        });
        const translateY = interpolate(progress, [0, 1], [50, 0]);
        const opacity = interpolate(
          frame,
          [wordDelay, wordDelay + 12],
          [0, 1],
          clamp
        );
        return (
          <div key={i} style={{ overflow: 'hidden' }}>
            <div
              style={{
                transform: `translateY(${translateY}px)`,
                opacity,
                ...wordStyle,
              }}
            >
              {word}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── LineReveal ────────────────────────────────────────────────────────────────
// Single line slides up from overflow:hidden clip
export const LineReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  fromY?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, fromY = 90, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: springConfig });
  const translateY = interpolate(progress, [0, 1], [fromY, 0]);

  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <div style={{ transform: `translateY(${translateY}px)` }}>{children}</div>
    </div>
  );
};
