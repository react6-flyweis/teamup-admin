import React from 'react';

const FooterIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="16" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12H21M3 6H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default FooterIcon;
