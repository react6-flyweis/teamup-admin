import * as React from "react";
import type { IconProps } from "../../types";

const ShareIcon: React.FC<IconProps> = ({
  size = 25,
  color = "black",
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M14.8001 9.50026V7.91026C14.8001 7.02026 15.8801 6.57026 16.5101 7.20026L21.1001 11.7903C21.1928 11.8828 21.2664 11.9927 21.3166 12.1136C21.3667 12.2346 21.3926 12.3643 21.3926 12.4953C21.3926 12.6262 21.3667 12.7559 21.3166 12.8769C21.2664 12.9979 21.1928 13.1077 21.1001 13.2003L16.5101 17.7903C15.8801 18.4203 14.8001 17.9803 14.8001 17.0903V15.4003C9.80013 15.4003 6.30013 17.0003 3.80013 20.5003C4.80013 15.5003 7.80013 10.5003 14.8001 9.50026Z"
      fill={color}
    />
  </svg>
);

export default ShareIcon;
