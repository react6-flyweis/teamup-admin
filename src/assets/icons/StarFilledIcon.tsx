import type { IconProps } from "../../types";

const StarFilledIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g filter="url(#filter0_d)">
      <path
        d="M11.1819 2.73535C11.6334 2.28381 12.3661 2.28381 12.8176 2.73535L14.468 4.38574C14.4973 4.41487 14.5371 4.43164 14.5784 4.43164H16.9124C17.5508 4.43177 18.0686 4.94939 18.0686 5.58789V7.9209C18.0686 7.96234 18.0852 8.00292 18.1145 8.03223L19.7649 9.68164C20.2164 10.1331 20.2163 10.8658 19.7649 11.3174L18.1145 12.9678C18.0852 12.9971 18.0686 13.0367 18.0686 13.0781V15.4121C18.0685 16.0505 17.5507 16.5682 16.9124 16.5684H14.5784C14.5369 16.5684 14.4973 16.585 14.468 16.6143L12.8176 18.2646C12.3661 18.716 11.6334 18.7161 11.1819 18.2646L9.53247 16.6143C9.50317 16.585 9.46258 16.5684 9.42114 16.5684H7.08813C6.44963 16.5684 5.93201 16.0506 5.93188 15.4121V13.0781C5.93188 13.0368 5.91512 12.997 5.88599 12.9678L4.2356 11.3174C3.78405 10.8658 3.78405 10.1332 4.2356 9.68164L5.88599 8.03223C5.91529 8.00292 5.93188 7.96234 5.93188 7.9209V5.58789C5.93188 4.94931 6.44956 4.43164 7.08813 4.43164H9.42114C9.46258 4.43164 9.50317 4.41505 9.53247 4.38574L11.1819 2.73535Z"
        fill="#FF5C02"
        stroke="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3379 10.8725L11.3765 11.9111L15.0188 8.2725C15.3823 7.90923 15.9707 7.9091 16.3341 8.2725C16.6976 8.63597 16.6976 9.22432 16.3341 9.58778L12.036 13.8859C11.6725 14.2494 11.0842 14.2494 10.7207 13.8859L9.0226 12.1878C8.65913 11.8243 8.65913 11.236 9.0226 10.8725C9.38606 10.509 9.97441 10.509 10.3379 10.8725Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="-1.5"
        y="-1.5"
        width="27"
        height="27"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1.5" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.04 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default StarFilledIcon;
