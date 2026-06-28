import type { IconProps } from "../../types";

interface SocialReviewsIconProps extends IconProps {
  isActive?: boolean;
}

const SocialReviewsIcon: React.FC<SocialReviewsIconProps> = ({
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
        opacity="0.4"
        d="M19.86 8.09155C19.86 8.51155 19.83 8.92155 19.78 9.31155C19.32 9.11155 18.82 9.00156 18.29 9.00156C17.07 9.00156 15.99 9.59155 15.32 10.4915C14.64 9.59155 13.56 9.00156 12.34 9.00156C10.29 9.00156 8.63 10.6715 8.63 12.7415C8.63 15.4215 10.05 17.4715 11.63 18.8615C11.58 18.8915 11.53 18.9016 11.48 18.9216C11.18 19.0316 10.68 19.0316 10.38 18.9216C7.79 18.0316 2 14.3516 2 8.09155C2 5.33155 4.21999 3.10156 6.95999 3.10156C8.58999 3.10156 10.03 3.88155 10.93 5.09155C11.84 3.88155 13.28 3.10156 14.9 3.10156C17.64 3.10156 19.86 5.33155 19.86 8.09155Z"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12.74C22 17.42 17.67 20.18 15.73 20.84C15.5 20.92 15.13 20.92 14.9 20.84C14.07 20.56 12.8 19.89 11.63 18.86C10.05 17.47 8.63 15.42 8.63 12.74C8.63 10.67 10.29 9 12.34 9C13.56 9 14.64 9.58999 15.32 10.49C15.99 9.58999 17.07 9 18.29 9C18.82 9 19.32 9.11 19.78 9.31C21.09 9.89 22 11.2 22 12.74Z"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SocialReviewsIcon;
