/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FormDropdown } from "@/components/common/FormDropdown";

interface VenueModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (venue: any) => void;
}

const countries = ["United States", "Canada"];
const states = ["California", "Texas"];
const cities = ["Folsom", "Citrus Height"];

const AddVenueModal: React.FC<VenueModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [road, setRoad] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-[#F9D2EA] rounded-2xl p-6 w-[97vw] max-w-[560px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-poppins text-black">
            Add New Venue
          </h2>
          <button
            className="w-7 h-7 bg-white rounded-full flex items-center justify-center border"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M13 5L5 13M5 5L13 13" stroke="#000" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <hr className="border-black mb-4" />

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ country, state, city, zip, road, description });
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-black mb-1 font-poppins">
                Select Country
              </label>
              <FormDropdown
                options={countries}
                value={country}
                onChange={setCountry}
                placeholder="Select..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1 font-poppins">
                Select State
              </label>
              <FormDropdown
                options={states}
                value={state}
                onChange={setState}
                placeholder="Select..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1 font-poppins">
                Select City
              </label>
              <FormDropdown
                options={cities}
                value={city}
                onChange={setCity}
                placeholder="Select..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1 font-poppins">
                Enter Zip Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full h-12 px-4 border border-[#AEB4C2] rounded-[8px] bg-white font-open-sans text-base text-[#333]"
                placeholder="Enter.."
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1 font-poppins">
                Enter Road Name
              </label>
              <input
                type="text"
                value={road}
                onChange={(e) => setRoad(e.target.value)}
                className="w-full h-12 px-4 border border-[#AEB4C2] rounded-[8px] bg-white font-open-sans text-base text-[#333]"
                placeholder="Enter.."
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black mb-1 font-poppins">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-12 px-4 border border-[#AEB4C2] rounded-[8px] bg-white font-open-sans text-base text-[#333]"
                placeholder="Enter.."
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-[#7E0B0B] rounded-lg text-[#7E0B0B] text-base font-poppins font-semibold bg-white hover:bg-[#ffebf5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#E1017D] text-white text-base font-poppins font-semibold"
            >
              Add Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVenueModal;
