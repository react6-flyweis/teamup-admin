import CloseIcon from "@/assets/icons/CloseIcon";

interface EmployeeShift {
  id: string;
  staffName: string;
  role: string;
  scheduleTime: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: "Checked In" | "Absent" | "Late";
  isLate: boolean;
}

interface EmployeeCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeShift;
}

export default function EmployeeCheckInModal({ isOpen, onClose, employee }: EmployeeCheckInModalProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Checked In":
        return "bg-[#14AE5C] text-white";
      case "Absent":
        return "bg-[#EC221F] text-white";
      case "Late":
        return "bg-[#E8B931] text-white";
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
              {employee.staffName}
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center bg-white rounded-full cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Employee Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Role:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">{employee.role}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Schedule Time:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">{employee.scheduleTime}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Check-In Time:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">
                {employee.checkInTime || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Check-Out Time:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">
                {employee.checkOutTime || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-roboto text-sm text-[#0C0C0C] font-medium">Late:</span>
              <span className="font-roboto text-sm text-[#0C0C0C]">
                {employee.isLate ? "YES" : "NO"}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-start">
            <span
              className={`px-6 py-2 rounded-full text-sm font-roboto font-medium ${getStatusColor(
                employee.status
              )}`}
            >
              {employee.status}
            </span>
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-6">
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