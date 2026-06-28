import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown, { type BookingStatus } from "../common/StatusDropdown";

interface Booking {
  id: string;
  userName: string;
  bookingDate: string;
  timeSlot: string;
  status: BookingStatus;
  amount: number;
}

const initialBookings: Booking[] = [
  {
    id: "#ID1541",
    userName: "John Smith",
    bookingDate: "21/04/2025",
    timeSlot: "7 PM, Thursday",
    status: "Confirm",
    amount: 90,
  },
  {
    id: "#ID1542",
    userName: "Emily Johnson",
    bookingDate: "22/04/2025",
    timeSlot: "6 PM, Friday",
    status: "Pending",
    amount: 120,
  },
  {
    id: "#ID1543",
    userName: "David Lee",
    bookingDate: "23/04/2025",
    timeSlot: "5 PM, Saturday",
    status: "Cancelled",
    amount: 80,
  },
  {
    id: "#ID1544",
    userName: "Sarah Brown",
    bookingDate: "24/04/2025",
    timeSlot: "8 PM, Sunday",
    status: "Confirm",
    amount: 110,
  },
  {
    id: "#ID1545",
    userName: "Michael Wilson",
    bookingDate: "25/04/2025",
    timeSlot: "9 AM, Monday",
    status: "Pending",
    amount: 100,
  },
  {
    id: "#ID1546",
    userName: "Linda Davis",
    bookingDate: "26/04/2025",
    timeSlot: "10 AM, Tuesday",
    status: "Cancelled",
    amount: 95,
  },
  {
    id: "#ID1547",
    userName: "Robert Miller",
    bookingDate: "27/04/2025",
    timeSlot: "12 PM, Wednesday",
    status: "Confirm",
    amount: 85,
  },
  {
    id: "#ID1548",
    userName: "Jessica Garcia",
    bookingDate: "28/04/2025",
    timeSlot: "2 PM, Thursday",
    status: "Pending",
    amount: 105,
  },
  {
    id: "#ID1549",
    userName: "William Martinez",
    bookingDate: "29/04/2025",
    timeSlot: "4 PM, Friday",
    status: "Cancelled",
    amount: 115,
  },
  {
    id: "#ID1550",
    userName: "Daniel Hernandez",
    bookingDate: "30/04/2025",
    timeSlot: "5 PM, Saturday",
    status: "Confirm",
    amount: 125,
  },
  {
    id: "#ID1551",
    userName: "Olivia Clark",
    bookingDate: "01/05/2025",
    timeSlot: "6 PM, Sunday",
    status: "Pending",
    amount: 130,
  },
  {
    id: "#ID1552",
    userName: "James Lewis",
    bookingDate: "02/05/2025",
    timeSlot: "11 AM, Monday",
    status: "Cancelled",
    amount: 75,
  },
  {
    id: "#ID1553",
    userName: "Sophia Young",
    bookingDate: "03/05/2025",
    timeSlot: "8 AM, Tuesday",
    status: "Confirm",
    amount: 140,
  },
  {
    id: "#ID1554",
    userName: "Benjamin King",
    bookingDate: "04/05/2025",
    timeSlot: "9 AM, Wednesday",
    status: "Pending",
    amount: 150,
  },
  {
    id: "#ID1555",
    userName: "Isabella Wright",
    bookingDate: "05/05/2025",
    timeSlot: "7 PM, Thursday",
    status: "Cancelled",
    amount: 135,
  },
  {
    id: "#ID1556",
    userName: "Lucas Lopez",
    bookingDate: "06/05/2025",
    timeSlot: "10 AM, Friday",
    status: "Confirm",
    amount: 100,
  },
  {
    id: "#ID1557",
    userName: "Mia Lee",
    bookingDate: "07/05/2025",
    timeSlot: "12 PM, Saturday",
    status: "Pending",
    amount: 80,
  },
  {
    id: "#ID1558",
    userName: "Alexander Gonzalez",
    bookingDate: "08/05/2025",
    timeSlot: "2 PM, Sunday",
    status: "Cancelled",
    amount: 145,
  },
  {
    id: "#ID1559",
    userName: "Charlotte Wilson",
    bookingDate: "09/05/2025",
    timeSlot: "3 PM, Monday",
    status: "Confirm",
    amount: 115,
  },
  {
    id: "#ID1560",
    userName: "Elijah Walker",
    bookingDate: "10/05/2025",
    timeSlot: "5 PM, Tuesday",
    status: "Cancelled",
    amount: 90,
  },
];

const ROWS_PER_PAGE = 10;

const columns = [
  { key: "id", label: "Booking ID" },
  { key: "userName", label: "User Name" },
  { key: "bookingDate", label: "Booking Date" },
  { key: "timeSlot", label: "Time Slot" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount Paid" },
];

export default function UserBookingTable() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [page, setPage] = useState(1);

  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("All");

  const handleStatusChange = (newStatus: BookingStatus) => {
    setSelectedStatus(newStatus);
    setPage(1); // Reset to first page when changing filter
  };
  console.log(setBookings);
  // Filter bookings based on selected status
  const filteredBookings =
    selectedStatus === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedStatus);

  const pageData = filteredBookings.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredBookings.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Users Booking & Status
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
            {pageData.map((booking, idx) => (
              <tr
                key={`${booking.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {booking.id}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {booking.userName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {booking.bookingDate}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {booking.timeSlot}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${
                      booking.status === "Confirm"
                        ? "bg-[#14AE5C]"
                        : booking.status === "Pending"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                    } text-white`}
                  >
                    {booking.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${booking.amount}
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
