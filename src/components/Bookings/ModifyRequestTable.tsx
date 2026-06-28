import { useState } from "react";
import Pagination from "@/utils/Pagination";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import StatusDropdown, { type BookingStatus } from "../common/StatusDropdown";
import ViewModal from './modals/ViewModal';
import ActionModal from '../common/ActionModal';

interface ModifyRequest {
  id: string;
  userName: string;
  bookingDate: string;
  timeSlot: string;
  status: BookingStatus;
  userRequest: string;
  action: string;
}

const initialRequests: ModifyRequest[] = [
  {
    id: "#ID2001",
    userName: "Alice Thompson",
    bookingDate: "10/05/2025",
    timeSlot: "6 PM, Monday",
    status: "Confirm",
    userRequest: "Change Date",
    action: "Reschedule",
  },
  {
    id: "#ID2002",
    userName: "Brian Carter",
    bookingDate: "11/05/2025",
    timeSlot: "8 PM, Tuesday",
    status: "Pending",
    userRequest: "Add People",
    action: "Review",
  },
  {
    id: "#ID2003",
    userName: "Mary Robinson",
    bookingDate: "12/05/2025",
    timeSlot: "5 PM, Wednesday",
    status: "Cancelled",
    userRequest: "Cancel Booking",
    action: "Archive",
  },
  {
    id: "#ID2004",
    userName: "Daniel Scott",
    bookingDate: "13/05/2025",
    timeSlot: "7 PM, Thursday",
    status: "Confirm",
    userRequest: "Change Time Slot",
    action: "Change",
  },
  {
    id: "#ID2005",
    userName: "Emily Davis",
    bookingDate: "14/05/2025",
    timeSlot: "3 PM, Friday",
    status: "Pending",
    userRequest: "Add Special Requests",
    action: "Review",
  },
  {
    id: "#ID2006",
    userName: "George King",
    bookingDate: "15/05/2025",
    timeSlot: "1 PM, Saturday",
    status: "Cancelled",
    userRequest: "Cancel Booking",
    action: "Archive",
  },
  {
    id: "#ID2007",
    userName: "Helen Smith",
    bookingDate: "16/05/2025",
    timeSlot: "4 PM, Sunday",
    status: "Confirm",
    userRequest: "Change Date",
    action: "Reschedule",
  },
  {
    id: "#ID2008",
    userName: "Ian Wright",
    bookingDate: "17/05/2025",
    timeSlot: "9 PM, Monday",
    status: "Pending",
    userRequest: "Add People",
    action: "Review",
  },
  {
    id: "#ID2009",
    userName: "Jane Walker",
    bookingDate: "18/05/2025",
    timeSlot: "10 AM, Tuesday",
    status: "Cancelled",
    userRequest: "Cancel Booking",
    action: "Archive",
  },
  {
    id: "#ID2010",
    userName: "Kevin Harris",
    bookingDate: "19/05/2025",
    timeSlot: "2 PM, Wednesday",
    status: "Confirm",
    userRequest: "Change Time Slot",
    action: "Change",
  },
  {
    id: "#ID2011",
    userName: "Laura Martin",
    bookingDate: "20/05/2025",
    timeSlot: "5 PM, Thursday",
    status: "Pending",
    userRequest: "Add Special Requests",
    action: "Review",
  },
  {
    id: "#ID2012",
    userName: "Michael Lewis",
    bookingDate: "21/05/2025",
    timeSlot: "12 PM, Friday",
    status: "Cancelled",
    userRequest: "Cancel Booking",
    action: "Archive",
  },
  {
    id: "#ID2013",
    userName: "Nina Clark",
    bookingDate: "22/05/2025",
    timeSlot: "7 AM, Saturday",
    status: "Confirm",
    userRequest: "Change Date",
    action: "Reschedule",
  },
  {
    id: "#ID2014",
    userName: "Oliver Lee",
    bookingDate: "23/05/2025",
    timeSlot: "11 AM, Sunday",
    status: "Pending",
    userRequest: "Add People",
    action: "Review",
  },
  {
    id: "#ID2015",
    userName: "Paula Moore",
    bookingDate: "24/05/2025",
    timeSlot: "6 PM, Monday",
    status: "Cancelled",
    userRequest: "Cancel Booking",
    action: "Archive",
  },
  {
    id: "#ID2016",
    userName: "Quentin Evans",
    bookingDate: "25/05/2025",
    timeSlot: "8 PM, Tuesday",
    status: "Confirm",
    userRequest: "Change Time Slot",
    action: "Change",
  },
  {
    id: "#ID2017",
    userName: "Rachel Carter",
    bookingDate: "26/05/2025",
    timeSlot: "3 PM, Wednesday",
    status: "Pending",
    userRequest: "Add Special Requests",
    action: "Review",
  },
  {
    id: "#ID2018",
    userName: "Steven Young",
    bookingDate: "27/05/2025",
    timeSlot: "2 PM, Thursday",
    status: "Cancelled",
    userRequest: "Cancel Booking",
    action: "Archive",
  },
  {
    id: "#ID2019",
    userName: "Tina Baker",
    bookingDate: "28/05/2025",
    timeSlot: "9 AM, Friday",
    status: "Confirm",
    userRequest: "Change Date",
    action: "Reschedule",
  },
  {
    id: "#ID2020",
    userName: "Victor Wright",
    bookingDate: "29/05/2025",
    timeSlot: "5 PM, Saturday",
    status: "Pending",
    userRequest: "Add People",
    action: "Review",
  },
];

// Moved modals to separate files in the modals folder

const ROWS_PER_PAGE = 10;

const columns = [
  { key: "id", label: "Booking ID" },
  { key: "userName", label: "User Name" },
  { key: "bookingDate", label: "Booking Date" },
  { key: "timeSlot", label: "Time Slot" },
  { key: "status", label: "Status" },
  { key: "userRequest", label: "User Request" },
  { key: "action", label: "Action" },
];

export default function ModifyRequestTable() {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("All");
  const allRequests = initialRequests; // TODO: Replace with API call when available
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<ModifyRequest | null>(
    null
  );
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleStatusChange = (newStatus: BookingStatus) => {
    setSelectedStatus(newStatus);
    setPage(1); // Reset to first page when changing filter
  };

  // Filter requests based on selected status
  const requests =
    selectedStatus === "All"
      ? allRequests
      : allRequests.filter((request) => request.status === selectedStatus);

  const pageData = requests.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(requests.length / ROWS_PER_PAGE);

  const handleApproveRequest = () => {
    // Add your approval logic here
    setShowViewModal(false);
    setShowActionModal(null);
  };

  return (
    <section className="w-full mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Modify Request (On User Request)
        </h2>
        <StatusDropdown
          currentStatus={selectedStatus}
          onChange={handleStatusChange}
        />
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
            {pageData.map((request, idx) => (
              <tr
                key={`${request.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {request.id}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {request.userName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {request.bookingDate}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {request.timeSlot}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${
                      request.status === "Confirm"
                        ? "bg-[#14AE5C]"
                        : request.status === "Pending"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                    } text-white`}
                  >
                    {request.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {request.userRequest}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">
                  <button
                    onClick={() => setShowActionModal(idx)}
                    className="text-gray-600 hover:text-[#E1017D]"
                  >
                    <HorizontalDotsIcon />
                  </button>
                  {showActionModal === idx && (
                    <ActionModal
                      onClose={() => setShowActionModal(null)}
                      onView={() => {
                        setSelectedRequest(request);
                        setShowViewModal(true);
                        setShowActionModal(null);
                      }}
                      onApprove={handleApproveRequest}
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

      {showViewModal && (
        <ViewModal
          request={selectedRequest || undefined}
          onClose={() => setShowViewModal(false)}
          onApprove={handleApproveRequest}
        />
      )}
    </section>
  );
}
