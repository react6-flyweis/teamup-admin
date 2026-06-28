import EditPenIcon from "@/assets/icons/EditIcon";
import EyeOutlineIcon from "@/assets/icons/EyeOutlineIcon";
import React from "react";

interface StaffActionModalProps {
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  style?: React.CSSProperties;
}

const StaffActionModal: React.FC<StaffActionModalProps> = ({
  onView,
  onEdit,
  style,
}) => (
  <div
  className="absolute right-0 mt-2 w-[203px] bg-[#F9F9F9] rounded-[12px_4px_12px_12px] shadow-lg z-[60]"
  style={style}
  >
    <button
      onClick={onView}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100 border-b border-[#898989]"
      >
     
        <EyeOutlineIcon/>
      <span className="font-manrope font-bold text-base text-[#333333]">
        View
      </span>
    </button>
    <button
      onClick={onEdit}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100"
    >
      <div className="w-6 h-6">
       <EditPenIcon/>
      </div>
      <span className="font-manrope font-bold text-base text-[#333333]">
        Edit
      </span>
    </button>
  </div>
);

export default StaffActionModal;