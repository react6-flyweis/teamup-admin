import type { IconProps } from "../../types";

const SpecialDealOfferIcon: React.FC<IconProps> = ({
  size = 32,
  color = "white",
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M7.33334 13.3318V18.6651C7.33334 21.3318 8.66668 22.6651 11.3333 22.6651H13.24C13.7333 22.6651 14.2267 22.8117 14.6533 23.0651L18.5467 25.5051C21.9067 27.6117 24.6667 26.0784 24.6667 22.1184V9.87842C24.6667 5.90508 21.9067 4.38508 18.5467 6.49175L14.6533 8.93175C14.2267 9.18508 13.7333 9.33175 13.24 9.33175H11.3333C8.66668 9.33175 7.33334 10.6651 7.33334 13.3318Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

export default SpecialDealOfferIcon;
