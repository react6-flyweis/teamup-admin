import type { IconProps } from '../../types';

interface LockIconProps extends IconProps {
    isActive?: boolean;
}

const LockIcon: React.FC<LockIconProps> = ({
    size = 34,
    isActive = false,
    className,
    ...props
}) => {
    // Darker fill when active, lighter when inactive
    const fillColor = isActive ? '#222222' : '#888888';

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M17 3.11108C13.1708 3.11108 10.0555 6.22636 10.0555 10.0555V12.8333H8.66663C7.13469 12.8333 5.88885 14.0791 5.88885 15.6111V28.1111C5.88885 29.643 7.13469 30.8889 8.66663 30.8889H25.3333C26.8652 30.8889 28.1111 29.643 28.1111 28.1111V15.6111C28.1111 14.0791 26.8652 12.8333 25.3333 12.8333H23.9444V10.0555C23.9444 6.22636 20.8291 3.11108 17 3.11108ZM12.8333 10.0555C12.8333 7.75831 14.7027 5.88886 17 5.88886C19.2972 5.88886 21.1666 7.75831 21.1666 10.0555V12.8333H12.8333V10.0555ZM25.3361 28.1111H18.3889V24.9472C19.2152 24.4653 19.7777 23.5791 19.7777 22.5555C19.7777 21.0236 18.5319 19.7778 17 19.7778C15.468 19.7778 14.2222 21.0236 14.2222 22.5555C14.2222 23.5777 14.7847 24.4653 15.6111 24.9472V28.1111H8.66663V15.6111H25.3333L25.3361 28.1111Z"
                fill={fillColor}
            />
        </svg>
    );
};

export default LockIcon;
