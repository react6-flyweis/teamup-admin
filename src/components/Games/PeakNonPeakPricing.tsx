/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import PeakNonPeakModal from "./modals/PeakNonPeakModal";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import ActionModal from "./modals/ActionModal"; // Import your ActionModal here

const initialData = [
  { id: "1", days: "Monday - Thursday", startTime: "12 PM", endTime: "6 PM", price: "$75", peak: false },
  { id: "2", days: "Friday", startTime: "6 PM", endTime: "11 PM", price: "$90", peak: true },
  { id: "3", days: "Saturday", startTime: "7 PM", endTime: "11 PM", price: "$100", peak: true },
  { id: "4", days: "Sunday", startTime: "3 PM", endTime: "7 PM", price: "$100", peak: true },
  { id: "5", days: "Sunday", startTime: "7 PM", endTime: "11 PM", price: "$110", peak: true },
  { id: "6", days: "Monday", startTime: "10 AM", endTime: "1 PM", price: "$60", peak: false },
  { id: "7", days: "Tuesday", startTime: "2 PM", endTime: "5 PM", price: "$70", peak: false },
  { id: "8", days: "Wednesday", startTime: "4 PM", endTime: "8 PM", price: "$80", peak: false },
  { id: "9", days: "Thursday", startTime: "7 PM", endTime: "10 PM", price: "$85", peak: true },
  { id: "10", days: "Friday", startTime: "10 AM", endTime: "2 PM", price: "$65", peak: false },

];

const columns = [
  { key: "days", label: "Days", className: "w-[23%]" },
  { key: "startTime", label: "Start Time", className: "w-[14%]" },
  { key: "endTime", label: "End Time", className: "w-[14%]" },
  { key: "price", label: "Price ($)", className: "w-[14%]" },
  { key: "peak", label: "Peak/Non Peak", className: "w-[17%]" },
  { key: "action", label: "Action", className: "w-[18%] text-center" },
];

export default function PeakNonPeakPricing() {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [actionModalIdx, setActionModalIdx] = useState<number | null>(null);

  const openModal = (row?: any) => {
    setEditRow(row ?? null);
    setShowModal(true);
  };

  const handleSave = (row: any) => {
    if (row.id) {
      setData(data.map((d) => (d.id === row.id ? row : d)));
    } else {
      setData([...data, { ...row, id: (data.length + 1).toString() }]);
    }
    setShowModal(false);
    setEditRow(null);
  };

  const handleDelete = (rowId: string) => {
    setData(data.filter((d) => d.id !== rowId));
    setActionModalIdx(null);
  };

  function closeActionModal() {
    setActionModalIdx(null);
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          Customize Peak/Non Peak Pricing
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-[#E1017D] hover:bg-[#c5016b] text-white px-6 py-2 rounded-lg font-montserrat font-medium text-[14px]"
        >
          Add Peak Hour
        </button>
      </div>
      <div className="rounded-xl overflow-hidden shadow-lg bg-transparent">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#FFD0F8]">
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`py-4 px-2 font-bold text-[15px] text-black ${
                    col.className || ""
                  }`}
                  style={{
                    borderTopLeftRadius: i === 0 ? 12 : 0,
                    borderTopRightRadius: i === columns.length - 1 ? 12 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const isLastRows = idx >= data.length - 2;

              return (
                <tr
                  key={row.id}
                  className={`
                  group ${idx % 2 === 0 ? "bg-[#FFF0F8]" : "bg-[#FFFBFD]"}
                  hover:bg-[#f3e2f6] hover:shadow-sm   transition-colors duration-200 ease-in-out cursor-pointer
                  relative
                `}
                >
                  <td className="py-4 px-2 ">{row.days}</td>
                  <td className="py-4 px-2">{row.startTime}</td>
                  <td className="py-4 px-2">{row.endTime}</td>
                  <td className="py-4 px-2">{row.price}</td>
                  <td className="py-4 px-2">
                    {row.peak ? "Peak" : "Non Peak"}
                  </td>
                  <td className="py-4 px-2 text-center relative">
                    <button
                      className="inline-flex items-center justify-center relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionModalIdx(idx === actionModalIdx ? null : idx);
                      }}
                      aria-label="More actions"
                    >
                      <HorizontalDotsIcon />
                    </button>
                    {actionModalIdx === idx && (
                      <>
                        {/* Backdrop closes modal on outside click */}
                        <div
                          className="fixed inset-0 z-50"
                          onClick={closeActionModal}
                          tabIndex={-1}
                          aria-hidden
                        />
                        <ActionModal
                          onClose={closeActionModal}
                          onEdit={() => openModal(row)}
                          onDelete={() => handleDelete(row.id)}
                          style={
                            isLastRows
                              ? {
                                  bottom: "100%",
                                  top: "auto",
                                  marginBottom: "8px",
                                }
                              : {
                                  top: "100%",
                                  bottom: "auto",
                                  marginTop: "8px",
                                }
                          }
                          direction={isLastRows ? "up" : "down"}
                        />
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PeakNonPeakModal
          value={editRow}
          onClose={() => {
            setShowModal(false);
            setEditRow(null);
          }}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
