import { OG_CONFIG } from './config'

/**
 * OptimizeDeals Logo component for OG images
 * SVG logo with wordmark - positioned top-left
 */
export function OGLogo({ size = 'default' }: { size?: 'default' | 'small' }) {
  const scale = size === 'small' ? 0.8 : 1
  const logoHeight = Math.round(40 * scale)
  const logoWidth = Math.round(280 * scale)
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: Math.round(12 * scale),
        position: 'absolute',
        top: OG_CONFIG.spacing.logoTop,
        left: OG_CONFIG.spacing.logoLeft,
      }}
    >
      {/* Logo Icon - Circle with slash */}
      <svg
        width={logoHeight}
        height={logoHeight}
        viewBox="0 0 40 40"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="white"
          strokeWidth="3"
          fill="none"
        />
        <line
          x1="10"
          y1="30"
          x2="30"
          y2="10"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Wordmark */}
      <span
        style={{
          fontSize: Math.round(28 * scale),
          fontWeight: 600,
          color: 'white',
          letterSpacing: '-0.02em',
          fontFamily: 'Geist, system-ui, sans-serif',
        }}
      >
        OptimizeDeals
      </span>
    </div>
  )
}
