import React, { useRef, useEffect } from "react";
import ChevronDown from "@/assets/icons/Chevron";

interface FormDropdownProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  width?: number | string;
  placeholder?: string;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  options,
  value,
  onChange,
  width = "100%",
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      style={{ width }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={handleMouseDown}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex flex-row justify-between items-center w-full bg-white border border-[#AEB4C2] rounded-[8px] transition cursor-pointer"
        style={{
          height: 48,
          padding: "12px 16px",
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "150%",
          color: "#333333",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex-grow text-left">
          {value || placeholder || "Select..."}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.3s ease",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              transition: "transform 0.3s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown className="w-6 h-6 color-#5A6684"   />
          </span>
        </span>
      </button>

      <div
        className={`absolute left-0 w-full bg-white border border-[#AEB4C2] rounded-[8px] overflow-hidden shadow-lg z-[60]
          transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 pointer-events-auto translate-y-1"
              : "opacity-0 pointer-events-none -translate-y-2"
          }
        `}
        style={{
          top: "52px",
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "150%",
          maxHeight: "200px",
          overflowY: "auto",
        }}
        role="listbox"
        aria-activedescendant={value}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`block w-full text-left transition-colors duration-150 ${
              option === value
                ? "bg-[#F0F0F0] text-[#333333]"
                : "text-[#5A6684] hover:bg-[#F8F9FA] hover:text-[#333333]"
            }`}
            style={{
              padding: "12px 16px",
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "150%",
            }}
            onClick={(e) => handleOptionClick(option, e)}
            onMouseDown={handleMouseDown}
            tabIndex={open ? 0 : -1}
            role="option"
            aria-selected={value === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
