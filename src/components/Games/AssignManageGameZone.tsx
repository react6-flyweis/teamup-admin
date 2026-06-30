/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import EditPenIcon from "@/assets/icons/EditIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import AssignManageGameZoneModal from "./modals/AssignManageGameZoneModal";
import { useLocationStore } from "@/store/locationStore";
import {
  useGameZonesQuery,
  useCreateGameZoneMutation,
  useUpdateGameZoneMutation,
  useDeleteGameZoneMutation,
} from "@/hooks/useGameZones";

export default function AssignManageGameZone() {
  const { selectedLocation } = useLocationStore();
  const locationId = selectedLocation?._id || "";

  const { data: zones = [], isLoading } = useGameZonesQuery(locationId);

  const createMutation = useCreateGameZoneMutation();
  const updateMutation = useUpdateGameZoneMutation();
  const deleteMutation = useDeleteGameZoneMutation();

  const [showModal, setShowModal] = useState(false);
  const [editZone, setEditZone] = useState<any | null>(null);

  const openModal = (zone?: any) => {
    if (zone) {
      setEditZone({
        id: zone._id,
        area: `${zone.assignedGame} Area`,
        zone: zone.zone,
        assignedGame: zone.assignedGame,
        lanes: zone.lanes,
        staff: zone.staff,
        available: !zone.unavailable,
      });
    } else {
      setEditZone(null);
    }
    setShowModal(true);
  };

  const handleSave = (row: any) => {
    const payload = {
      locationId,
      zone: row.zone,
      assignedGame: row.assignedGame,
      lanes: Number(row.lanes),
      staff: row.staff,
      unavailable: !row.available,
    };

    if (row.id) {
      updateMutation.mutate(
        { id: row.id, payload },
        {
          onSuccess: () => {
            setShowModal(false);
            setEditZone(null);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setShowModal(false);
          setEditZone(null);
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this zone assignment?")) {
      deleteMutation.mutate({ id, locationId });
    }
  };

  if (!locationId) {
    return (
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-5">
          Assign & Manage Game Zone
        </h2>
        <div className="text-gray-400 bg-[#FFD0F8]/10 p-6 rounded-2xl text-center">
          Please select a location to manage game zones.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-white">
          Assign & Manage Game Zone
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-[#E1017D] hover:bg-[#c5016b] text-white px-6 py-2 rounded-lg font-montserrat font-medium text-[15px]"
        >
          Assign Zone
        </button>
      </div>

      {isLoading ? (
        <div className="text-white text-center py-6">Loading game zones...</div>
      ) : zones.length === 0 ? (
        <div className="text-gray-400 bg-[#FFD0F8]/10 p-6 rounded-2xl text-center">
          No game zones assigned to this location yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
          {zones.map((zone) => (
            <div
              key={zone._id}
              className="bg-[#FFD0F8] rounded-2xl w-auto shadow-[0_4px_16px_0_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start p-5 pb-0">
                <div>
                  <h3 className="text-2xl font-bold mb-0 leading-tight">
                    {zone.assignedGame} Area
                  </h3>
                  <div className="text-[15px] text-[#232323] font-normal mt-1 mb-2">
                    {zone.zone}
                  </div>
                </div>
                <div className="flex gap-4 mt-1">
                  <button onClick={() => openModal(zone)} title="Edit">
                    <EditPenIcon className="w-6 h-6 text-[#444]" />
                  </button>
                  <button onClick={() => handleDelete(zone._id)} title="Delete">
                    <TrashIcon className="w-6 h-6 text-[#e1017d]" />
                  </button>
                </div>
              </div>
              <hr className="border-[#A9A9A9] my-2" />
              <div className="px-5 pb-5 pt-2 text-[16px]">
                <div className="flex justify-between mb-[6px]">
                  <span className="text-[#222] font-semibold">
                    Game Assigned:
                  </span>
                  <span className="font-medium">{zone.assignedGame}</span>
                </div>
                <div className="flex justify-between mb-[6px]">
                  <span className="text-[#222] font-semibold">Lanes:</span>
                  <span className="font-medium">{zone.lanes}</span>
                </div>
                <div className="flex justify-between mb-[6px]">
                  <span className="text-[#222] font-semibold">Status:</span>
                  <span>{!zone.unavailable ? "Available" : "Unavailable"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#222] font-semibold">Staff:</span>
                  <span className="font-medium">{zone.staff}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AssignManageGameZoneModal
          value={editZone}
          onClose={() => {
            setShowModal(false);
            setEditZone(null);
          }}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

