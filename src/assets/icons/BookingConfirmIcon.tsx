import type { IconProps } from "../../types";

const BookingConfirmIcon: React.FC<IconProps> = ({
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
      d="M29.3333 25.3333C29.3333 26.3333 29.0533 27.28 28.56 28.08C27.64 29.6267 25.9467 30.6667 24 30.6667C22.6533 30.6667 21.4267 30.1733 20.4933 29.3333C20.08 28.9867 19.72 28.56 19.44 28.08C18.9467 27.28 18.6667 26.3333 18.6667 25.3333C18.6667 22.3867 21.0533 20 24 20C25.6 20 27.0267 20.7066 28 21.8133C28.8267 22.76 29.3333 23.9867 29.3333 25.3333Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.92 25.334L23.24 26.654L26.08 24.0273"
      stroke={color}
      strokeWidth="1.5"
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

export default BookingConfirmIcon;
