import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown from "@/components/common/StatusDropdown";
import EmployeeCheckInModal from "./modals/EmployeeCheckInModal";
import EyeOutlineIcon from "@/assets/icons/EyeOutlineIcon";
import WarningIcon from "@/assets/icons/WarningIcon";
import NotifyIcon from "@/assets/icons/NotifyIcon";

export type CheckInStatus = "All" | "Checked In" | "Absent" | "Late";

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

const ROWS_PER_PAGE = 8;

const columns = [
  { key: "staffName", label: "Staff Name" },
  { key: "role", label: "Role" },
  { key: "scheduleTime", label: "Schedule Time" },
  { key: "checkInTime", label: "Check-In Time" },
  { key: "checkOutTime", label: "Check-Out Time" },
  { key: "status", label: "Status" },
  { key: "late", label: "Late" },
  { key: "action", label: "Action" },
];

const mockShiftData: EmployeeShift[] = [
  {
    id: "1",
    staffName: "John Smith",
    role: "Manager",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: null,
    status: "Checked In",
    isLate: false
  },
  {
    id: "2",
    staffName: "John Smith",
    role: "Game Host",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: null,
    checkOutTime: null,
    status: "Absent",
    isLate: true
  },
  {
    id: "3",
    staffName: "John Smith",
    role: "Cashier",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: "18:30 PM",
    status: "Checked In",
    isLate: false
  },
  {
    id: "4",
    staffName: "John Smith",
    role: "Bartender",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: "18:00 PM",
    status: "Late",
    isLate: false
  },
  {
    id: "5",
    staffName: "John Smith",
    role: "Game Host",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: null,
    status: "Checked In",
    isLate: false
  },
  {
    id: "6",
    staffName: "John Smith",
    role: "Manager",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: null,
    status: "Checked In",
    isLate: false
  },
  {
    id: "7",
    staffName: "John Smith",
    role: "Bartender",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: null,
    status: "Checked In",
    isLate: false
  },
  {
    id: "8",
    staffName: "John Smith",
    role: "Cashier",
    scheduleTime: "10:00 AM - 18:00 PM",
    checkInTime: "10:04 AM",
    checkOutTime: null,
    status: "Late",
    isLate: false
  }
];

export default function EmployeeCheckInTable() {
  const [shiftData] = useState<EmployeeShift[]>(mockShiftData);
  const [currentStatus, setCurrentStatus] = useState<CheckInStatus>("All");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeShift | null>(null);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [page, setPage] = useState(1);

  const statusOptions: CheckInStatus[] = ["All", "Checked In", "Absent", "Late"];

  const filteredShifts = currentStatus === "All" 
    ? shiftData 
    : shiftData.filter(shift => shift.status === currentStatus);

  const pageData = filteredShifts.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredShifts.length / ROWS_PER_PAGE);

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

  const handleViewEmployee = (employee: EmployeeShift) => {
    setSelectedEmployee(employee);
    setShowCheckInModal(true);
  };

  const getActionButton = (employee: EmployeeShift) => {
    switch (employee.status) {
      case "Checked In":
        return (
          <button
            onClick={() => handleViewEmployee(employee)}
            className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-[#E1017D] transition-colors"
          >
            <EyeOutlineIcon />
            <span className="font-montserrat text-sm">View</span>
          </button>
        );
      case "Absent":
        return (
          <button
            onClick={() => handleViewEmployee(employee)}
            className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-[#E1017D] transition-colors"
          >
            <NotifyIcon color="#292D32"/>
            <span className="font-montserrat text-sm">Alert</span>
          </button>
        );
      case "Late":
        return (
          <button
            onClick={() => handleViewEmployee(employee)}
            className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-[#E1017D] transition-colors"
          >
            <WarningIcon />
            <span className="font-montserrat text-sm">Warn</span>
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Employee Check-In & Shift Schedule
        </h2>
        <div className="flex items-center gap-4">
          <StatusDropdown
            currentStatus={currentStatus}
            onChange={setCurrentStatus}
            options={statusOptions}
          />
        </div>
      </div>

      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-black font-montserrat"
                  style={{
                    borderTopLeftRadius: col.key === columns[0].key ? 8 : 0,
                    borderTopRightRadius:
                      col.key === columns[columns.length - 1].key ? 8 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((shift, idx) => (
              <tr
                key={`${shift.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {shift.staffName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {shift.role}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {shift.scheduleTime}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {shift.checkInTime || "-"}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {shift.checkOutTime || "-"}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${getStatusColor(shift.status)}`}
                  >
                    {shift.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {shift.isLate ? "Yes" : "No"}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {getActionButton(shift)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end py-4 px-4 bg-transparent">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Check-In Modal */}
      {showCheckInModal && selectedEmployee && (
        <EmployeeCheckInModal
          isOpen={showCheckInModal}
          onClose={() => {
            setShowCheckInModal(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
        />
      )}
    </section>
  );
}