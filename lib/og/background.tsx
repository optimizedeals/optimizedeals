import { OG_CONFIG } from "./config";

/**
 * Background component for OG images
 * Recreates the OptimizeDeals branded background with:
 * - Deep blue gradient
 * - Curved accent shapes
 * - Subtle layering
 */
export function OGBackground() {
  const { width, height, colors } = OG_CONFIG;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width,
        height,
        display: "flex",
        background: `linear-gradient(135deg, ${colors.bgDark} 0%, ${colors.bgMedium} 50%, ${colors.bgLight} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Primary curved shape - large arc on the right */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_403_2896)">
          <rect y="-7" width={width} height={height} fill="#F5F5F5" />
          <mask
            id="mask0_403_2896"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="43"
            y="64"
            width="1157"
            height="566"
          >
            <rect
              x="43.4727"
              y="64.5571"
              width="1156.53"
              height="565.443"
              fill="#F5F5F5"
            />
          </mask>
          <g mask="url(#mask0_403_2896)">
            <g filter="url(#filter0_f_403_2896)">
              <ellipse
                cx="353.383"
                cy="308.678"
                rx="353.383"
                ry="308.678"
                transform="matrix(-1 0 0 1 555.879 -93.2898)"
                fill="url(#paint0_radial_403_2896)"
              />
            </g>
            <g filter="url(#filter1_f_403_2896)">
              <ellipse
                cx="373.06"
                cy="325.866"
                rx="373.06"
                ry="325.866"
                transform="matrix(-1 0 0 1 1406.41 143.13)"
                fill="url(#paint1_radial_403_2896)"
              />
            </g>
          </g>
          <g clipPath="url(#clip1_403_2896)">
            <rect
              width="1200"
              height="637"
              transform="translate(0 -7)"
              fill="#0054D6"
            />
            <path
              d="M220.842 -295.536C-422.12 -295.536 -943.334 -108.468 -943.334 122.303C-943.334 353.075 -422.12 540.155 220.842 540.155C863.803 540.155 1385.02 353.088 1385.02 122.303C1385.02 -108.481 863.803 -295.536 220.842 -295.536ZM218.173 451.415C-253.951 517.345 -635.496 423.437 -634.042 241.674C-632.565 59.9101 -248.661 -140.867 223.463 -206.784C695.61 -272.713 1077.15 -178.806 1075.68 2.95803C1074.22 184.722 690.32 385.498 218.173 451.415Z"
              fill="url(#paint2_linear_403_2896)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_403_2896"
            x="-230.889"
            y="-173.29"
            width="866.768"
            height="777.357"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="40"
              result="effect1_foregroundBlur_403_2896"
            />
          </filter>
          <filter
            id="filter1_f_403_2896"
            x="580.287"
            y="63.13"
            width="906.121"
            height="811.732"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="40"
              result="effect1_foregroundBlur_403_2896"
            />
          </filter>
          <radialGradient
            id="paint0_radial_403_2896"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-15.2605 476.191 -545.157 -13.3299 536.458 352.09)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C7E5DB" />
            <stop offset="1" stopColor="#F2EEFF" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_403_2896"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-16.1102 502.706 -575.512 -14.0722 566.329 371.695)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C7E5DB" />
            <stop offset="1" stopColor="#F2EEFF" />
          </radialGradient>
          <linearGradient
            id="paint2_linear_403_2896"
            x1="206.877"
            y1="540.168"
            x2="214.503"
            y2="-295.721"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B80EC" stopOpacity="0" />
            <stop offset="1" stopColor="#3B80EC" />
          </linearGradient>
          <clipPath id="clip0_403_2896">
            <rect width="1200" height="630" fill="white" />
          </clipPath>
          <clipPath id="clip1_403_2896">
            <rect
              width="1200"
              height="637"
              fill="white"
              transform="translate(0 -7)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
