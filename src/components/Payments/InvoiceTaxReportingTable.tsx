import { useState } from "react";
import Pagination from "@/utils/Pagination";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import InvoiceActionModal from "./modals/InvoiceActionModal";
import InvoiceEditModal from "./modals/InvoiceEditModal";

interface InvoiceRecord {
  id: string;
  customerName: string;
  amountBeforeTax: number;
  taxCollected: string;
  totalAmount: number;
  status: "Paid" | "Pending";
}

type TimePeriod = "Daily" | "Weekly" | "Monthly";

const initialInvoices: InvoiceRecord[] = [
  {
    id: "INV-2025-0012",
    customerName: "John Smith",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
  {
    id: "INV-2025-0012",
    customerName: "John Smith",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Pending",
  },
  {
    id: "INV-2025-0012",
    customerName: "John Smith",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Pending",
  },
  {
    id: "INV-2025-0012",
    customerName: "John Smith",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
  {
    id: "INV-2025-0012",
    customerName: "Corporate Event: XYZ Corp",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
  {
    id: "INV-2025-0012",
    customerName: "Corporate Event: XYZ Corp",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
  {
    id: "INV-2025-0012",
    customerName: "Corporate Event: XYZ Corp",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
  {
    id: "INV-2025-0012",
    customerName: "Corporate Event: XYZ Corp",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
  {
    id: "INV-2025-0012",
    customerName: "Corporate Event: XYZ Corp",
    amountBeforeTax: 180,
    taxCollected: "$18 (10%)",
    totalAmount: 198,
    status: "Paid",
  },
];

const ROWS_PER_PAGE = 9;

const columns = [
  { key: "id", label: "Invoice" },
  { key: "customerName", label: "Customer Name" },
  { key: "amountBeforeTax", label: "Amount (Before Tax)" },
  { key: "taxCollected", label: "Tax Collected" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

const timePeriods: TimePeriod[] = ["Daily", "Weekly", "Monthly"];

export default function InvoiceTaxReportingTable() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialInvoices);
  const [page, setPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Monthly");
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditInvoice = (updatedInvoice: InvoiceRecord) => {
    setInvoices(invoices.map(inv =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ));
  };

  const handleDeactivateInvoice = () => {
    if (selectedInvoice) {
      console.log('Deactivate invoice:', selectedInvoice.id);
      setShowActionModal(null);
    }
  };

  // Filter invoices (no status filter for this component based on the image)
  const filteredInvoices = invoices;

  const pageData = filteredInvoices.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredInvoices.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Invoice & Tax Reporting
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
            {pageData.map((invoice, idx) => (
              <tr
                key={`${invoice.id}-${idx}`}
                className={`${idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                  } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {invoice.id}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {invoice.customerName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${invoice.amountBeforeTax}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {invoice.taxCollected}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${invoice.totalAmount}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${invoice.status === "Paid"
                      ? "bg-[#14AE5C]"
                      : "bg-[#E8B931]"
                      } text-white`}
                  >
                    {invoice.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">
                  <button
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setShowActionModal(idx);
                    }}
                    className="text-gray-600 hover:text-[#E1017D] cursor-pointer"
                  >
                    <HorizontalDotsIcon />
                  </button>
                  {showActionModal === idx && (
                    <InvoiceActionModal
                      onClose={() => setShowActionModal(null)}
                      onEdit={() => {
                        setShowEditModal(true);
                        setShowActionModal(null);
                      }}
                      onDeactivate={handleDeactivateInvoice}
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

      {/* Edit Modal */}
      {showEditModal && (
        <InvoiceEditModal
          invoice={selectedInvoice || undefined}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditInvoice}
        />
      )}
    </section>
  );
}