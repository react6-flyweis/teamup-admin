import React, { useState } from 'react';
import type { LocationInfo } from './types';

interface LocationHoursFormProps {
  initialData: LocationInfo;
}

const LocationHoursForm: React.FC<LocationHoursFormProps> = ({ initialData }) => {
  const [data, setData] = useState<LocationInfo>(initialData);

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
      <h2 className="text-xl font-semibold text-white mb-6">Location & Hours</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Full Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Google Maps Embed URL</label>
          <input
            type="text"
            value={data.mapEmbedUrl}
            onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value })}
            className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-4">Operating Hours</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.hours.map((hour, index) => (
              <div key={hour.id} className="flex items-center gap-3 p-3 border border-[#3A3530] rounded bg-[#222222]">
                <div className="w-24 text-sm font-medium text-white">{hour.day}</div>
                <input
                  type="text"
                  value={hour.openTime}
                  onChange={(e) => {
                    const newHours = [...data.hours];
                    newHours[index].openTime = e.target.value;
                    setData({ ...data, hours: newHours });
                  }}
                  className="flex-1 h-8 px-2 rounded bg-[#1A1A1A] border border-[#3A3530] text-white text-sm"
                  placeholder="Open"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="text"
                  value={hour.closeTime}
                  onChange={(e) => {
                    const newHours = [...data.hours];
                    newHours[index].closeTime = e.target.value;
                    setData({ ...data, hours: newHours });
                  }}
                  className="flex-1 h-8 px-2 rounded bg-[#1A1A1A] border border-[#3A3530] text-white text-sm"
                  placeholder="Close"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default LocationHoursForm;
