import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@/utils/Pagination";
import EyeOutlineIcon from "@/assets/icons/EyeOutlineIcon";
import StarIcon from "@/assets/icons/StarIcon";

interface EmployeePerformance {
  id: string;
  staffName: string;
  role: string;
  shiftThisWeek: number;
  onTimePercentage: number;
  bookingHandled: number;
  avgShiftRating: number;
}

const initialEmployees: EmployeePerformance[] = [
  {
    id: "1",
    staffName: "John Smith",
    role: "Manager",
    shiftThisWeek: 5,
    onTimePercentage: 100,
    bookingHandled: 34,
    avgShiftRating: 4.5,
  },
  {
    id: "2",
    staffName: "John Smith",
    role: "Game Host",
    shiftThisWeek: 5,
    onTimePercentage: 96,
    bookingHandled: 30,
    avgShiftRating: 4.5,
  },
  {
    id: "3",
    staffName: "John Smith",
    role: "Cashier",
    shiftThisWeek: 7,
    onTimePercentage: 92,
    bookingHandled: 26,
    avgShiftRating: 4.5,
  },
  {
    id: "4",
    staffName: "John Smith",
    role: "Bartender",
    shiftThisWeek: 6,
    onTimePercentage: 88,
    bookingHandled: 22,
    avgShiftRating: 4.5,
  },
  {
    id: "5",
    staffName: "John Smith",
    role: "Game Host",
    shiftThisWeek: 3,
    onTimePercentage: 84,
    bookingHandled: 38,
    avgShiftRating: 4.5,
  },
];

const ROWS_PER_PAGE = 10;

const columns = [
  { key: "staffName", label: "Staff Name" },
  { key: "role", label: "Role" },
  { key: "shiftThisWeek", label: "Shift This Week" },
  { key: "onTimePercentage", label: "On Time %" },
  { key: "bookingHandled", label: "Booking Handled" },
  { key: "avgShiftRating", label: "Avg. Shift Rating" },
  { key: "action", label: "Action" },
];

export default function EmployeePerformanceTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const pageData = initialEmployees.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(initialEmployees.length / ROWS_PER_PAGE);

  const handleViewDetails = (employeeId: string) => {
    navigate(`/staff-roles/${employeeId}`);
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Employee Performance & Productivity
        </h2>
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
            {pageData.map((employee, idx) => (
              <tr
                key={`${employee.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {employee.staffName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {employee.role}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {employee.shiftThisWeek}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {employee.onTimePercentage}%
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {employee.bookingHandled}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div className="flex items-center justify-center gap-2">
                    <StarIcon/>
                    {employee.avgShiftRating}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <button
                    onClick={() => handleViewDetails(employee.id)}
                    className="flex items-center justify-center gap-2 mx-auto text-gray-600 hover:text-[#E1017D]"
                  >
                    <EyeOutlineIcon />
                    <span>View Details</span>
                  </button>
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
    </section>
  );
}
