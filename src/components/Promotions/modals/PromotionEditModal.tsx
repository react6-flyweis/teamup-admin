import React, { useState } from "react";
import CloseIcon from "@/assets/icons/CloseIcon";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import { FormDropdown } from "@/components/common/FormDropdown";

interface Promotion {
  id: string;
  promotionName: string;
  type: string;
  status: "Active" | "Upcoming" | "Expired";
  dateRange: string;
  targetZone: string;
  discountDetails: string;
}

interface PromotionEditModalProps {
  promotion?: Promotion;
  onClose: () => void;
  onSave: (promotion: Promotion) => void;
  isEdit: boolean;
}

const PromotionEditModal: React.FC<PromotionEditModalProps> = ({
  promotion,
  onClose,
  onSave,
  isEdit,
}) => {
  const [formData, setFormData] = useState({
    promotionName: promotion?.promotionName || "",
    description: "",
    startDate: "",
    endDate: "",
    timeRangeFrom: "",
    timeRangeTo: "",
    promotionType: "",
    targetAudience: "",
    discountType: "",
    minimumSpent: false,
  });

  const handleSave = () => {
    const updatedPromotion: Promotion = {
      id: promotion?.id || "",
      promotionName: formData.promotionName,
      type: formData.promotionType,
      status: promotion?.status || "Active",
      dateRange: `${formData.startDate} - ${formData.endDate}`,
      targetZone: formData.targetAudience.split(",")[0].trim(),
      discountDetails: formData.description,
    };

    onSave(updatedPromotion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[700px]  overflow-y-scroll">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-4">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              {isEdit ? formData.promotionName : "Create New Promotion"}
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
            {/* Promotion Name */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Promotion Name
              </label>
              <input
                type="text"
                value={formData.promotionName}
                onChange={(e) =>
                  setFormData({ ...formData, promotionName: e.target.value })
                }
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-600 bg-white"
                placeholder="Happy Hour"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="25% Off on all items"
              />
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.startDate.split("/").reverse().join("-")}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const formattedDate = `${date
                      .getDate()
                      .toString()
                      .padStart(2, "0")}/${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${date.getFullYear()}`;
                    setFormData({ ...formData, startDate: formattedDate });
                  }}
                  className="px-4 py-3 pr-12 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white w-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.endDate.split("/").reverse().join("-")}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const formattedDate = `${date
                      .getDate()
                      .toString()
                      .padStart(2, "0")}/${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${date.getFullYear()}`;
                    setFormData({ ...formData, endDate: formattedDate });
                  }}
                  className="px-4 py-3 pr-12 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white w-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Time Range From */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Time Range (From)
              </label>
              <input
                type="text"
                value={formData.timeRangeFrom}
                onChange={(e) =>
                  setFormData({ ...formData, timeRangeFrom: e.target.value })
                }
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="5:00 PM"
              />
            </div>

            {/* Time Range To */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Time Range (To)
              </label>
              <input
                type="text"
                value={formData.timeRangeTo}
                onChange={(e) =>
                  setFormData({ ...formData, timeRangeTo: e.target.value })
                }
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="7:00 PM"
              />
            </div>

            {/* Promotion Type */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Promotion Type
              </label>
              <FormDropdown
                options={[
                  "Time Based",
                  "Seasonal",
                  "Menu Combo",
                  "Weekly Event",
                  "Flash Deal",
                ]}
                value={formData.promotionType}
                onChange={(value) =>
                  setFormData({ ...formData, promotionType: value })
                }
                width="100%"
                placeholder="Select promotion type"
              />
            </div>

            {/* Target Audience/Zones */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Target Audience/Zones
              </label>
              <FormDropdown
                options={[
                  "Bar, Kitchen, Axe Throwing",
                  "Bar",
                  "Kitchen",
                  "Axe Throwing",
                  "All Games",
                ]}
                value={formData.targetAudience}
                onChange={(value) =>
                  setFormData({ ...formData, targetAudience: value })
                }
                width="100%"
                placeholder="Select target zones"
              />
            </div>

            {/* Discount Type */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Discount Type
              </label>
              <FormDropdown
                options={["% OFF", "$ OFF", "Fixed Price", "Buy X Get Y"]}
                value={formData.discountType}
                onChange={(value) =>
                  setFormData({ ...formData, discountType: value })
                }
                width="100%"
                placeholder="Select discount type"
              />
            </div>

            {/* Minimum Spent Toggle */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Minimum Spent
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      minimumSpent: !formData.minimumSpent,
                    })
                  }
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    formData.minimumSpent ? "bg-[#005066]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      formData.minimumSpent
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="font-roboto text-sm text-[#0C0C0C]">
                  {formData.minimumSpent ? "Required" : "Not Required"}
                </span>
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

export default PromotionEditModal;
