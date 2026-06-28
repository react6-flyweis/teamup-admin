import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Improved: always shows first, last, current, +/-1, and uses ... as needed
  const generatePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div
      className="flex flex-row items-center justify-center gap-3"
      style={{
        width: 395,
        height: 31,
        fontFamily: "Montserrat",
      }}
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-[#A3EBFF] font-medium text-[12px] leading-[15px] px-1 py-0 focus:outline-none"
        style={{
          width: 53,
          height: 15,
          background: "none",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Previous
      </button>

      {generatePages().map((page, i) => {
        if (page === "...") {
          return (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                width: 31,
                height: 31,
                borderRadius: 8,
                background: "none",
                fontFamily: "Montserrat",
              }}
            >
              <span
                className="text-black font-medium text-[12px] leading-[15px]"
                style={{ width: 13, textAlign: "center" }}
              >
                ...
              </span>
            </div>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <button
            key={i}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`flex items-center justify-center px-[9px] py-[8px] font-medium text-[12px] leading-[15px] rounded-[8px] transition
              ${
                isCurrent
                  ? "bg-[#003240] text-white"
                  : "bg-[#A3EBFF] text-black hover:bg-[#8ad3f0]"
              }
            `}
            style={{
              width: 31,
              height: 31,
              fontFamily: "Montserrat",
            }}
            tabIndex={0}
            aria-current={isCurrent ? "page" : undefined}
          >
            <span
              style={{
                width: 13,
                textAlign: "center",
                display: "inline-block",
              }}
            >
              {page}
            </span>
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-[#A3EBFF] font-medium text-[12px] leading-[15px] px-1 py-0 focus:outline-none"
        style={{
          width: 29,
          height: 15,
          background: "none",
          border: "none",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
