import React from "react";
import EditIcon from "@/assets/icons/EditIcon";
import PowerIcon from "@/assets/icons/PowerIcon";

interface InvoiceActionModalProps {
  onClose: () => void;
  onEdit: () => void;
  onDeactivate: () => void;
  style?: React.CSSProperties;
}

const InvoiceActionModal: React.FC<InvoiceActionModalProps> = ({
  onEdit,
  onDeactivate,
  style,
}) => (
  <div
    className="absolute right-0 mt-2 w-[203px] bg-[#F9F9F9] rounded-[12px_4px_12px_12px] shadow-lg z-[60]"
    style={style}
  >
    <button
      onClick={onEdit}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100 border-b border-[#898989]"
    >
      <EditIcon />
      <span className="font-manrope font-bold text-base text-[#333333]">
        Edit
      </span>
    </button>
    <button
      onClick={onDeactivate}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100"
    >
      <PowerIcon />
      <span className="font-manrope font-bold text-base text-[#333333]">
        Deactivate
      </span>
    </button>
  </div>
);

export default InvoiceActionModal;