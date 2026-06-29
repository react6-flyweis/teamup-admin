import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { LocationInfo } from './types';
import { useLocationStore } from '@/store/locationStore';
import { useUpdateLocationMutation } from '@/hooks/useLocations';

const LocationHoursForm: React.FC = () => {
  const [data, setData] = useState<LocationInfo>({
    address: '',
    mapEmbedUrl: '',
    hours: [
      { id: '1', day: 'Monday', openTime: '', closeTime: '' },
      { id: '2', day: 'Tuesday', openTime: '', closeTime: '' },
      { id: '3', day: 'Wednesday', openTime: '', closeTime: '' },
      { id: '4', day: 'Thursday', openTime: '', closeTime: '' },
      { id: '5', day: 'Friday', openTime: '', closeTime: '' },
      { id: '6', day: 'Saturday', openTime: '', closeTime: '' },
      { id: '7', day: 'Sunday', openTime: '', closeTime: '' },
    ]
  });
  const { selectedLocation } = useLocationStore();
  const updateLocation = useUpdateLocationMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLocation) {
      setData({
        address: selectedLocation.address || '',
        mapEmbedUrl: selectedLocation.mapEmbedUrl || '',
        hours: (selectedLocation.openingHours || []).map((hour, idx) => ({
          id: String(idx),
          day: hour.day,
          openTime: hour.isClosed ? 'Closed' : hour.open,
          closeTime: hour.isClosed ? 'Closed' : hour.close,
        })),
      });
    }
  }, [selectedLocation]);

  const handleSave = () => {
    if (!selectedLocation) {
      setErrorMessage('No location selected.');
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    const payload = {
      address: data.address,
      mapEmbedUrl: data.mapEmbedUrl,
      openingHours: data.hours.map((hour) => {
        const isClosed = hour.openTime === 'Closed' || hour.closeTime === 'Closed';
        return {
          day: hour.day,
          open: isClosed ? '' : hour.openTime,
          close: isClosed ? '' : hour.closeTime,
          isClosed,
        };
      }),
    };

    updateLocation.mutate(
      { locationId: selectedLocation._id, payload },
      {
        onSuccess: () => {
          setSuccessMessage('Location details updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
        },
        onError: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            setErrorMessage(err.response?.data?.message || err.message);
          } else if (err instanceof Error) {
            setErrorMessage(err.message);
          } else {
            setErrorMessage('Failed to update location details.');
          }
        },
      }
    );
  };

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
      <h2 className="text-xl font-semibold text-white mb-6">Location & Hours</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

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
            {data.hours.map((hour, index) => {
              const isClosed = hour.openTime === 'Closed' || hour.closeTime === 'Closed';
              return (
                <div key={hour.id} className="flex items-center gap-3 p-3 border border-[#3A3530] rounded bg-[#222222]">
                  <div className="w-24 text-sm font-medium text-white">{hour.day}</div>
                  
                  <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isClosed}
                      onChange={(e) => {
                        const newHours = [...data.hours];
                        if (e.target.checked) {
                          newHours[index].openTime = 'Closed';
                          newHours[index].closeTime = 'Closed';
                        } else {
                          newHours[index].openTime = '09:00';
                          newHours[index].closeTime = '17:00';
                        }
                        setData({ ...data, hours: newHours });
                      }}
                      className="rounded border-[#3A3530] bg-[#1A1A1A] text-[#E1017D] focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Closed</span>
                  </label>

                  <input
                    type="time"
                    value={isClosed ? '' : hour.openTime}
                    disabled={isClosed}
                    onChange={(e) => {
                      const newHours = [...data.hours];
                      newHours[index].openTime = e.target.value;
                      setData({ ...data, hours: newHours });
                    }}
                    className="flex-1 h-8 px-2 rounded bg-[#1A1A1A] border border-[#3A3530] text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="time"
                    value={isClosed ? '' : hour.closeTime}
                    disabled={isClosed}
                    onChange={(e) => {
                      const newHours = [...data.hours];
                      newHours[index].closeTime = e.target.value;
                      setData({ ...data, hours: newHours });
                    }}
                    className="flex-1 h-8 px-2 rounded bg-[#1A1A1A] border border-[#3A3530] text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={updateLocation.isPending || !selectedLocation}
          className="bg-[#E1017D] hover:bg-[#c0016a] disabled:bg-[#e1017d]/50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {updateLocation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default LocationHoursForm;
