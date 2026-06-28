import type { IconProps } from "../../types";

interface StaffIconProps extends IconProps {
  isActive?: boolean;
}

const StaffIcon: React.FC<StaffIconProps> = ({
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
        d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.47997 18.15C3.50997 17.59 2.90997 16.55 2.90997 15.42V8.58003C2.90997 7.46003 3.50997 6.41999 4.47997 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M12 10.9998C13.2868 10.9998 14.33 9.95662 14.33 8.6698C14.33 7.38298 13.2868 6.33984 12 6.33984C10.7132 6.33984 9.66998 7.38298 9.66998 8.6698C9.66998 9.95662 10.7132 10.9998 12 10.9998Z"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M16 16.6584C16 14.8584 14.21 13.3984 12 13.3984C9.79 13.3984 8 14.8584 8 16.6584"
        stroke={colors.main}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StaffIcon;
