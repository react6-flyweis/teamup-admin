/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PeakNonPeakModal from "./modals/PeakNonPeakModal";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import ActionModal from "./modals/ActionModal";
import {
  useGamePricingQuery,
  useCreateGamePricingMutation,
  useUpdateGamePricingMutation,
  useDeleteGamePricingMutation,
} from "@/hooks/useGamePricing";

const columns = [
  { key: "game", label: "Game", className: "w-[15%]" },
  { key: "location", label: "Location", className: "w-[15%]" },
  { key: "days", label: "Days", className: "w-[18%]" },
  { key: "startTime", label: "Start Time", className: "w-[11%]" },
  { key: "endTime", label: "End Time", className: "w-[11%]" },
  { key: "price", label: "Price ($)", className: "w-[10%]" },
  { key: "peak", label: "Peak/Non Peak", className: "w-[12%]" },
  { key: "action", label: "Action", className: "w-[8%] text-center" },
];

function formatDays(daysOfWeek: string[]) {
  if (!daysOfWeek || daysOfWeek.length === 0) return "-";
  
  const formatted = daysOfWeek.map(d => d.charAt(0).toUpperCase() + d.slice(1));
  
  if (
    daysOfWeek.length === 4 &&
    daysOfWeek.includes("monday") &&
    daysOfWeek.includes("tuesday") &&
    daysOfWeek.includes("wednesday") &&
    daysOfWeek.includes("thursday")
  ) {
    return "Monday - Thursday";
  }
  if (
    daysOfWeek.length === 5 &&
    daysOfWeek.includes("monday") &&
    daysOfWeek.includes("tuesday") &&
    daysOfWeek.includes("wednesday") &&
    daysOfWeek.includes("thursday") &&
    daysOfWeek.includes("friday")
  ) {
    return "Monday - Friday";
  }
  if (
    daysOfWeek.length === 2 &&
    daysOfWeek.includes("saturday") &&
    daysOfWeek.includes("sunday")
  ) {
    return "Saturday - Sunday";
  }
  
  return formatted.join(", ");
}

function formatTime(timeStr: string) {
  if (!timeStr) return "-";
  const [hourStr, minStr] = timeStr.split(":");
  const hour = parseInt(hourStr);
  if (isNaN(hour)) return timeStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minStr || "00"} ${ampm}`;
}

export default function PeakNonPeakPricing() {
  const { data: pricingData, isLoading, error } = useGamePricingQuery();
  const createMutation = useCreateGamePricingMutation();
  const updateMutation = useUpdateGamePricingMutation();
  const deleteMutation = useDeleteGamePricingMutation();

  const data = pricingData?.pricing || [];

  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [actionModalIdx, setActionModalIdx] = useState<number | null>(null);

  const openModal = (row?: any) => {
    setEditRow(row ?? null);
    setShowModal(true);
  };

  const handleSave = (row: any) => {
    if (row._id) {
      updateMutation.mutate(
        { id: row._id, payload: row },
        {
          onSuccess: () => {
            setShowModal(false);
            setEditRow(null);
          },
        }
      );
    } else {
      createMutation.mutate(row, {
        onSuccess: () => {
          setShowModal(false);
          setEditRow(null);
        },
      });
    }
  };

  const handleDelete = (rowId: string) => {
    deleteMutation.mutate(rowId, {
      onSuccess: () => {
        setActionModalIdx(null);
      },
    });
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
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-gray-500 font-montserrat bg-[#FFFBFD]">
                  <div className="flex justify-center items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#E1017D]"></div>
                    Loading pricing rules...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-red-500 font-montserrat bg-[#FFFBFD]">
                  Failed to load pricing. Please try again later.
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-gray-400 font-montserrat bg-[#FFFBFD]">
                  No pricing rules found.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const isLastRows = idx >= data.length - 2;

                return (
                  <tr
                    key={row._id}
                    className={`
                    group ${idx % 2 === 0 ? "bg-[#FFF0F8]" : "bg-[#FFFBFD]"}
                    hover:bg-[#f3e2f6] hover:shadow-sm   transition-colors duration-200 ease-in-out cursor-pointer
                    relative
                  `}
                  >
                    <td className="py-4 px-2 font-medium">{row.game?.name || "-"}</td>
                    <td className="py-4 px-2">{row.location ? `${row.location.name} (${row.location.state})` : "-"}</td>
                    <td className="py-4 px-2 ">{formatDays(row.daysOfWeek)}</td>
                    <td className="py-4 px-2">{formatTime(row.startTime)}</td>
                    <td className="py-4 px-2">{formatTime(row.endTime)}</td>
                    <td className="py-4 px-2">${row.price} ({row.pricingType === "per_person" ? "per person" : "per lane"})</td>
                    <td className="py-4 px-2">
                      {row.period === "peak" ? "Peak" : "Non Peak"}
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
                          <div
                            className="fixed inset-0 z-50"
                            onClick={closeActionModal}
                            tabIndex={-1}
                            aria-hidden
                          />
                          <ActionModal
                            onClose={closeActionModal}
                            onEdit={() => openModal(row)}
                            onDelete={() => handleDelete(row._id)}
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
              })
            )}
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
          isSaving={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </section>
  );
}
