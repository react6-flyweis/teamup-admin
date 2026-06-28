import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown, { type RefundStatus } from "@/components/common/StatusDropdown";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import ActionModal from "../common/ActionModal";
import RefundViewModal from "./modals/RefundViewModal";

interface RefundRequest {
  id: string;
  userName: string;
  eventBooking: string;
  amountPaid: number;
  refundAmount: number;
  reason: string;
  status: "Approved" | "Pending" | "Rejected";
}

type TimePeriod = "Daily" | "Weekly" | "Monthly";

const initialRefunds: RefundRequest[] = [
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Axe Throwing Lane 3",
    amountPaid: 120,
    refundAmount: 120,
    reason: "Lane Malfunction",
    status: "Approved",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amountPaid: 1000,
    refundAmount: 250,
    reason: "Partial Cancellation",
    status: "Pending",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amountPaid: 450,
    refundAmount: 450,
    reason: "Event Cancelled",
    status: "Approved",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Corporate Event",
    amountPaid: 1500,
    refundAmount: 1500,
    reason: "Pricing Adjustment",
    status: "Pending",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Axe Throwing Lane 2",
    amountPaid: 120,
    refundAmount: 120,
    reason: "No Show By Host",
    status: "Rejected",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amountPaid: 1000,
    refundAmount: 1000,
    reason: "Lane Malfunction",
    status: "Pending",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amountPaid: 1000,
    refundAmount: 1000,
    reason: "Lane Malfunction",
    status: "Pending",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amountPaid: 1000,
    refundAmount: 1000,
    reason: "Lane Malfunction",
    status: "Pending",
  },
  {
    id: "PMT#4856",
    userName: "John Smith",
    eventBooking: "Birthday Party",
    amountPaid: 1000,
    refundAmount: 1000,
    reason: "Lane Malfunction",
    status: "Pending",
  },
];

const ROWS_PER_PAGE = 9;

const columns = [
  { key: "id", label: "Request ID" },
  { key: "userName", label: "User Name" },
  { key: "eventBooking", label: "Event/Booking" },
  { key: "amountPaid", label: "Amount Paid" },
  { key: "refundAmount", label: "Refund Amount" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

const timePeriods: TimePeriod[] = ["Daily", "Weekly", "Monthly"];
const refundStatusOptions: RefundStatus[] = ["All", "Approved", "Pending", "Rejected"];

export default function RefundAdjustmentTable() {
  const [refunds] = useState<RefundRequest[]>(initialRefunds);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<RefundStatus>("All");
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Daily");
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleStatusChange = (newStatus: RefundStatus) => {
    setSelectedStatus(newStatus);
    setPage(1);
  };

  const handleApproveRequest = () => {
    // Add your approval logic here
    console.log('Approve refund from modal:', selectedRefund?.id);
    setShowViewModal(false);
    setShowActionModal(null);
  };

  // Filter refunds based on selected status
  const filteredRefunds =
    selectedStatus === "All"
      ? refunds
      : refunds.filter((refund) => refund.status === selectedStatus);

  const pageData = filteredRefunds.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredRefunds.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Refund & Adjustment
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
            options={refundStatusOptions}
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
            {pageData.map((refund, idx) => (
              <tr
                key={`${refund.id}-${idx}`}
                className={`${idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                  } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {refund.id}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {refund.userName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {refund.eventBooking}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${refund.amountPaid}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${refund.refundAmount}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {refund.reason}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${refund.status === "Approved"
                      ? "bg-[#14AE5C]"
                      : refund.status === "Pending"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                      } text-white`}
                  >
                    {refund.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">


                  <button
                    onClick={() => setShowActionModal(idx)}
                    className="text-gray-600 hover:text-[#E1017D] cursor-pointer"
                  >
                    <HorizontalDotsIcon />
                  </button>
                  {showActionModal === idx && (
                    <ActionModal
                      onClose={() => setShowActionModal(null)}
                      onView={() => {
                        setSelectedRefund(refund);
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

      {/* View Modal */}
      {showViewModal && (
        <RefundViewModal
          request={selectedRefund || undefined}
          onClose={() => setShowViewModal(false)}
          onApprove={handleApproveRequest}
        />
      )}
    </section>
  );
}