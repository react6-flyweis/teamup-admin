import React, { useState } from 'react';
import CloseIcon from '@/assets/icons/CloseIcon';
import { FormDropdown } from '@/components/common/FormDropdown';

interface LoyaltyTier {
  id: string;
  tierName: string;
  minPoints: number;
  benefits: string;
  usersInTiers: number;
}

interface LoyaltyEditModalProps {
  tier?: LoyaltyTier;
  onClose: () => void;
  onSave: (tier: LoyaltyTier) => void;
}

const LoyaltyEditModal: React.FC<LoyaltyEditModalProps> = ({ 
  tier, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    tierName: tier?.tierName || 'Bronze',
    minimumPoints: tier?.minPoints.toString() || '0',
    tierBenefits: 'On Foods',
    discountPercentage: '5% (auto applied)',
    vipAccess: true,
    freeDrinks: true
  });

  const handleSave = () => {
    const updatedTier: LoyaltyTier = {
      id: tier?.id || '',
      tierName: formData.tierName,
      minPoints: parseInt(formData.minimumPoints),
      benefits: `${formData.discountPercentage.split('%')[0]}% off on ${formData.tierBenefits.toLowerCase()}`,
      usersInTiers: tier?.usersInTiers || 0,
    };
    
    onSave(updatedTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[600px]">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-4">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              {formData.tierName}
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center bg-white rounded-full cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Tier Name */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Tier Name
              </label>
              <FormDropdown
                options={["Bronze", "Silver", "Gold", "Platinum", "Diamond"]}
                value={formData.tierName}
                onChange={(value) => setFormData({...formData, tierName: value})}
                width="100%"
                placeholder="Select tier"
              />
            </div>

            {/* Minimum Points */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Minimum Points
              </label>
              <input
                type="text"
                value={formData.minimumPoints}
                onChange={(e) => setFormData({...formData, minimumPoints: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="0"
              />
            </div>

            {/* Tier Benefits */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Tier Benefits
              </label>
              <FormDropdown
                options={["On Foods", "On Drinks", "On Games", "On All Items"]}
                value={formData.tierBenefits}
                onChange={(value) => setFormData({...formData, tierBenefits: value})}
                width="100%"
                placeholder="Select benefits"
              />
            </div>

            {/* Discount Percentage */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Discount Percentage
              </label>
              <input
                type="text"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({...formData, discountPercentage: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="5% (auto applied)"
              />
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {/* VIP Access */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                VIP Access
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFormData({...formData, vipAccess: !formData.vipAccess})}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    formData.vipAccess ? 'bg-[#005066]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      formData.vipAccess ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Free Drinks */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Free Drinks
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFormData({...formData, freeDrinks: !formData.freeDrinks})}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    formData.freeDrinks ? 'bg-[#005066]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      formData.freeDrinks ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[#E1017D] rounded-[10px] text-[#E1017D] font-poppins font-semibold text-base bg-transparent hover:bg-[#E1017D]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base hover:bg-[#c9016f] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyEditModal;