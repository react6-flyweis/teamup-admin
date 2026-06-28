import { useState } from "react";
import Pagination from "@/utils/Pagination";

interface TrafficSlot {
  day: string;
  timeSlot: string;
  avgBooking: number;
  capacityUsed: string;
  trafficLevel: "Peak" | "High" | "Moderate" | "Low";
}

const initialTrafficData: TrafficSlot[] = [
  {
    day: "Friday",
    timeSlot: "19:00 PM - 22:00 PM",
    avgBooking: 42,
    capacityUsed: "95%",
    trafficLevel: "Peak"
  },
  {
    day: "Tuesday",
    timeSlot: "13:00 PM - 16:00 PM",
    avgBooking: 5,
    capacityUsed: "12%",
    trafficLevel: "High"
  },
  {
    day: "Saturday",
    timeSlot: "18:00 PM - 23:00 PM",
    avgBooking: 50,
    capacityUsed: "100%",
    trafficLevel: "Moderate"
  },
  {
    day: "Monday",
    timeSlot: "12:00 PM - 16:00 PM",
    avgBooking: 3,
    capacityUsed: "8%",
    trafficLevel: "Low"
  },
  {
    day: "Thursday",
    timeSlot: "18:00 PM - 21:00 PM",
    avgBooking: 28,
    capacityUsed: "70%",
    trafficLevel: "Peak"
  },
  {
    day: "Wednesday",
    timeSlot: "15:00 PM - 20:00 PM",
    avgBooking: 15,
    capacityUsed: "45%",
    trafficLevel: "Peak"
  },
  {
    day: "Sunday",
    timeSlot: "17:00 PM - 20:00 PM",
    avgBooking: 18,
    capacityUsed: "60%",
    trafficLevel: "Peak"
  },
  {
    day: "Tuesday",
    timeSlot: "10:00 AM - 13:00 PM",
    avgBooking: 8,
    capacityUsed: "20%",
    trafficLevel: "Low"
  },
  {
    day: "Wednesday",
    timeSlot: "11:00 AM - 14:00 PM",
    avgBooking: 12,
    capacityUsed: "30%",
    trafficLevel: "Moderate"
  }
];

const ROWS_PER_PAGE = 7;

const columns = [
  { key: "day", label: "Day" },
  { key: "timeSlot", label: "Time Slot" },
  { key: "avgBooking", label: "Avg. Booking" },
  { key: "capacityUsed", label: "% Capacity Used" },
  { key: "trafficLevel", label: "Traffic Level" },
];

const getTrafficLevelColor = (level: string) => {
  switch (level) {
    case "Peak":
      return "bg-[#EC221F]";
    case "High":
      return "bg-[#FF8C00]";
    case "Moderate":
      return "bg-[#E8B931]";
    case "Low":
      return "bg-[#14AE5C]";
    default:
      return "bg-gray-500";
  }
};

export default function PeakHourTrafficTable() {
  const [trafficData] = useState<TrafficSlot[]>(initialTrafficData);
  const [page, setPage] = useState(1);

  const pageData = trafficData.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(trafficData.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Peak Hour & Low Traffic Time Slots
        </h2>
      </div>

      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-black font-montserrat"
                  style={{
                    borderTopLeftRadius: col.key === columns[0].key ? 8 : 0,
                    borderTopRightRadius:
                      col.key === columns[columns.length - 1].key ? 8 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((slot, idx) => (
              <tr
                key={`${slot.day}-${slot.timeSlot}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer text-black`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.day}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.timeSlot}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.avgBooking}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {slot.capacityUsed}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${getTrafficLevelColor(
                      slot.trafficLevel
                    )} text-white font-medium`}
                  >
                    {slot.trafficLevel}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end py-4 px-4 bg-transparent">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
}
