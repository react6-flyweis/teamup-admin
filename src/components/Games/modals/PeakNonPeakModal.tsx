/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Toggle from "@/components/common/Toggle";
import { FormDropdown } from "@/components/common/FormDropdown";
import CloseIcon from "@/assets/icons/CloseIcon";

interface ModalProps {
  value: any | null;
  onClose: () => void;
  onSave: (row: any) => void;
}

// SELECT OPTIONS
const dayOptions = [
  "Monday-Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
const timeOptions = [
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM",
  "8 PM", "9 PM", "10 PM", "11 PM"
];

export default function PeakNonPeakModal({
  value,
  onClose,
  onSave,
}: ModalProps) {
  const [form, setForm] = useState({
    id: value?.id ?? undefined,
    days: value?.days || "",
    startTime: value?.startTime || "",
    endTime: value?.endTime || "",
    price: value?.price ? value.price.replace("$", "") : "",
    peak: value?.peak || false,
  });

  function handleDropdownChange(name: string, v: string) {
    setForm(prev => ({ ...prev, [name]: v }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleToggle(checked: boolean) {
    setForm((prev) => ({ ...prev, peak: checked }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      price: form.price.startsWith("$") ? form.price : `$${form.price}`,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#FFD0F8] p-7 pb-5 rounded-xl min-w-[350px] w-[95vw] max-w-[500px] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {form.id ? "Customize Pricing" : "Add New Time Slot"}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f9bede]"
          >
            <span className="text-lg font-bold"><CloseIcon/></span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Day(s)</label>
              <FormDropdown
                options={dayOptions}
                value={form.days}
                onChange={v => handleDropdownChange("days", v)}
                placeholder="Select Day(s)"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Start Time</label>
              <FormDropdown
                options={timeOptions}
                value={form.startTime}
                onChange={v => handleDropdownChange("startTime", v)}
                placeholder="Select Start Time"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">End Time</label>
              <FormDropdown
                options={timeOptions}
                value={form.endTime}
                onChange={v => handleDropdownChange("endTime", v)}
                placeholder="Select End Time"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Price</label>
              <input
                name="price"
                type="number"
                step="1"
                min="0"
                className="w-full rounded-md px-3 py-2 border bg-white border-[#EBD2E8]"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="Enter Price"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 text-sm font-semibold block">Peak/Non Peak</label>
            <Toggle
              checked={form.peak}
              onChange={handleToggle}
              activeText="Peak"
              inactiveText="Non Peak"
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
