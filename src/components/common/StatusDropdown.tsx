import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { useState, useRef, useEffect } from "react";

export type BookingStatus = "All" | "Confirm" | "Pending" | "Cancelled";
export type PaymentStatus = "All" | "Completed" | "Pending" | "Failed";
export type RefundStatus = "All" | "Approved" | "Pending" | "Rejected";

interface StatusDropdownProps<T extends string> {
  currentStatus: T;
  onChange: (status: T) => void;
  options?: T[];
}

// Default options for backward compatibility
const defaultBookingOptions: BookingStatus[] = ["All", "Confirm", "Pending", "Cancelled"];

const StatusDropdown = <T extends string>({
  currentStatus,
  onChange,
  options = defaultBookingOptions as T[],
}: StatusDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[189px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full px-5 py-2 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base relative"
      >
        <span>{currentStatus}</span>

        <ChevronDownIcon
          className={`absolute right-5 top-1/2 -translate-y-1/2 transform transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#E1017D] rounded-[10px] overflow-hidden z-50">
          <div className="flex flex-col py-2">
            {options.map((status) => (
              <button
                key={status}
                onClick={() => {
                  onChange(status);
                  setIsOpen(false);
                }}
                className="px-5 py-3 text-left text-white font-poppins font-semibold text-base hover:bg-[#c9016f] transition-colors"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
