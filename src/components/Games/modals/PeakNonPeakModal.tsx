/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Toggle from "@/components/common/Toggle";
import { FormDropdown } from "@/components/common/FormDropdown";
import CloseIcon from "@/assets/icons/CloseIcon";
import { useGamesQuery } from "@/hooks/useGames";
import { useLocationsQuery } from "@/hooks/useLocations";

interface ModalProps {
  value: any | null;
  onClose: () => void;
  onSave: (row: any) => void;
  isSaving?: boolean;
}

// SELECT OPTIONS
const dayOptions = [
  "Monday-Thursday",
  "Friday-Sunday",
  "Saturday-Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeOptions = [
  "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", 
  "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM"
];

function getDaysOfWeekArray(daysStr: string): string[] {
  switch (daysStr) {
    case "Monday-Thursday":
      return ["monday", "tuesday", "wednesday", "thursday"];
    case "Friday-Sunday":
      return ["friday", "saturday", "sunday"];
    case "Saturday-Sunday":
      return ["saturday", "sunday"];
    default:
      return [daysStr.toLowerCase()];
  }
}

function getDaysString(daysOfWeek: string[]): string {
  if (!daysOfWeek || daysOfWeek.length === 0) return "";
  if (
    daysOfWeek.length === 4 &&
    daysOfWeek.includes("monday") &&
    daysOfWeek.includes("tuesday") &&
    daysOfWeek.includes("wednesday") &&
    daysOfWeek.includes("thursday")
  ) {
    return "Monday-Thursday";
  }
  if (
    daysOfWeek.length === 3 &&
    daysOfWeek.includes("friday") &&
    daysOfWeek.includes("saturday") &&
    daysOfWeek.includes("sunday")
  ) {
    return "Friday-Sunday";
  }
  if (
    daysOfWeek.length === 2 &&
    daysOfWeek.includes("saturday") &&
    daysOfWeek.includes("sunday")
  ) {
    return "Saturday-Sunday";
  }
  const day = daysOfWeek[0];
  if (!day) return "";
  return day.charAt(0).toUpperCase() + day.slice(1);
}

function timeTo24h(timeStr: string): string {
  if (!timeStr) return "12:00";
  if (timeStr.includes(":")) return timeStr;
  const parts = timeStr.split(" ");
  let hour = parseInt(parts[0]);
  const ampm = parts[1];
  if (ampm === "PM" && hour < 12) {
    hour += 12;
  }
  if (ampm === "AM" && hour === 12) {
    hour = 0;
  }
  const hourString = hour.toString().padStart(2, "0");
  return `${hourString}:00`;
}

function timeToAmpm(time24: string): string {
  if (!time24) return "";
  const parts = time24.split(":");
  let hour = parseInt(parts[0]);
  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  return `${hour} ${ampm}`;
}

export default function PeakNonPeakModal({
  value,
  onClose,
  onSave,
  isSaving = false,
}: ModalProps) {
  const { data: gamesData } = useGamesQuery();
  const { data: locationsData } = useLocationsQuery();

  const games = gamesData?.games || [];
  const locations = locationsData?.locations || [];

  const gameOptions = games.map((g) => g.name);
  const locationOptions = locations.map((l) => `${l.name} (${l.state})`);

  const [form, setForm] = useState({
    id: value?._id ?? undefined,
    gameId: value?.game?._id || value?.game || "",
    locationId: value?.location?._id || value?.location || "",
    label: value?.label || "",
    days: value?.daysOfWeek ? getDaysString(value.daysOfWeek) : "",
    startTime: value?.startTime ? timeToAmpm(value.startTime) : "",
    endTime: value?.endTime ? timeToAmpm(value.endTime) : "",
    price: value?.price ? String(value.price) : "",
    pricingType: value?.pricingType || "per_person",
    peak: value?.period === "peak",
  });

  const selectedGameName = games.find((g) => g._id === form.gameId)?.name || "";
  const selectedLocationName = locations.find((l) => l._id === form.locationId)
    ? `${locations.find((l) => l._id === form.locationId)?.name} (${
        locations.find((l) => l._id === form.locationId)?.state
      })`
    : "";

  function handleDropdownChange(name: string, v: string) {
    setForm((prev) => ({ ...prev, [name]: v }));
  }

  function handleGameChange(name: string) {
    const selected = games.find((g) => g.name === name);
    if (selected) {
      setForm((prev) => ({ ...prev, gameId: selected._id }));
    }
  }

  function handleLocationChange(locStr: string) {
    const selected = locations.find((l) => `${l.name} (${l.state})` === locStr);
    if (selected) {
      setForm((prev) => ({ ...prev, locationId: selected._id }));
    }
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
      _id: form.id,
      game: form.gameId,
      gameId: form.gameId,
      location: form.locationId,
      locationId: form.locationId,
      label: form.label,
      period: form.peak ? "peak" : "non_peak",
      daysOfWeek: getDaysOfWeekArray(form.days),
      startTime: timeTo24h(form.startTime),
      endTime: timeTo24h(form.endTime),
      price: Number(form.price),
      pricingType: form.pricingType,
      currency: "USD",
      isActive: true,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#FFD0F8] p-7 pb-5 rounded-xl min-w-[350px] w-[95vw] max-w-[550px] shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {form.id ? "Customize Pricing" : "Add New Time Slot"}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f9bede]"
          >
            <span className="text-lg font-bold">
              <CloseIcon />
            </span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Game</label>
              <FormDropdown
                options={gameOptions}
                value={selectedGameName}
                onChange={handleGameChange}
                placeholder="Select Game"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Location</label>
              <FormDropdown
                options={locationOptions}
                value={selectedLocationName}
                onChange={handleLocationChange}
                placeholder="Select Location"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Label</label>
              <input
                name="label"
                type="text"
                className="w-full rounded-md px-3 py-3 border bg-white border-[#EBD2E8] h-[48px] disabled:opacity-60"
                value={form.label}
                onChange={handleChange}
                required
                placeholder="e.g. Weekday Non-Peak"
                disabled={isSaving}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Day(s)</label>
              <FormDropdown
                options={dayOptions}
                value={form.days}
                onChange={(v) => handleDropdownChange("days", v)}
                placeholder="Select Day(s)"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Start Time</label>
              <FormDropdown
                options={timeOptions}
                value={form.startTime}
                onChange={(v) => handleDropdownChange("startTime", v)}
                placeholder="Select Start Time"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">End Time</label>
              <FormDropdown
                options={timeOptions}
                value={form.endTime}
                onChange={(v) => handleDropdownChange("endTime", v)}
                placeholder="Select End Time"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Price ($)</label>
              <input
                name="price"
                type="number"
                step="1"
                min="0"
                className="w-full rounded-md px-3 py-3 border bg-white border-[#EBD2E8] h-[48px] disabled:opacity-60"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="Enter Price"
                disabled={isSaving}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-sm font-semibold block">Pricing Type</label>
              <FormDropdown
                options={["Per Person", "Per Lane"]}
                value={form.pricingType === "per_person" ? "Per Person" : "Per Lane"}
                onChange={(v) =>
                  handleDropdownChange(
                    "pricingType",
                    v === "Per Person" ? "per_person" : "per_lane"
                  )
                }
                placeholder="Select Pricing Type"
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
              className="px-7 py-2 border-2 border-[#E1017D] text-[#E1017D] font-bold rounded-lg bg-white disabled:opacity-50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2 bg-[#E1017D] text-white font-bold rounded-lg disabled:opacity-50 flex items-center gap-2"
              disabled={isSaving}
            >
              {isSaving && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
