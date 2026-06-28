import type { IconProps } from "../../types";

const BookingCancelIcon: React.FC<IconProps> = ({
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
      d="M10.6667 2.66797V6.66797"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3333 2.66797V6.66797"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66666 12.1211H27.3333"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 30.6667C26.9455 30.6667 29.3333 28.2789 29.3333 25.3333C29.3333 22.3878 26.9455 20 24 20C21.0545 20 18.6667 22.3878 18.6667 25.3333C18.6667 28.2789 21.0545 30.6667 24 30.6667Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.4267 26.8133L22.6 24"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.4 24.0273L22.5733 26.854"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 11.3346V21.8146C27.0267 20.7079 25.6 20.0013 24 20.0013C21.0533 20.0013 18.6667 22.388 18.6667 25.3346C18.6667 26.3346 18.9467 27.2813 19.44 28.0813C19.72 28.5613 20.08 28.988 20.4933 29.3346H10.6667C6 29.3346 4 26.668 4 22.668V11.3346C4 7.33464 6 4.66797 10.6667 4.66797H21.3333C26 4.66797 28 7.33464 28 11.3346Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.994 18.2682H16.0059"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0591 18.2682H11.0711"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0591 22.2682H11.0711"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BookingCancelIcon;
