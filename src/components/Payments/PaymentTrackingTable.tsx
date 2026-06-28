import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown, { type PaymentStatus } from "@/components/common/StatusDropdown";

interface Payment {
  id: string;
  userName: string;
  eventBooking: string;
  amount: number;
  paymentMethod: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}
type TimePeriod = "Daily" | "Weekly" | "Monthly";

const initialPayments: Payment[] = [
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Axe Throwing Lane 3",
    amount: 120,
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amount: 1000,
    paymentMethod: "Apple Pay",
    status: "Pending",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Corporate Event",
    amount: 450,
    paymentMethod: "Apple Pay",
    status: "Failed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "VIP Lounge",
    amount: 1500,
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Axe Throwing Lane 2",
    amount: 120,
    paymentMethod: "Apple Pay",
    status: "Completed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amount: 1000,
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amount: 1000,
    paymentMethod: "Apple Pay",
    status: "Completed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amount: 1000,
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "24/04/2025",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amount: 1000,
    paymentMethod: "Apple Pay",
    status: "Completed",
    date: "24/04/2025",
  },
];

const ROWS_PER_PAGE = 9;

const columns = [
  { key: "id", label: "Payment ID" },
  { key: "userName", label: "User Name" },
  { key: "eventBooking", label: "Event/Booking" },
  { key: "amount", label: "Amount" },
  { key: "paymentMethod", label: "Payment Method" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
];

const timePeriods: TimePeriod[] = ["Daily", "Weekly", "Monthly"];
const paymentStatusOptions: PaymentStatus[] = ["All", "Completed", "Pending", "Failed"];

export default function PaymentTrackingTable() {
  const [payments] = useState<Payment[]>(initialPayments);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus>("All");
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Daily");

  const handleStatusChange = (newStatus: PaymentStatus) => {
    setSelectedStatus(newStatus);
    setPage(1);
  };

  // Filter payments based on selected status
  const filteredPayments =
    selectedStatus === "All"
      ? payments
      : payments.filter((payment) => payment.status === selectedStatus);

  const pageData = filteredPayments.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredPayments.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          View & Track Payment
        </h2>
        <div className="flex gap-4 items-center">
          {/* Time Period Tabs */}
          <div
            className="flex flex-row p-1 gap-2"
            style={{
              background: "#A3EBFF",
              border: "1px solid #005066",
              borderRadius: 4,
            }}
          >
            {timePeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className="flex items-center justify-center"
                style={{
                  minWidth: 76,
                  borderRadius: 4,
                  padding: "8px 16px",
                  height: 40,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "24px",
                  background:
                    selectedPeriod === period ? "#005066" : "transparent",
                  color: selectedPeriod === period ? "#FFF" : "#333",
                  transition: "background 0.2s",
                }}
              >
                {period}
              </button>
            ))}
          </div>
          <StatusDropdown
            currentStatus={selectedStatus}
            onChange={handleStatusChange}
            options={paymentStatusOptions}
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
            {pageData.map((payment, idx) => (
              <tr
                key={`${payment.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {payment.id}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {payment.userName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {payment.eventBooking}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${payment.amount}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {payment.paymentMethod}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${
                      payment.status === "Completed"
                        ? "bg-[#14AE5C]"
                        : payment.status === "Pending"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                    } text-white`}
                  >
                    {payment.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {payment.date}
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