import type { IconProps } from '../../types';

const StatusBottomIcon: React.FC<IconProps> = ({ size = 40, className, ...props }) => (
  <svg
    width={size}
    height={43}
    viewBox="0 0 40 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g filter="url(#filter0_d_258_4956)">
      <path
        d="M20 6.0625C22.4508 6.0625 24.4375 8.04924 24.4375 10.5C24.4375 12.9508 22.4508 14.9375 20 14.9375C17.5492 14.9375 15.5625 12.9508 15.5625 10.5C15.5625 8.04924 17.5492 6.0625 20 6.0625Z"
        fill="#1FC16B"
        stroke="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_258_4956"
        x={-5.5}
        y={-3}
        width={51}
        height={51}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius={9}
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_258_4956"
        />
        <feOffset dy={12} />
        <feGaussianBlur stdDeviation={12} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.345098 0 0 0 0 0.360784 0 0 0 0 0.372549 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_258_4956"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_258_4956"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default StatusBottomIcon;