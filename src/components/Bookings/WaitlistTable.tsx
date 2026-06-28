import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown, { type BookingStatus } from "../common/StatusDropdown";
import NotifyIcon from "@/assets/icons/NotifyIcon";

interface WaitlistSlot {
  eventId: string;
  partySize: number;
  waitTime: string;
  contact: string;
  status: BookingStatus;
}

const initialSlots: WaitlistSlot[] = [
  {
    eventId: "#WL1001",
    partySize: 2,
    waitTime: "10 Min",
    contact: "+91 9876543210",
    status: "Confirm",
  },
  {
    eventId: "#WL1002",
    partySize: 4,
    waitTime: "20 Min",
    contact: "+91 9823012345",
    status: "Pending",
  },
  {
    eventId: "#WL1003",
    partySize: 3,
    waitTime: "15 Min",
    contact: "+91 9887766554",
    status: "Cancelled",
  },
  {
    eventId: "#WL1004",
    partySize: 5,
    waitTime: "30 Min",
    contact: "+91 9944332211",
    status: "Confirm",
  },
  {
    eventId: "#WL1005",
    partySize: 6,
    waitTime: "45 Min",
    contact: "+91 9000000001",
    status: "Pending",
  },
  {
    eventId: "#WL1006",
    partySize: 8,
    waitTime: "60 Min",
    contact: "+91 9000000002",
    status: "Cancelled",
  },
  {
    eventId: "#WL1007",
    partySize: 7,
    waitTime: "25 Min",
    contact: "+91 9876501234",
    status: "Confirm",
  },
  {
    eventId: "#WL1008",
    partySize: 10,
    waitTime: "50 Min",
    contact: "+91 9123456789",
    status: "Pending",
  },
  {
    eventId: "#WL1009",
    partySize: 3,
    waitTime: "12 Min",
    contact: "+91 9564738291",
    status: "Cancelled",
  },
  {
    eventId: "#WL1010",
    partySize: 5,
    waitTime: "18 Min",
    contact: "+91 9988776655",
    status: "Confirm",
  },
  {
    eventId: "#WL1011",
    partySize: 9,
    waitTime: "35 Min",
    contact: "+91 9321456789",
    status: "Pending",
  },
  {
    eventId: "#WL1012",
    partySize: 2,
    waitTime: "8 Min",
    contact: "+91 9789654321",
    status: "Cancelled",
  },
  {
    eventId: "#WL1013",
    partySize: 4,
    waitTime: "20 Min",
    contact: "+91 9789123456",
    status: "Confirm",
  },
  {
    eventId: "#WL1014",
    partySize: 8,
    waitTime: "46 Min",
    contact: "+91 9456789112",
    status: "Pending",
  },
  {
    eventId: "#WL1015",
    partySize: 6,
    waitTime: "30 Min",
    contact: "+91 9123450987",
    status: "Cancelled",
  },
  {
    eventId: "#WL1016",
    partySize: 5,
    waitTime: "22 Min",
    contact: "+91 9543216789",
    status: "Confirm",
  },
  {
    eventId: "#WL1017",
    partySize: 7,
    waitTime: "53 Min",
    contact: "+91 9898456123",
    status: "Pending",
  },
  {
    eventId: "#WL1018",
    partySize: 3,
    waitTime: "14 Min",
    contact: "+91 9445123789",
    status: "Cancelled",
  },
  {
    eventId: "#WL1019",
    partySize: 2,
    waitTime: "12 Min",
    contact: "+91 9987998776",
    status: "Confirm",
  },
  {
    eventId: "#WL1020",
    partySize: 5,
    waitTime: "29 Min",
    contact: "+91 9008213456",
    status: "Pending",
  },
];

const ROWS_PER_PAGE = 10;

const columns = [
  { key: "eventId", label: "Event ID" },
  { key: "partySize", label: "Party Size" },
  { key: "waitTime", label: "Wait Time" },
  { key: "contact", label: "Contact" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

export default function WaitlistTable() {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("All");
  const [page, setPage] = useState(1);

  const handleStatusChange = (newStatus: BookingStatus) => {
    setSelectedStatus(newStatus);
    setPage(1); // Reset to first page when changing filter
  };

  const handleNotify = (eventId: string) => {
    // Add notification logic here
    console.log("Notify customer for event:", eventId);
  };

  // Filter slots based on selected status
  const filteredSlots =
    selectedStatus === "All"
      ? initialSlots
      : initialSlots.filter((slot) => slot.status === selectedStatus);

  const pageData = filteredSlots.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredSlots.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Waitlist and Last Minute slot
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
            {pageData.map((slot, idx) => (
              <tr
                key={`${slot.eventId}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.eventId}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.partySize}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.waitTime}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.contact}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${
                      slot.status === "Confirm"
                        ? "bg-[#14AE5C]"
                        : slot.status === "Pending"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                    } text-white`}
                  >
                    {slot.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <button
                    onClick={() => handleNotify(slot.eventId)}
                    className="flex items-center justify-center gap-2 text-black-600 hover:text-[#E1017D] mx-auto"
                  >
                    <NotifyIcon />
                    <span>Notify</span>
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
