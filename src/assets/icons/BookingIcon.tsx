import type { IconProps } from "../../types";

interface BookingIconProps extends IconProps {
  isActive?: boolean;
}

const BookingIcon: React.FC<BookingIconProps> = ({
  size = 24,
  isActive = false,
  className,
  ...props
}) => {
  const colors = isActive ? { main: "#003240" } : { main: "#A3EBFF" };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8 2V5"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.34"
        d="M3.5 9.08984H20.5"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 19C22 19.75 21.79 20.46 21.42 21.06C20.73 22.22 19.46 23 18 23C16.99 23 16.07 22.63 15.37 22C15.06 21.74 14.79 21.42 14.58 21.06C14.21 20.46 14 19.75 14 19C14 16.79 15.79 15 18 15C19.2 15 20.27 15.53 21 16.36C21.62 17.07 22 17.99 22 19Z"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4399 18.9995L17.4299 19.9895L19.5599 18.0195"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8.5V16.36C20.27 15.53 19.2 15 18 15C15.79 15 14 16.79 14 19C14 19.75 14.21 20.46 14.58 21.06C14.79 21.42 15.06 21.74 15.37 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.34"
        d="M11.9955 13.6992H12.0045"
        stroke={colors.main}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.34"
        d="M8.29431 13.6992H8.30329"
        stroke={colors.main}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.34"
        d="M8.29443 16.6992H8.30342"
        stroke={colors.main}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookingIcon;
