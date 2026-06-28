import type { IconProps } from '../../types';

interface UserCircleIconProps extends IconProps {
    isActive?: boolean;
}

const UserCircleIcon: React.FC<UserCircleIconProps> = ({
    size = 37,
    isActive = false,
    className,
    ...props
}) => {
    // Inactive: '#888', Active: '#222'
    const fillColor = isActive ? '#222222' : '#888888';

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 37 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <g opacity="0.2">
                <path
                    d="M12.0532 9.75C12.0532 13.4715 15.0817 16.5 18.8032 16.5C22.5247 16.5 25.5532 13.4715 25.5532 9.75C25.5532 6.0285 22.5247 3 18.8032 3C15.0817 3 12.0532 6.0285 12.0532 9.75ZM30.8032 31.5H32.3032V30C32.3032 24.2115 27.5917 19.5 21.8032 19.5H15.8032C10.0132 19.5 5.30322 24.2115 5.30322 30V31.5H30.8032Z"
                    fill={fillColor}
                />
            </g>
        </svg>
    );
};

export default UserCircleIcon;
