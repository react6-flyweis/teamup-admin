/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import EditPenIcon from "@/assets/icons/EditIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import AssignManageGameZoneModal from "./modals/AssignManageGameZoneModal";

const initialZones = [
  {
    id: "1",
    area: "Axe Throwing Area",
    zone: "Zone A / 1st Floor",
    assignedGame: "Axe Throwing",
    lanes: "8",
    available: true,
    staff: "John D.",
  },
  {
    id: "2",
    area: "Shuffle Board Area",
    zone: "Zone A / 1st Floor",
    assignedGame: "Shuffle Board",
    lanes: "8",
    available: false,
    staff: "Kate G.",
  },
  {
    id: "3",
    area: "Karaoke Room Area",
    zone: "Zone B / 2nd Floor",
    assignedGame: "Karaoke Room",
    lanes: "4",
    available: true,
    staff: "Emily S.",
  },
  {
    id: "4",
    area: "Darts Club Area",
    zone: "Zone B / 2nd Floor",
    assignedGame: "AR Darts",
    lanes: "6",
    available: true,
    staff: "Alex P.",
  },
  {
    id: "5",
    area: "Mini Golf Green",
    zone: "Zone C / Ground Floor",
    assignedGame: "Indoor Mini Golf",
    lanes: "9",
    available: false,
    staff: "Mike L.",
  },
  {
    id: "6",
    area: "Bowling Alley",
    zone: "Zone C / Ground Floor",
    assignedGame: "Duckpin Bowling",
    lanes: "12",
    available: true,
    staff: "Sophie T.",
  },
  {
    id: "7",
    area: "Laser Tag Arena",
    zone: "Zone D / Lower Level",
    assignedGame: "Laser Tag",
    lanes: "10",
    available: false,
    staff: "Brian F.",
  },
  {
    id: "8",
    area: "Arcade Central",
    zone: "Zone D / Lower Level",
    assignedGame: "Arcade",
    lanes: "10",
    available: true,
    staff: "Rita Z.",
  },
  {
    id: "9",
    area: "Snooker Room",
    zone: "Zone E / 1st Floor",
    assignedGame: "Snooker",
    lanes: "5",
    available: true,
    staff: "David J.",
  },
  {
    id: "10",
    area: "Sim Golf Lounge",
    zone: "Zone F / 3rd Floor",
    assignedGame: "Golf Simulator",
    lanes: "7",
    available: false,
    staff: "Maria V.",
  },
  {
    id: "11",
    area: "Dance Zone",
    zone: "Zone F / 3rd Floor",
    assignedGame: "Karaoke Dance Floor",
    lanes: "3",
    available: true,
    staff: "Tarun M.",
  },
  {
    id: "12",
    area: "Baseball Sim Area",
    zone: "Zone G / Ground Floor",
    assignedGame: "Base Ball Simulator",
    lanes: "4",
    available: true,
    staff: "Helen Y.",
  },
 
];


export default function AssignManageGameZone() {
  const [zones, setZones] = useState(initialZones);
  const [showModal, setShowModal] = useState(false);
  const [editZone, setEditZone] = useState<any | null>(null);

  const openModal = (zone?: any) => {
    setEditZone(zone ?? null);
    setShowModal(true);
  };

  const handleSave = (row: any) => {
    if (row.id) {
      setZones(zones.map((z) => (z.id === row.id ? row : z)));
    } else {
      setZones([...zones, { ...row, id: (zones.length + 1).toString() }]);
    }
    setShowModal(false);
    setEditZone(null);
  };

  const handleDelete = (id: string) => {
    setZones(zones.filter((z) => z.id !== id));
  };

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
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3  gap-7 w-full">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="bg-[#FFD0F8] rounded-2xl w-auto shadow-[0_4px_16px_0_rgba(0,0,0,0.04)]"
          >
            <div className="flex justify-between items-start p-5 pb-0">
              <div>
                <h3 className="text-2xl font-bold mb-0 leading-tight">
                  {zone.area}
                </h3>
                <div className="text-[15px] text-[#232323] font-normal mt-1 mb-2">
                  {zone.zone}
                </div>
              </div>
              <div className="flex gap-4 mt-1">
                <button onClick={() => openModal(zone)} title="Edit">
                  <EditPenIcon className="w-6 h-6 text-[#444]" />
                </button>
                <button onClick={() => handleDelete(zone.id)} title="Delete">
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
                <span>{zone.available ? "Available" : "Unavailable"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#222] font-semibold">Staff:</span>
                <span className="font-medium">{zone.staff}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
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
