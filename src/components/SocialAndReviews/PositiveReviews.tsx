import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StarIcon from "@/assets/icons/StarIcon";

const ROWS_PER_PAGE = 8;

const columns = [
  { key: "checkbox", label: "" },
  { key: "customer", label: "Customer" },
  { key: "rating", label: "Rating" },
  { key: "review", label: "Review" },
  { key: "gameZone", label: "Game/Zone" },
  { key: "date", label: "Date" },
];

const mockData = Array(16)
  .fill(0)
  .map((_, i) => ({
    id: (i + 1).toString(),
    customer: "John Smith",
    rating: 4.5,
    review: "Loved the shuffle board game with my gang.",
    gameZone: "Axe Throwing",
    date: "20/04/2025",
  }));

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

export default function PositiveReviewsTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ROWS_PER_PAGE);
  const pageData = mockData.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const handleSelectRow = (id: string) =>
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((rowId) => rowId !== id)
        : [...selectedIds, id]
    );

  return (
    <section className="w-full  mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Positive Reviews
        </h2>
        <button
          disabled={selectedIds.length === 0}
          className={`px-5 py-2 rounded-xl font-semibold font-poppins
            ${
              selectedIds.length > 0
                ? "bg-[#E1017D] text-white"
                : "bg-[#f3e0ef] text-[#A4A4A4] cursor-not-allowed"
            }
          `}
        >
          Feature Reviews
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
            {pageData.map((row, idx) => (
              <tr
                key={row.id}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out`}
              >
                {/* checkbox cell */}
                <td className="py-4 px-2 pl-10">
                  <StyledCheckbox
                    checked={selectedIds.includes(row.id)}
                    onClick={() => handleSelectRow(row.id)}
                  />
                </td>
                {/* customer */}
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.customer}
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
