import type { IconProps } from '../../types';

const WarningIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#292D32',
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12.875 7.75V13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.955 8.58003V15.42C21.955 16.54 21.3549 17.58 20.3849 18.15L14.4449 21.58C13.4749 22.14 12.2749 22.14 11.2949 21.58L5.35492 18.15C4.38492 17.59 3.78491 16.55 3.78491 15.42V8.58003C3.78491 7.46003 4.38492 6.41999 5.35492 5.84999L11.2949 2.42C12.2649 1.86 13.4649 1.86 14.4449 2.42L20.3849 5.84999C21.3549 6.41999 21.955 7.45003 21.955 8.58003Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.875 16.1992V16.2992"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WarningIcon;
