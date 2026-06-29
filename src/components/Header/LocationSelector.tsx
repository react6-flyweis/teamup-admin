import React, { useState, useEffect, useMemo } from "react";
import { Chevron } from "../../assets/icons";
import { useLocationsQuery } from "@/hooks/useLocations";
import { useLocationStore } from "@/store/locationStore";

interface LocationSelectorProps {
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  defaultLocation?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  itemClassName = "",
  defaultLocation = "Folsom, CA",
}) => {
  const { data, isLoading } = useLocationsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocationStore();

  const locations = useMemo(() => data?.locations || [], [data?.locations]);

  // Automatically select the first location from the API once loaded
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      setSelectedLocation(locations[0]);
    }
  }, [locations, selectedLocation, setSelectedLocation]);

  const displayText = selectedLocation
    ? `${selectedLocation.name}, ${selectedLocation.state}`
    : defaultLocation;

  return (
    <div className={`relative flex flex-1 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`header-component flex flex-1 items-center justify-between h-14 ${buttonClassName} ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <span className="text-header">
          {isLoading ? "Loading locations..." : displayText}
        </span>
        <Chevron
          size={24}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          color="#292D32"
        />
      </button>

      {isOpen && locations.length > 0 && (
        <div
          className={`absolute top-full left-0 mt-1 w-[290px] bg-white border border-neutral-200 rounded-lg shadow-lg z-50 ${dropdownClassName}`}
        >
          <div className="py-1">
            {locations.map((loc) => {
              const displayName = `${loc.name}, ${loc.state}`;
              return (
                <button
                  key={loc._id}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-base font-bold text-black hover:bg-gray-50 transition-colors duration-150 ${itemClassName}`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;


