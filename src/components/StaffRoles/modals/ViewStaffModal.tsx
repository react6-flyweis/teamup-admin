import CloseIcon from "@/assets/icons/CloseIcon";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  assignedZone: string;
  shiftTiming: string;
  status: "Active" | "On Leave" | "Inactive";
}

interface ViewStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffMember;
}

export default function ViewStaffModal({ isOpen, onClose, staff }: ViewStaffModalProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#22C55E] text-white";
      case "On Leave":
        return "bg-[#F59E0B] text-white";
      case "Inactive":
        return "bg-[#EF4444] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[500px]">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-4">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              {staff.name} ({staff.role})
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center bg-white rounded-full cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Staff Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Name:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">{staff.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Role:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">{staff.role}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Assigned Zone:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">{staff.assignedZone}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Shift Timing:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">{staff.shiftTiming}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Status:</span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-roboto font-medium ${getStatusColor(
                  staff.status
                )}`}
              >
                {staff.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-[#7E0B0B] rounded-[10px] text-[#7E0B0B] font-poppins font-semibold text-base bg-transparent hover:bg-[#E1017D]/10 transition-colors"
            >
              Blacklist
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base hover:bg-[#c9016f] transition-colors"
            >
              Warn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}