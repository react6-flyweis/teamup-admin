import React, { useState } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import AddVenueModal from "@/components/Venue/AddVenueModal";

type Venue = {
  id: string;
  country: string;
  name: string;
  city: string;
  zip: string;
  state: string;
  countryLabel: string;
};

const venues: Venue[] = [
  {
    id: "1",
    country: "United States",
    name: "Folsom, CA",
    city: "Folsom",
    zip: "95630",
    state: "California",
    countryLabel: "United States Of America",
  },
  {
    id: "2",
    country: "United States",
    name: "Citrus Height, CA",
    city: "Citrus High",
    zip: "95610",
    state: "California",
    countryLabel: "United States Of America",
  },
  {
    id: "3",
    country: "United States",
    name: "Lorem Ipsum",
    city: "Lorem Ipsum",
    zip: "Lorem Ipsum",
    state: "Lorem Ipsum",
    countryLabel: "United States Of America",
  },
  {
    id: "4",
    country: "United States",
    name: "Lorem Ipsum",
    city: "Lorem Ipsum",
    zip: "Lorem Ipsum",
    state: "Lorem Ipsum",
    countryLabel: "United States Of America",
  },
  {
    id: "5",
    country: "United States",
    name: "Lorem Ipsum",
    city: "Lorem Ipsum",
    zip: "Lorem Ipsum",
    state: "Lorem Ipsum",
    countryLabel: "United States Of America",
  },
  {
    id: "6",
    country: "United States",
    name: "Lorem Ipsum",
    city: "Lorem Ipsum",
    zip: "Lorem Ipsum",
    state: "Lorem Ipsum",
    countryLabel: "United States Of America",
  },
];

const LocationVenues: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-white font-bold text-2xl font-poppins">
          All Location or Specific Venues
        </h2>
        <button
          className="bg-[#E1017D] hover:bg-[#CA0E70] text-white px-6 py-2 rounded-lg font-poppins font-semibold text-[16px] transition"
          onClick={() => setShowAddModal(true)}
        >
          Add New Venue
        </button>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-[#F9D2EA] rounded-[16px] flex flex-col px-4 py-6 w-full h-[230px] relative "
            >
              <div className="flex flex-row items-start justify-between mb-2">
                <div>
                  <div className="font-poppins font-medium text-[12px] text-black leading-[18px]">
                    {venue.countryLabel}
                  </div>
                  <div className="font-poppins font-bold text-[16px] text-black leading-[24px]">
                    {venue.name}
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <button className="w-[37px] h-[37px] bg-white border border-[#CED4DA] rounded-md flex items-center justify-center">
                    <EditIcon size={18} />
                  </button>
                  <button className="w-[37px] h-[37px] bg-white border border-[#CED4DA] rounded-md flex items-center justify-center">
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-3">
                <div className="flex flex-row justify-between items-start">
                  <div className="font-poppins text-[14px] text-[#777]">
                    City:
                  </div>
                  <div className="font-poppins text-[16px] text-black text-right">
                    {venue.city}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <div className="font-poppins text-[14px] text-[#777]">
                    Zip Code:
                  </div>
                  <div className="font-poppins text-[16px] text-black text-right">
                    {venue.zip}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <div className="font-poppins text-[14px] text-[#777]">
                    State:
                  </div>
                  <div className="font-poppins text-[16px] text-black text-right">
                    {venue.state}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <div className="font-poppins text-[14px] text-[#777]">
                    Country:
                  </div>
                  <div className="font-poppins text-[16px] text-black text-right">
                    {venue.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddVenueModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default LocationVenues;
