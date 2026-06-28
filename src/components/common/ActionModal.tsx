import React from "react";

import EyeOutlineIcon from "@/assets/icons/EyeOutlineIcon";
import CheckIcon from "@/assets/icons/CheckIcon";

interface ActionModalProps {
  onClose: () => void;
  onView: () => void;
  onApprove: () => void;
  style?: React.CSSProperties;
}

const ActionModal: React.FC<ActionModalProps> = ({
//   onClose,
  onView,
  onApprove,
  style,
}) => (
  <div
    className="absolute right-0 mt-2 w-[203px] bg-[#F9F9F9]  rounded-[12px_4px_12px_12px] shadow-lg z-[60]"
    style={style}
  >
    <button
      onClick={onView}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100 border-b border-[#898989]"
    >
      <EyeOutlineIcon />
      <span className="font-manrope font-bold text-base text-[#333333]">
        View
      </span>
    </button>
    <button
      onClick={onApprove}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100"
    >
      <CheckIcon />
      <span className="font-manrope font-bold text-base text-[#333333]">
        Approve Request
      </span>
    </button>
  </div>
);

export default ActionModal;
