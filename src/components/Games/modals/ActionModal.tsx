import React from "react";
import EditPenIcon from "@/assets/icons/EditIcon";
import TrashIcon from "@/assets/icons/TrashIcon";

interface ActionModalProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  style?: React.CSSProperties;
  direction?: "up" | "down"; // <-- for visual tweak if you wish
}

const ActionModal: React.FC<ActionModalProps> = ({
  // onClose,
  onEdit,
  onDelete,
  style,
  direction = "down",
}) => (
  <div
    className={
      "absolute right-5 z-[60] w-[120px] bg-[#F9F9F9] shadow-lg" +
      (direction === "up"
        ? " rounded-[4px_12px_12px_12px]"
        : " rounded-[12px_4px_12px_12px]")
    }
    style={style}
  >
    <button
      onClick={onEdit}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100 border-b border-[#898989]"
    >
      <EditPenIcon />
      <span className="font-manrope font-bold text-base text-[#333333]">
        Edit
      </span>
    </button>
    <button
      onClick={onDelete}
      className="flex items-center w-full gap-2 px-3 py-3 hover:bg-gray-100"
    >
      <TrashIcon />
      <span className="font-manrope font-bold text-base text-[#333333]">
        Delete
      </span>
    </button>
  </div>
);

export default ActionModal;
