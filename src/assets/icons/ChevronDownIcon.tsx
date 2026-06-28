import type { IconProps } from '../../types';

const ChevronDownIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FFF',
  className,
  ...props
}) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.929 15.071L6.272 9.414L7.686 8L12.636 12.95L17.586 8L19 9.414L13.343 15.071C13.1555 15.2585 12.9012 15.3638 12.636 15.3638C12.3708 15.3638 12.1165 15.2585 11.929 15.071Z"
      fill={color}
    />
  </svg>
);

export default ChevronDownIcon;
