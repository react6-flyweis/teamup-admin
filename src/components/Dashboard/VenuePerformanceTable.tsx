import React, { useState } from "react";

type TabKey = "Daily" | "Weekly" | "Monthly";
type DataRow = {
  date: string;
  booking: number;
  revenue: string;
  occupancy: string;
  topGame: string;
};

const columns: { label: string; key: keyof DataRow }[] = [
  { label: "Date", key: "date" },
  { label: "Booking", key: "booking" },
  { label: "Revenue", key: "revenue" },
  { label: "Occupancy", key: "occupancy" },
  { label: "Top Game", key: "topGame" },
];

const DATA: Record<TabKey, DataRow[]> = {
  Daily: [
    {
      date: "2025/04/20",
      booking: 150,
      revenue: "$54,800",
      occupancy: "76%",
      topGame: "Axe Throwing",
    },
    {
      date: "2025/04/21",
      booking: 125,
      revenue: "$22,150",
      occupancy: "54%",
      topGame: "Shuffle Board",
    },
    {
      date: "2025/04/22",
      booking: 250,
      revenue: "$75,552",
      occupancy: "90%",
      topGame: "AR Dart",
    },
    {
      date: "2025/04/23",
      booking: 175,
      revenue: "$54,800",
      occupancy: "85%",
      topGame: "Karaoke Room",
    },
    {
      date: "2025/05/24",
      booking: 200,
      revenue: "$75,552",
      occupancy: "89%",
      topGame: "Mini Golf",
    },
    {
      date: "2025/04/25",
      booking: 195,
      revenue: "$75,552",
      occupancy: "54%",
      topGame: "Nexus Gel Blaster",
    },
    {
      date: "2025/04/26",
      booking: 180,
      revenue: "$75,552",
      occupancy: "54%",
      topGame: "Sports Simulator",
    },
  ],
  Weekly: [
    {
      date: "Week 1",
      booking: 150,
      revenue: "$54,800",
      occupancy: "76%",
      topGame: "Axe Throwing",
    },
    {
      date: "Week 2",
      booking: 125,
      revenue: "$22,150",
      occupancy: "54%",
      topGame: "Shuffle Board",
    },
    {
      date: "Week 3",
      booking: 250,
      revenue: "$75,552",
      occupancy: "90%",
      topGame: "AR Dart",
    },
    {
      date: "Week 4",
      booking: 175,
      revenue: "$54,800",
      occupancy: "85%",
      topGame: "Karaoke Room",
    },
    {
      date: "Week 5",
      booking: 200,
      revenue: "$75,552",
      occupancy: "89%",
      topGame: "Mini Golf",
    },
  ],
  Monthly: [
    {
      date: "January",
      booking: 850,
      revenue: "$54,800",
      occupancy: "76%",
      topGame: "Axe Throwing",
    },
    {
      date: "February",
      booking: 990,
      revenue: "$22,150",
      occupancy: "54%",
      topGame: "Shuffle Board",
    },
    {
      date: "March",
      booking: 1002,
      revenue: "$75,552",
      occupancy: "90%",
      topGame: "AR Dart",
    },
    {
      date: "April",
      booking: 1200,
      revenue: "$54,800",
      occupancy: "85%",
      topGame: "Karaoke Room",
    },
    {
      date: "May",
      booking: 654,
      revenue: "$75,552",
      occupancy: "89%",
      topGame: "Mini Golf",
    },
    {
      date: "June",
      booking: 990,
      revenue: "$75,552",
      occupancy: "89%",
      topGame: "Mini Golf",
    },
    {
      date: "July",
      booking: 840,
      revenue: "$75,552",
      occupancy: "89%",
      topGame: "Mini Golf",
    },
  ],
};

const tabs: { label: string; key: TabKey; minWidth: number }[] = [
  { label: "Daily", key: "Daily", minWidth: 72 },
  { label: "Weekly", key: "Weekly", minWidth: 91 },
  { label: "Monthly", key: "Monthly", minWidth: 97 },
];

const VenuePerformanceTable: React.FC = () => {
  const [selected, setSelected] = useState<TabKey>("Daily");

  return (
    <section className="w-full mt-8 space-y-4 mx-auto">
      {/* Header and Tabs row */}
      <div
        className="flex flex-row justify-between items-center px-4 mb-6"
       
      >
        <span className="font-bold text-white text-[22px] leading-[33px] font-poppins">
          Venue Wise Performance Tracking
        </span>
        <div className="flex bg-[#A3EBFF] rounded-[4px] px-[2px] h-[44px] items-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelected(tab.key)}
              className={`transition-colors duration-200 rounded-[4px] px-4 h-[40px] font-poppins font-medium text-[16px]
                ${
                  selected === tab.key
                    ? "bg-[#005066] text-white"
                    : "bg-transparent text-[#333]"
                }
              `}
              style={{
                minWidth: tab.minWidth,
                lineHeight: "24px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA] rounded-t-[8px] h-[49px]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-[#000] font-montserrat"
                  style={{ fontWeight: 700 }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA[selected].map((row, idx) => (
              <tr
                key={row.date}
                className={`
                  ${idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"}
                  transition-all duration-200 hover:bg-[#f3e2f6] cursor-pointer
                `}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.date}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.booking}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.revenue}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.occupancy}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.topGame}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VenuePerformanceTable;
