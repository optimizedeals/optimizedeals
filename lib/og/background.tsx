import { OG_CONFIG } from './config'

/**
 * Background component for OG images
 * Recreates the OptimizeDeals branded background with:
 * - Deep blue gradient
 * - Curved accent shapes
 * - Subtle layering
 */
export function OGBackground() {
  const { width, height, colors } = OG_CONFIG
  
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width,
        height,
        display: 'flex',
        background: `linear-gradient(135deg, ${colors.bgDark} 0%, ${colors.bgMedium} 50%, ${colors.bgLight} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Primary curved shape - large arc on the right */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {/* Large curved accent - sweeping from top-right */}
        <path
          d={`
            M ${width * 0.4} 0
            Q ${width * 0.6} ${height * 0.2}, ${width} ${height * 0.3}
            L ${width} 0
            Z
          `}
          fill="rgba(59, 128, 236, 0.15)"
        />
        
        {/* Secondary curve - flowing down the right side */}
        <path
          d={`
            M ${width * 0.5} 0
            Q ${width * 0.8} ${height * 0.4}, ${width} ${height * 0.6}
            L ${width} 0
            Z
          `}
          fill="rgba(59, 128, 236, 0.1)"
        />
        
        {/* Bottom accent curve */}
        <path
          d={`
            M 0 ${height}
            Q ${width * 0.3} ${height * 0.85}, ${width * 0.7} ${height}
            L 0 ${height}
            Z
          `}
          fill="rgba(0, 84, 214, 0.2)"
        />
        
        {/* Subtle inner glow */}
        <ellipse
          cx={width * 0.75}
          cy={height * 0.3}
          rx={width * 0.4}
          ry={height * 0.5}
          fill="rgba(59, 128, 236, 0.08)"
        />
      </svg>
    </div>
  )
}

/**
 * Simplified background for article pages
 * Cleaner aesthetic for content-heavy OG images
 */
export function OGBackgroundArticle() {
  const { width, height, colors } = OG_CONFIG
  
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width,
        height,
        display: 'flex',
        background: `linear-gradient(145deg, ${colors.bgDark} 0%, ${colors.bgMedium} 70%, ${colors.bgLight} 100%)`,
        overflow: 'hidden',
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {/* Elegant curved accent */}
        <path
          d={`
            M ${width * 0.6} 0
            C ${width * 0.7} ${height * 0.3}, ${width * 0.9} ${height * 0.5}, ${width} ${height * 0.4}
            L ${width} 0
            Z
          `}
          fill="rgba(59, 128, 236, 0.12)"
        />
        
        {/* Subtle bottom wave */}
        <path
          d={`
            M 0 ${height * 0.9}
            Q ${width * 0.25} ${height * 0.85}, ${width * 0.5} ${height * 0.95}
            Q ${width * 0.75} ${height * 1.05}, ${width} ${height * 0.9}
            L ${width} ${height}
            L 0 ${height}
            Z
          `}
          fill="rgba(0, 84, 214, 0.15)"
        />
      </svg>
    </div>
  )
}
