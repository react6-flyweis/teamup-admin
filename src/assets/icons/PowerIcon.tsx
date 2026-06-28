import type { IconProps } from '../../types';

const PowerIcon: React.FC<IconProps> = ({
  size = 20,
  color = 'black',
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
      d="M12 12V0"
      stroke={color}
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M16 0.703125V2.84412C19.526 4.39112 22 7.90812 22 11.9991C22 17.5131 17.514 21.9991 12 21.9991C6.486 21.9991 2 17.5141 2 12.0001C2 7.90912 4.474 4.39112 8 2.84512V0.703125C3.346 2.35413 0 6.78713 0 12.0001C0 18.6171 5.383 24.0001 12 24.0001C18.617 24.0001 24 18.6171 24 12.0001C24 6.78713 20.654 2.35413 16 0.703125Z"
      fill={color}
    />
  </svg>
);

export default PowerIcon;
