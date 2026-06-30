import React from 'react';
import type { ComboItem } from '../../pages/Bites';

interface ComboCardProps {
  combo: ComboItem;
  onEdit: (id: number) => void;
}

const ComboCard: React.FC<ComboCardProps> = ({ combo, onEdit }) => {
  return (
    <div className="bg-[#F9D2EA] rounded-2xl p-6 w-[380px]">
      <div className="flex flex-col gap-2">
        {/* Edit Button */}
        <div className="flex justify-end">
          <button
            onClick={() => combo.id !== undefined && onEdit(combo.id)}
            className="bg-[#003240] text-white px-4 py-1 rounded-lg font-semibold"
          >
            Edit
          </button>
        </div>

        {/* Combo Title */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-black">Combo {combo.id}</h3>
          <p className="text-lg font-bold text-black">here's what's included</p>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-black">Pizza</span>
            <span className="text-base font-semibold text-black text-right">{combo.pizza}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-black">Bevvies</span>
            <span className="text-base font-semibold text-black text-right">{combo.bevvies}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-black">Burger</span>
            <span className="text-base font-semibold text-black text-right">{combo.burger}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-black">Welcome BEVY!</span>
            <span className="text-base font-semibold text-black text-right">{combo.welcomeBevvy}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-black">Shots!!!</span>
            <span className="text-base font-semibold text-black text-right">{combo.shots}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboCard;
