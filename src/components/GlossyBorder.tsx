'use client'

import { motion } from 'framer-motion'

/** Preset color tokens — import these in call sites instead of raw rgba strings */
export const GLOSS_WHITE  = 'rgba(255,255,255,0.8)'
export const GLOSS_BLUE   = 'rgba(59,130,246,0.8)'
export const GLOSS_PURPLE = 'rgba(168,85,247,0.8)'

interface GlossyBorderProps {
  /** CSS color value, e.g. GLOSS_WHITE or 'rgba(59,130,246,0.8)'. Default: white/80 */
  color?: string
  /** Duration in seconds for one pass along an edge. Default: 8 */
  duration?: number
  /** Additional base delay (seconds) before the top edge starts. Default: 0 */
  delay?: number
  /** Which edges to animate (clockwise). Default: all four edges. */
  edges?: ('top' | 'right' | 'bottom' | 'left')[]
  /** Add a wider blurred glow strip alongside horizontal edges. Default: false */
  showGlow?: boolean
  /** Optional explicit card width (e.g. '320px'). Overrides inset-0 width. */
  cardWidth?: string
  /** Optional explicit card height (e.g. '120px'). Overrides inset-0 height. */
  cardHeight?: string
}

/** Clockwise stagger offsets so the light travels around the border */
const EDGE_STAGGER: Record<string, number> = { top: 0, right: 2, bottom: 4, left: 6 }

/**
 * GlossyBorder — animated light-pass effect along the edges of a card.
 *
 * Usage (add inside a `relative overflow-hidden` parent):
 *   <GlossyBorder />                                        // default white perimeter
 *   <GlossyBorder color={GLOSS_BLUE} edges={['top']} duration={3} showGlow />
 *   <GlossyBorder color={GLOSS_PURPLE} edges={['top','bottom']} duration={3} showGlow />
 */
export default function GlossyBorder({
  color = GLOSS_WHITE,
  duration = 8,
  delay = 0,
  edges = ['top', 'right', 'bottom', 'left'],
  showGlow = false,
  cardWidth,
  cardHeight,
}: GlossyBorderProps) {
  const glowColor = color.replace(/,\s*[\d.]+\)$/, ', 0.4)')

  const tx = (edge: string) => ({
    duration,
    ease: 'linear' as const,
    repeat: Infinity,
    repeatDelay: 0,
    delay: delay + EDGE_STAGGER[edge],
  })

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={cardWidth || cardHeight ? { width: cardWidth, height: cardHeight } : undefined}
    >

      {/* ── Top ──────────────────────────────────────────────── */}
      {edges.includes('top') && (
        <>
          <motion.div
            className="absolute top-0 left-0 h-[2px] w-[40%]"
            style={{
              filter: 'blur(1px)',
              background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            }}
            animate={{ left: ['-40%', '100%'] }}
            transition={tx('top')}
          />
          {showGlow && (
            <motion.div
              className="absolute top-0 left-0 h-[4px] w-[40%] blur-sm"
              style={{ background: `linear-gradient(to right, transparent, ${glowColor}, transparent)` }}
              animate={{ left: ['-40%', '100%'] }}
              transition={tx('top')}
            />
          )}
        </>
      )}

      {/* ── Right ────────────────────────────────────────────── */}
      {edges.includes('right') && (
        <motion.div
          className="absolute top-0 right-0 w-[2px] h-[40%]"
          style={{
            filter: 'blur(1px)',
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
          }}
          animate={{ top: ['-40%', '100%'] }}
          transition={tx('right')}
        />
      )}

      {/* ── Bottom ───────────────────────────────────────────── */}
      {edges.includes('bottom') && (
        <>
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] w-[40%]"
            style={{
              filter: 'blur(1px)',
              background: `linear-gradient(to left, transparent, ${color}, transparent)`,
            }}
            animate={{ right: ['-40%', '100%'] }}
            transition={tx('bottom')}
          />
          {showGlow && (
            <motion.div
              className="absolute bottom-0 right-0 h-[4px] w-[40%] blur-sm"
              style={{ background: `linear-gradient(to left, transparent, ${glowColor}, transparent)` }}
              animate={{ right: ['-40%', '100%'] }}
              transition={tx('bottom')}
            />
          )}
        </>
      )}

      {/* ── Left ─────────────────────────────────────────────── */}
      {edges.includes('left') && (
        <motion.div
          className="absolute bottom-0 left-0 w-[2px] h-[40%]"
          style={{
            filter: 'blur(1px)',
            background: `linear-gradient(to top, transparent, ${color}, transparent)`,
          }}
          animate={{ bottom: ['-40%', '100%'] }}
          transition={tx('left')}
        />
      )}

    </div>
  )
}
