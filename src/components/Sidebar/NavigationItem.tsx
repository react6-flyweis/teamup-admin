import React from 'react';
import { Link } from 'react-router-dom';
import type { IconProps } from '@/types';

interface NavigationItemProps {
  path: string;
  label: string;
  icon: React.ComponentType<IconProps & { isActive?: boolean }>;
  isActive: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  path, 
  label, 
  icon: Icon, 
  isActive
}) => {
  const itemClasses = isActive 
    ? "flex flex-col items-start p-4 gap-2.5 w-60 h-14 bg-[#A3EBFF] rounded-xl transition-all duration-200"
    : "flex flex-col items-start p-4 gap-2.5 w-60 h-14 rounded-xl hover:bg-[rgba(163,235,255,0.1)] transition-all duration-200 smooth-transition";

  const textColor = isActive ? "text-black" : "text-white";

  return (
    <Link to={path} className={itemClasses}>
      <div className="flex items-center gap-3 w-52 h-6">
        <Icon 
          size={24} 
          className="flex-shrink-0"
          isActive={isActive}
        />
        <span className={`font-bold text-base leading-6 ${textColor}`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default NavigationItem;
