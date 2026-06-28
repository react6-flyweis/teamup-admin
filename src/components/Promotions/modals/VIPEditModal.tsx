import React, { useState } from "react";
import CloseIcon from "@/assets/icons/CloseIcon";
import { FormDropdown } from "@/components/common/FormDropdown";

interface VIPRule {
  id: string;
  ruleName: string;
  triggerCondition: string;
  discountApplied: string;
  scope: string;
  status: "Active" | "Inactive";
}

interface VIPEditModalProps {
  rule?: VIPRule;
  onClose: () => void;
  onSave: (rule: VIPRule) => void;
}

const VIPEditModal: React.FC<VIPEditModalProps> = ({
  rule,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    ruleName: rule?.ruleName || "VIP Booking Deal",
    triggerCondition: rule?.triggerCondition || "User action",
    discountType: "20% Off",
    scope: "Game Zone, Bar",
    stackWithOtherOffer: true,
  });

  const handleSave = () => {
    const updatedRule: VIPRule = {
      id: rule?.id || "",
      ruleName: formData.ruleName,
      triggerCondition: formData.triggerCondition,
      discountApplied: formData.discountType,
      scope: formData.scope.split(",")[0].trim(),
      status: rule?.status || "Active",
    };

    onSave(updatedRule);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[700px]">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-4">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              VIP Booking Deal
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
            {/* Rule Name */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Rule Name
              </label>
              <input
                type="text"
                value={formData.ruleName}
                onChange={(e) =>
                  setFormData({ ...formData, ruleName: e.target.value })
                }
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-600 bg-white"
                placeholder="VIP Booking Deal"
              />
            </div>

            {/* Trigger Condition */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Trigger Condition
              </label>
              <input
                type="text"
                value={formData.triggerCondition}
                onChange={(e) =>
                  setFormData({ ...formData, triggerCondition: e.target.value })
                }
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="User action"
              />
            </div>

            {/* Discount Type */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Discount Type
              </label>
              <FormDropdown
                options={[
                  "20% Off",
                  "10% Off",
                  "15% Off",
                  "25% Off",
                  "30% Off",
                  "$10 Off",
                  "$20 Off",
                  "Free Item",
                ]}
                value={formData.discountType}
                onChange={(value) =>
                  setFormData({ ...formData, discountType: value })
                }
                width="100%"
                placeholder="Select discount type"
              />
            </div>

            {/* Scope */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Scope
              </label>
              <FormDropdown
                options={[
                  "Game Zone, Bar",
                  "Game Zone",
                  "Bar",
                  "Kitchen",
                  "All Zones",
                  "Axe Throwing",
                  "Shuffle Board",
                ]}
                value={formData.scope}
                onChange={(value) => setFormData({ ...formData, scope: value })}
                width="100%"
                placeholder="Select scope"
              />
            </div>
          </div>

          {/* Stack With Other Offer Toggle */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
              Stack With Other Offer
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    stackWithOtherOffer: !formData.stackWithOtherOffer,
                  })
                }
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  formData.stackWithOtherOffer ? "bg-[#005066]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    formData.stackWithOtherOffer
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
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

export default VIPEditModal;
