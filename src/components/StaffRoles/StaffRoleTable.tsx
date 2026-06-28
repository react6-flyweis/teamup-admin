import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown from "@/components/common/StatusDropdown";
import { StaffActionModal, CreateRoleModal, ViewStaffModal } from "./modals";
import DotsHorizontalIcon from "@/assets/icons/DotsHorizontalIcon";

export type StaffStatus = "All" | "Active" | "On Leave" | "Inactive";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  assignedZone: string;
  shiftTiming: string;
  status: "Active" | "On Leave" | "Inactive";
}

const ROWS_PER_PAGE = 8;

const columns = [
  { key: "staffName", label: "Staff Name" },
  { key: "role", label: "Role" },
  { key: "assignedZone", label: "Assigned Zone" },
  { key: "shiftTiming", label: "Shift Timing" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

const mockStaffData: StaffMember[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Manager",
    assignedZone: "All Zones",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "Active"
  },
  {
    id: "2",
    name: "John Smith",
    role: "Game Host",
    assignedZone: "Axe Throwing",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "On Leave"
  },
  {
    id: "3",
    name: "John Smith",
    role: "Cashier",
    assignedZone: "Entrance Lobby",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "Active"
  },
  {
    id: "4",
    name: "John Smith",
    role: "Bartender",
    assignedZone: "Bar A",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "On Leave"
  },
  {
    id: "5",
    name: "John Smith",
    role: "Game Host",
    assignedZone: "Shuffle Board",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "Active"
  },
  {
    id: "6",
    name: "John Smith",
    role: "Manager",
    assignedZone: "Beer Pong Zone",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "Active"
  },
  {
    id: "7",
    name: "John Smith",
    role: "Bartender",
    assignedZone: "Bar B",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "Inactive"
  },
  {
    id: "8",
    name: "John Smith",
    role: "Cashier",
    assignedZone: "Main Counter",
    shiftTiming: "10:00 AM - 18:00 PM",
    status: "Active"
  }
];

export default function StaffRoleTable() {
  const [staffData, setStaffData] = useState<StaffMember[]>(mockStaffData);
  const [currentStatus, setCurrentStatus] = useState<StaffStatus>("All");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showViewStaffModal, setShowViewStaffModal] = useState(false);
  const [page, setPage] = useState(1);

  const statusOptions: StaffStatus[] = ["All", "Active", "On Leave", "Inactive"];

  const filteredStaff = currentStatus === "All"
    ? staffData
    : staffData.filter(staff => staff.status === currentStatus);

  const pageData = filteredStaff.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredStaff.length / ROWS_PER_PAGE);

 

  const handleViewStaff = () => {
    setShowActionModal(null);
    setShowViewStaffModal(true);
  };

  const handleEditStaff = () => {
    setShowActionModal(null);
    setShowCreateRoleModal(true);
  };

  const handleCreateStaff = () => {
    setSelectedStaff(null); // Clear selection for create mode
    setShowCreateRoleModal(true);
  };

  const handleSaveStaff = (staffMember: StaffMember) => {
    setStaffData(prevData => {
      const existingIndex = prevData.findIndex(staff => staff.id === staffMember.id);
      
      if (existingIndex >= 0) {
        // Update existing staff
        const updatedData = [...prevData];
        updatedData[existingIndex] = staffMember;
        return updatedData;
      } else {
        // Add new staff
        return [...prevData, staffMember];
      }
    });

    // Reset page to 1 if we're adding new staff and current page might not show it
    if (!staffData.find(staff => staff.id === staffMember.id)) {
      setPage(1);
    }
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Create & Assign Staff Role
        </h2>
        <div className="flex items-center gap-4">
          <StatusDropdown
            currentStatus={currentStatus}
            onChange={setCurrentStatus}
            options={statusOptions}
          />
          <button
            onClick={handleCreateStaff}
            className="px-6 py-2 bg-[#E1017D] text-white font-poppins font-semibold rounded-[10px] hover:bg-[#c9016f] transition-colors"
          >
            Create Role
          </button>
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
            {pageData.map((staff, idx) => (
              <tr
                key={`${staff.id}-${idx}`}
                className={`${idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                  } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {staff.name}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {staff.role}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {staff.assignedZone}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {staff.shiftTiming}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${staff.status === "Active"
                      ? "bg-[#14AE5C]"
                      : staff.status === "On Leave"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                      } text-white`}
                  >
                    {staff.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">
                  <button
                    onClick={() => {
                      setSelectedStaff(staff);
                      setShowActionModal(idx);
                    }}
                    className="text-gray-600 hover:text-[#E1017D] cursor-pointer"
                  >
                    <DotsHorizontalIcon />
                  </button>
                  {showActionModal === idx && (
                    <StaffActionModal
                      onClose={() => setShowActionModal(null)}
                      onView={handleViewStaff}
                      onEdit={handleEditStaff}
                      style={{
                        top: idx >= pageData.length - 3 ? 'auto' : undefined,
                        bottom: idx >= pageData.length - 3 ? '100%' : undefined,
                        marginBottom: idx >= pageData.length - 3 ? '8px' : undefined
                      }}
                    />
                  )}
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

      {/* Modals */}
      {showCreateRoleModal && (
        <CreateRoleModal
          isOpen={showCreateRoleModal}
          onClose={() => {
            setShowCreateRoleModal(false);
            setSelectedStaff(null);
          }}
          onSave={handleSaveStaff}
          staff={selectedStaff}
        />
      )}

      {showViewStaffModal && selectedStaff && (
        <ViewStaffModal
          isOpen={showViewStaffModal}
          onClose={() => setShowViewStaffModal(false)}
          staff={selectedStaff}
        />
      )}
    </section>
  );
}