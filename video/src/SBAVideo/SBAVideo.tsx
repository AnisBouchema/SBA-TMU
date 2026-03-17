import React from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans';

const { fontFamily: playfair } = loadPlayfair();
const { fontFamily: dmSans } = loadDMSans();

const C = {
  forestGreen: '#1A6B2A',
  midGreen: '#4A9B1A',
  limeGreen: '#7EC820',
  glowYellow: '#C8E800',
  white: '#F9FAF0',
  dark: '#0D2E10',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const SBA_LOGO = staticFile('images/SBA_LOGO_SVG.svg');

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 1 · Logo Reveal · frames 0–120 (local 0–120)
// ─────────────────────────────────────────────────────────────────────────────
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], clamp);

  const underlineScaleX = interpolate(frame, [30, 60], [0, 1], clamp);
  const subtitleOpacity = interpolate(frame, [50, 90], [0, 1], clamp);
  const subtitleY = interpolate(frame, [50, 90], [12, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse at center, #C8E800 0%, #7EC820 40%, #1A6B2A 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Img src={SBA_LOGO} style={{ width: 320, height: 'auto' }} />
      </div>

      {/* Underline sweep */}
      <div
        style={{
          width: 320,
          height: 2,
          background: C.dark,
          borderRadius: 2,
          marginTop: 24,
          transform: `scaleX(${underlineScaleX})`,
          transformOrigin: 'center',
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontFamily: dmSans,
          fontSize: 28,
          fontWeight: 700,
          color: C.dark,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          marginTop: 20,
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        Sustainable Business Association
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 2 · Tagline · frames 120–300 (local 0–180)
// ─────────────────────────────────────────────────────────────────────────────
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Eyebrow + line (local 0–30)
  const eyebrowOpacity = interpolate(frame, [0, 20], [0, 1], clamp);
  const lineScaleX = interpolate(frame, [10, 30], [0, 1], clamp);

  // Title lines (local 20, 35, 50)
  const sustProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const sustY = interpolate(sustProgress, [0, 1], [80, 0]);
  const sustOpacity = interpolate(frame, [20, 38], [0, 1], clamp);

  const bizProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const bizY = interpolate(bizProgress, [0, 1], [80, 0]);
  const bizOpacity = interpolate(frame, [35, 53], [0, 1], clamp);

  const assocProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const assocY = interpolate(assocProgress, [0, 1], [80, 0]);
  const assocOpacity = interpolate(frame, [50, 68], [0, 1], clamp);

  // Tagline body (local 80–110)
  const tagOpacity = interpolate(frame, [80, 110], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: C.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 20,
          fontWeight: 700,
          color: C.glowYellow,
          letterSpacing: '5px',
          textTransform: 'uppercase',
          textAlign: 'center',
          opacity: eyebrowOpacity,
          marginBottom: 24,
        }}
      >
        Toronto Metropolitan University
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: 80,
          height: 2,
          background: C.glowYellow,
          borderRadius: 2,
          marginBottom: 32,
          transform: `scaleX(${lineScaleX})`,
          transformOrigin: 'center',
        }}
      />

      {/* "Sustainable" */}
      <div style={{ overflow: 'hidden', marginBottom: 4 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 108,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1,
            textAlign: 'center',
            opacity: sustOpacity,
            transform: `translateY(${sustY}px)`,
          }}
        >
          Sustainable
        </div>
      </div>

      {/* "Business" */}
      <div style={{ overflow: 'hidden', marginBottom: 4 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 108,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1,
            textAlign: 'center',
            opacity: bizOpacity,
            transform: `translateY(${bizY}px)`,
          }}
        >
          Business
        </div>
      </div>

      {/* "Association" */}
      <div style={{ overflow: 'hidden', marginBottom: 52 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 108,
            fontWeight: 700,
            color: C.limeGreen,
            lineHeight: 1,
            textAlign: 'center',
            opacity: assocOpacity,
            transform: `translateY(${assocY}px)`,
          }}
        >
          Association
        </div>
      </div>

      {/* Tagline body */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 30,
          fontWeight: 300,
          color: 'rgba(249,250,240,0.7)',
          textAlign: 'center',
          opacity: tagOpacity,
        }}
      >
        Where ambition meets responsibility.
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 3 · What We Are · frames 300–450 (local 0–150)
// ─────────────────────────────────────────────────────────────────────────────
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowOpacity = interpolate(frame, [0, 20], [0, 1], clamp);

  // Title lines (local 15, 30)
  const t1Progress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const t1Y = interpolate(t1Progress, [0, 1], [80, 0]);
  const t1Opacity = interpolate(frame, [15, 32], [0, 1], clamp);

  const t2Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const t2Y = interpolate(t2Progress, [0, 1], [80, 0]);
  const t2Opacity = interpolate(frame, [30, 47], [0, 1], clamp);

  // Bullets: local 60, 90, 120
  const bullets = [
    { text: 'Resource Wisdom', delay: 60 },
    { text: 'ESG & Sustainable Finance', delay: 90 },
    { text: 'Ethical Leadership', delay: 120 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #1A6B2A 0%, #4A9B1A 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 18,
          fontWeight: 700,
          color: C.glowYellow,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          opacity: eyebrowOpacity,
          marginBottom: 24,
        }}
      >
        What Is The SBA
      </div>

      {/* "A different kind" */}
      <div style={{ overflow: 'hidden', marginBottom: 4 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 88,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.08,
            opacity: t1Opacity,
            transform: `translateY(${t1Y}px)`,
          }}
        >
          A different kind
        </div>
      </div>

      {/* "of business club" */}
      <div style={{ overflow: 'hidden', marginBottom: 52 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 88,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.08,
            opacity: t2Opacity,
            transform: `translateY(${t2Y}px)`,
          }}
        >
          of business club
        </div>
      </div>

      {/* Bullets slide in from left */}
      {bullets.map(({ text, delay }, i) => {
        const p = spring({
          frame: frame - delay,
          fps,
          config: { damping: 20, stiffness: 80 },
        });
        const x = interpolate(p, [0, 1], [-60, 0]);
        const opacity = interpolate(frame, [delay, delay + 18], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity,
              transform: `translateX(${x}px)`,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: C.glowYellow,
                flexShrink: 0,
                boxShadow: `0 0 8px ${C.glowYellow}`,
              }}
            />
            <span
              style={{
                fontFamily: dmSans,
                fontSize: 36,
                fontWeight: 500,
                color: C.white,
              }}
            >
              {text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 4 · Lifestyle · frames 450–600 (local 0–150)
// ─────────────────────────────────────────────────────────────────────────────
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowOpacity = interpolate(frame, [0, 20], [0, 1], clamp);

  // Title lines (local 15, 30)
  const t1Progress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const t1Y = interpolate(t1Progress, [0, 1], [80, 0]);
  const t1Opacity = interpolate(frame, [15, 32], [0, 1], clamp);

  const t2Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const t2Y = interpolate(t2Progress, [0, 1], [80, 0]);
  const t2Opacity = interpolate(frame, [30, 47], [0, 1], clamp);

  // Cards: local 60, 80, 100
  const cards = [
    { num: '01', title: 'Stay Ambitious', delay: 60 },
    { num: '02', title: 'Rest & Recharge', delay: 80 },
    { num: '03', title: 'Protect Your Health', delay: 100 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: C.dark,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 18,
          fontWeight: 700,
          color: C.limeGreen,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          opacity: eyebrowOpacity,
          marginBottom: 20,
        }}
      >
        The Bigger Idea
      </div>

      {/* "Sustainable business" */}
      <div style={{ overflow: 'hidden', marginBottom: 4 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 88,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.08,
            opacity: t1Opacity,
            transform: `translateY(${t1Y}px)`,
          }}
        >
          Sustainable business
        </div>
      </div>

      {/* "as a lifestyle" */}
      <div style={{ overflow: 'hidden', marginBottom: 48 }}>
        <div
          style={{
            fontFamily: playfair,
            fontSize: 88,
            fontWeight: 700,
            color: C.glowYellow,
            lineHeight: 1.08,
            opacity: t2Opacity,
            transform: `translateY(${t2Y}px)`,
          }}
        >
          as a lifestyle
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cards.map(({ num, title, delay }, i) => {
          const p = spring({
            frame: frame - delay,
            fps,
            config: { damping: 20, stiffness: 80 },
          });
          const y = interpolate(p, [0, 1], [80, 0]);
          const opacity = interpolate(frame, [delay, delay + 16], [0, 1], clamp);
          return (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(126,200,32,0.3)',
                borderRadius: 20,
                padding: '32px 40px',
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: playfair,
                  fontSize: 56,
                  fontWeight: 700,
                  color: C.glowYellow,
                  lineHeight: 1,
                  minWidth: 76,
                  flexShrink: 0,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: dmSans,
                  fontSize: 36,
                  fontWeight: 500,
                  color: C.white,
                }}
              >
                {title}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 5 · Join CTA · frames 600–750 (local 0–150)
// ─────────────────────────────────────────────────────────────────────────────
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Join" scales in from local frame 0
  const joinProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const joinScale = interpolate(joinProgress, [0, 1], [0.7, 1]);
  const joinOpacity = interpolate(frame, [0, 18], [0, 1], clamp);

  // Logo scales in from local frame 30
  const logoProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(frame, [30, 48], [0, 1], clamp);

  // Pulsing glow on the logo
  const pulse = 0.75 + 0.25 * Math.sin((frame / 45) * Math.PI * 2);

  // Subtext (local 50–80)
  const subOpacity = interpolate(frame, [50, 80], [0, 1], clamp);

  // Email pill (local 70–100)
  const emailOpacity = interpolate(frame, [70, 100], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse at center, #C8E800 0%, #7EC820 40%, #1A6B2A 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 80px',
      }}
    >
      {/* "Join" */}
      <div
        style={{
          fontFamily: playfair,
          fontSize: 180,
          fontWeight: 700,
          color: C.dark,
          lineHeight: 1,
          textAlign: 'center',
          opacity: joinOpacity,
          transform: `scale(${joinScale})`,
          marginBottom: 16,
        }}
      >
        Join
      </div>

      {/* SBA Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity * pulse,
          margin: '0 auto 32px',
          filter: `drop-shadow(0 0 30px rgba(200,232,0,${(pulse * 0.5).toFixed(2)}))`,
        }}
      >
        <Img src={SBA_LOGO} style={{ width: 260, height: 'auto' }} />
      </div>

      {/* "Open to all TMU students" */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 34,
          fontWeight: 500,
          color: C.dark,
          textAlign: 'center',
          opacity: subOpacity,
          marginBottom: 28,
        }}
      >
        Open to all TMU students
      </div>

      {/* Email pill */}
      <div
        style={{
          background: 'rgba(13,46,16,0.2)',
          border: '2px solid rgba(13,46,16,0.6)',
          borderRadius: 100,
          padding: '14px 36px',
          fontFamily: dmSans,
          fontSize: 26,
          fontWeight: 500,
          color: C.dark,
          opacity: emailOpacity,
        }}
      >
        sba.torontomu@gmail.com
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPOSITION
// ─────────────────────────────────────────────────────────────────────────────
export const SBAVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.dark }}>
      {/* Scene 1 — Logo Reveal (0–120) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>

      {/* Scene 2 — Tagline (120–300) */}
      <Sequence from={120} durationInFrames={180}>
        <Scene2 />
      </Sequence>

      {/* Scene 3 — What We Are (300–450) */}
      <Sequence from={300} durationInFrames={150}>
        <Scene3 />
      </Sequence>

      {/* Scene 4 — Lifestyle (450–600) */}
      <Sequence from={450} durationInFrames={150}>
        <Scene4 />
      </Sequence>

      {/* Scene 5 — Join CTA (600–750) */}
      <Sequence from={600} durationInFrames={150}>
        <Scene5 />
      </Sequence>

      {/* Persistent watermark — all scenes */}
      <AbsoluteFill style={{ zIndex: 100, pointerEvents: 'none' }}>
        <Img
          src={SBA_LOGO}
          style={{
            position: 'absolute',
            bottom: 48,
            right: 48,
            width: 100,
            height: 'auto',
            opacity: 0.7,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
