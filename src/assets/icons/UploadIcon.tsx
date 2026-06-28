import type { IconProps } from "../../types";

const UploadIcon: React.FC<IconProps> = ({
  size = 40,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M36 16.2143H34.6667C34.6667 11.48 31.0853 7.64286 26.6667 7.64286H25.884C24.3013 3.45572 20.476 0.5 16 0.5C10.1093 0.5 5.33333 5.61715 5.33333 11.9286V13.3572C2.388 13.3572 0 15.9157 0 19.0714C0 22.2272 2.388 24.7857 5.33333 24.7857H36C38.2093 24.7857 40 22.8672 40 20.5C40 18.1329 38.2093 16.2143 36 16.2143Z"
        fill="#E1E5E5"
      />
      <path
        d="M17.3333 10.5L30.6666 24.7857H13.3333V21.9286H9.33325L17.3333 10.5Z"
        fill="#C4CCCC"
      />
      <path
        d="M9.33325 21.9286L17.3333 10.5L25.3333 21.9286H21.3333V40.5H13.3333V21.9286H9.33325Z"
        fill="#FDFFFF"
      />
    </svg>
  );
};

export default UploadIcon;
