import type { IconProps } from '../../types';

const DotsHorizontalIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#070707',
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
      d="M5.28564 10C4.18564 10 3.28564 10.9 3.28564 12C3.28564 13.1 4.18564 14 5.28564 14C6.38564 14 7.28564 13.1 7.28564 12C7.28564 10.9 6.38564 10 5.28564 10Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M19.2856 10C18.1856 10 17.2856 10.9 17.2856 12C17.2856 13.1 18.1856 14 19.2856 14C20.3856 14 21.2856 13.1 21.2856 12C21.2856 10.9 20.3856 10 19.2856 10Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M12.2856 10C11.1856 10 10.2856 10.9 10.2856 12C10.2856 13.1 11.1856 14 12.2856 14C13.3856 14 14.2856 13.1 14.2856 12C14.2856 10.9 13.3856 10 12.2856 10Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

export default DotsHorizontalIcon;
