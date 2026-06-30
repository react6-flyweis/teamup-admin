import { useState, useEffect } from "react";
import Pagination from "@/utils/Pagination";
import StarIcon from "@/assets/icons/StarIcon";
import type { PositiveReviews } from "@/hooks/useSocialReviews";

const ROWS_PER_PAGE = 8;

const columns = [
  { key: "checkbox", label: "" },
  { key: "customer", label: "Customer" },
  { key: "rating", label: "Rating" },
  { key: "review", label: "Review" },
  { key: "gameZone", label: "Game/Zone" },
  { key: "date", label: "Date" },
];

function StyledCheckbox({
  checked,
  onClick,
  className = "",
}: {
  checked: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[24px] h-[24px] bg-[#003240] rounded cursor-pointer flex items-center justify-center ${className}`}
      onClick={onClick}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      style={{ transition: "background 0.12s" }}
    >
      {checked && (
        <div className="absolute w-[17px] h-[11px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 17 11" fill="none" className="w-full h-full">
            <path
              d="M1 5.5L6 9.5L16 1.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

interface PositiveReviewsTableProps {
  positiveReviews: PositiveReviews;
  onUpdate: (updated: PositiveReviews) => void;
  isUpdating?: boolean;
}

export default function PositiveReviewsTable({ positiveReviews, onUpdate, isUpdating }: PositiveReviewsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const items = positiveReviews.items || [];

  useEffect(() => {
    if (positiveReviews.featuredReviewIds) {
      setSelectedIds(positiveReviews.featuredReviewIds);
    } else if (positiveReviews.featuredIndexes) {
      // Map indexes to corresponding IDs or stringified indexes
      const itemsList = positiveReviews.items || [];
      const ids = positiveReviews.featuredIndexes.map((idx) => {
        const item = itemsList[idx];
        return item?._id || item?.id || idx.toString();
      });
      setSelectedIds(ids);
    }
  }, [positiveReviews]);

  const totalPages = Math.max(1, Math.ceil(items.length / ROWS_PER_PAGE));
  const pageData = items.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleFeatureReviews = () => {
    if (isUpdating) return;
    onUpdate({
      ...positiveReviews,
      featuredReviewIds: selectedIds,
    });
  };

  return (
    <section className="w-full mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          {positiveReviews.title || "Positive Reviews"}
        </h2>
        <button
          onClick={handleFeatureReviews}
          disabled={selectedIds.length === 0 || isUpdating}
          className={`px-5 py-2 rounded-xl font-semibold font-poppins transition-all
            ${
              selectedIds.length > 0 && !isUpdating
                ? "bg-[#E1017D] text-white hover:bg-[#B71778] cursor-pointer"
                : "bg-[#f3e0ef] text-[#A4A4A4] cursor-not-allowed"
            }
          `}
        >
          {isUpdating ? "Featuring..." : "Feature Reviews"}
        </button>
      </div>
      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA]">
              <th className="py-4 w-12"></th>
              {columns.slice(1).map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-black font-montserrat"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr className="bg-[#FFFBFD]">
                <td colSpan={columns.length} className="py-8 text-gray-500 font-montserrat">
                  No positive reviews found.
                </td>
              </tr>
            ) : (
              pageData.map((row, idx) => {
                const rowId = row._id || row.id || ((page - 1) * ROWS_PER_PAGE + idx).toString();
                return (
                  <tr
                    key={rowId}
                    className={`${
                      idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                    } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out`}
                  >
                    {/* checkbox cell */}
                    <td className="py-4 px-2 pl-10">
                      <StyledCheckbox
                        checked={selectedIds.includes(rowId)}
                        onClick={() => handleSelectRow(rowId)}
                      />
                    </td>
                    {/* customer */}
                    <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                      {row.customerName}
                    </td>
                    {/* rating */}
                    <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                      <span className="inline-flex items-center gap-1">
                        <StarIcon /> {row.rating}
                      </span>
                    </td>
                    {/* review */}
                    <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                      {row.review}
                    </td>
                    {/* game zone */}
                    <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                      {row.gameZone}
                    </td>
                    {/* date */}
                    <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                      {row.date}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-end py-4 px-4 bg-transparent">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}

