import type { IconProps } from "../../types";

interface HomeIconProps extends IconProps {
  isActive?: boolean;
}

const HomeIcon: React.FC<HomeIconProps> = ({
  size = 24,
  isActive = false,
  className,
  ...props
}) => {
  // Active (primary and secondary) and inactive colors
  const colors = isActive
    ? {
        fillMain: "#003240", // Example active color, adjust as needed
        fillSecondary: "#006E8C", // Example secondary active, as needed
        fillAccent: "#A3EBFF", // If you want a highlight when active
        fillAccentBg: "#A3EBFF44", // 0.25 opacity for bg
      }
    : {
        fillMain: "#A3EBFF",
        fillSecondary: "#A3EBFF",
        fillAccent: "#A3EBFF",
        fillAccentBg: "#A3EBFF44", // 0.25 opacity for bg
      };

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
      {/* Top window/roof */}
      <path
        d="M18.5 3H17.5C17.2239 3 17 3.22386 17 3.5V6.5C17 6.77614 17.2239 7 17.5 7H18.5C18.7761 7 19 6.77614 19 6.5V3.5C19 3.22386 18.7761 3 18.5 3Z"
        fill={isActive ? colors.fillSecondary : colors.fillMain}
      />
      {/* Building bottom (with reduced opacity when not active) */}
      <path
        d="M4.25 16.312C4.25 15.1938 4.25 14.6358 4.49579 14.1586C4.74046 13.6825 5.1955 13.357 6.10446 12.7082L10.7135 9.41558C11.3335 8.97272 11.6457 8.75018 12 8.75018C12.3543 8.75018 12.6654 8.97161 13.2865 9.41558L17.8955 12.7071C18.8045 13.357 19.2595 13.6814 19.5042 14.1586C19.7489 14.6358 19.75 15.1938 19.75 16.3109V21.7824C19.75 22.8264 19.75 23.3479 19.4256 23.6723C19.1012 23.9966 18.5797 23.9966 17.5357 23.9966H6.46429C5.42025 23.9966 4.89879 23.9966 4.57439 23.6723C4.25 23.3479 4.25 22.8264 4.25 21.7824V16.312Z"
        fill={colors.fillMain}
        fillOpacity={isActive ? 0.7 : 0.25}
      />
      {/* Roof shape */}
      <path
        d="M0.831543 11.6934C0.831543 12.0235 0.831543 12.1898 0.93578 12.2407C1.04002 12.2915 1.17155 12.191 1.43215 11.9863L10.4759 4.95277C11.2081 4.38319 11.5742 4.09902 11.9998 4.09902C12.4254 4.09902 12.7915 4.38443 13.5236 4.95277L22.5674 11.9863C22.828 12.1898 22.9596 12.2915 23.0638 12.2407C23.168 12.1898 23.168 12.0235 23.168 11.6934V11.1859C23.168 10.5903 23.168 10.2924 23.0415 10.0343C22.9149 9.77621 22.6804 9.59255 22.21 9.22773L13.5236 2.47094C12.7915 1.90136 12.4254 1.61719 11.9998 1.61719C11.5742 1.61719 11.2081 1.9026 10.4759 2.47094L1.78953 9.22773C1.31922 9.59255 1.08345 9.77621 0.958116 10.0343C0.832784 10.2924 0.831543 10.5903 0.831543 11.1859V11.6934ZM12.6202 14.9359H11.3793C10.7211 14.9359 10.0898 15.1974 9.62441 15.6629C9.15898 16.1283 8.8975 16.7595 8.8975 17.4178V22.1953C8.8975 22.2983 8.98064 22.3814 9.08363 22.3814H14.9159C14.9653 22.3814 15.0127 22.3618 15.0476 22.3269C15.0825 22.292 15.1021 22.2447 15.1021 22.1953V17.4178C15.1021 16.7595 14.8406 16.1283 14.3752 15.6629C13.9097 15.1974 13.2785 14.9359 12.6202 14.9359Z"
        fill={colors.fillMain}
      />
    </svg>
  );
};

export default HomeIcon;
