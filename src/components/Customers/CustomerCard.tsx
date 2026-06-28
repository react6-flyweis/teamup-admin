import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CustomerCardProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ user, isSelected, onClick }) => {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-200 ${
        isSelected 
          ? 'bg-[#570B39] text-white shadow-md' 
          : 'border border-[#570B39] text-[#570B39] hover:bg-[#570B39]/10 hover:-translate-y-0.5 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 rounded-full bg-[#C8C8C8]">
        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium font-roboto">{user.name}</h3>
        <p className="text-sm font-roboto">{user.email}</p>
      </div>
    </div>
  );
};
