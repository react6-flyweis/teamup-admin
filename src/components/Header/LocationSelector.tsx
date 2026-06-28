import React, { useState } from "react";
import { Chevron } from "../../assets/icons";

interface LocationSelectorProps {
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  defaultLocation?: string;
  locations?: string[];
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  itemClassName = "",
  defaultLocation = "Folsom, CA",
  locations = [
    "Folsom, CA",
    "Sacramento, CA",
    "San Francisco, CA",
    "Los Angeles, CA",
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  return (
    <div className={`relative  flex flex-1   ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`header-component flex flex-1 items-center justify-between  h-14 ${buttonClassName}`}
      >
        <span className="text-header">{selectedLocation}</span>
        <Chevron
          size={24}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          color="#292D32"
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 w-[290px] bg-white border border-neutral-200 rounded-lg shadow-lg z-50 ${dropdownClassName}`}
        >
          <div className="py-1">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => {
                  setSelectedLocation(location);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-base font-bold text-black hover:bg-gray-50 transition-colors duration-150 ${itemClassName}`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
