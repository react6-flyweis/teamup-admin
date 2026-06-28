/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Toggle from "@/components/common/Toggle";

interface ModalProps {
  value: any | null;
  onClose: () => void;
  onSave: (row: any) => void;
}

export default function AssignManageGameZoneModal({
  value,
  onClose,
  onSave,
}: ModalProps) {
  const [form, setForm] = useState({
    id: value?.id ?? undefined,
    area: value?.area || "",
    zone: value?.zone || "",
    assignedGame: value?.assignedGame || "",
    lanes: value?.lanes || "",
    staff: value?.staff || "",
    available: value?.available || false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleToggle(checked: boolean) {
    setForm((prev) => ({ ...prev, available: checked }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...form });
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#FFD0F8] p-7 pb-5 rounded-xl min-w-[350px] w-[95vw] max-w-[650px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{form.area || "Add New Zone"}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f9bede]"
          >
            <span className="text-lg font-bold">&times;</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-[15px] font-semibold block">
                Zone
              </label>
              <input
                name="zone"
                className="w-full rounded-md px-3 py-2 border bg-white border-[#EBD2E8]"
                value={form.zone}
                onChange={handleChange}
                required
                placeholder="e.g. Zone A/ 1st Floor"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-[15px] font-semibold block">
                Assigned Game
              </label>
              <input
                name="assignedGame"
                className="w-full rounded-md px-3 py-2 border bg-white border-[#EBD2E8]"
                value={form.assignedGame}
                onChange={handleChange}
                required
                placeholder="e.g. Axe Throwing"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-[15px] font-semibold block">
                Lanes
              </label>
              <input
                name="lanes"
                type="number"
                className="w-full rounded-md px-3 py-2 border bg-white border-[#EBD2E8]"
                value={form.lanes}
                onChange={handleChange}
                required
                placeholder="e.g. 8"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-[15px] font-semibold block">
                Staff
              </label>
              <input
                name="staff"
                className="w-full rounded-md px-3 py-2 border bg-white border-[#EBD2E8]"
                value={form.staff}
                onChange={handleChange}
                required
                placeholder="e.g. John D."
              />
            </div>
          </div>
          <div>
            <label className="mb-1 text-[15px] font-semibold block">
              {form.available?"Available":"Unavailable"}
            </label>
            <Toggle
              checked={form.available}
              onChange={handleToggle}
              activeText=""
              inactiveText=""
              activeColor="#003240"
              inactiveColor="#4A4A4A"
            />
          </div>
          <div className="flex justify-end gap-4 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-2 border-2 border-[#E1017D] text-[#E1017D] font-bold rounded-lg bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2 bg-[#E1017D] text-white font-bold rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
