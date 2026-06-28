import React, { useState } from "react";
import Pagination from "@/utils/Pagination";

interface GameActivity {
  name: string;
  totalPlays: number;
  avgDuration: string;
  repeatPercent: string;
  engagementLevel: "Peak" | "High" | "Moderate" | "Low";
}

interface GameMetric {
  label: string;
  value: string;
}

const initialGameData: GameActivity[] = [
  {
    name: "Axe Throwing",
    totalPlays: 1200,
    avgDuration: "30 Min.",
    repeatPercent: "89%",
    engagementLevel: "Peak"
  },
  {
    name: "Shuffle Board",
    totalPlays: 789,
    avgDuration: "30 Min.",
    repeatPercent: "12%",
    engagementLevel: "High"
  },
  {
    name: "Karaoke Room",
    totalPlays: 752,
    avgDuration: "30 Min.",
    repeatPercent: "100%",
    engagementLevel: "Moderate"
  },
  {
    name: "Sports Simulator",
    totalPlays: 700,
    avgDuration: "30 Min.",
    repeatPercent: "8%",
    engagementLevel: "Low"
  },
  {
    name: "Nexus Gel Blaster",
    totalPlays: 652,
    avgDuration: "30 Min.",
    repeatPercent: "70%",
    engagementLevel: "Peak"
  },
  {
    name: "Drone Soccer",
    totalPlays: 660,
    avgDuration: "30 Min.",
    repeatPercent: "45%",
    engagementLevel: "Peak"
  },
  {
    name: "VR Arena",
    totalPlays: 632,
    avgDuration: "30 Min.",
    repeatPercent: "60%",
    engagementLevel: "Peak"
  },
  {
    name: "Arcade",
    totalPlays: 520,
    avgDuration: "30 Min.",
    repeatPercent: "60%",
    engagementLevel: "Peak"
  },
  {
    name: "Mini Golf",
    totalPlays: 400,
    avgDuration: "30 Min.",
    repeatPercent: "60%",
    engagementLevel: "Peak"
  }
];

const ROWS_PER_PAGE = 7;

const columns = [
  { key: "name", label: "Game/Activity" },
  { key: "totalPlays", label: "Total Plays" },
  { key: "avgDuration", label: "Avg. Duration" },
  { key: "repeatPercent", label: "Repeat%" },
  { key: "engagementLevel", label: "Engagement Level" },
];

const getEngagementLevelColor = (level: string) => {
  switch (level) {
    case "Peak":
      return "bg-[#FF4C4C] text-[#470000]";
    case "High":
      return "bg-[#FF9900] text-[#523100]";
    case "Moderate":
      return "bg-[#FFD700] text-[#5C4E00]";
    case "Low":
      return "bg-[#A8D5BA] text-[#004A1E]";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function PopularGamesTable() {
  const [gameData] = useState<GameActivity[]>(initialGameData);
  const [page, setPage] = useState(1);

  const pageData = gameData.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(gameData.length / ROWS_PER_PAGE);

  const gameMetrics: GameMetric[] = [
    {
      label: "Most Played Game",
      value: "Axe Throwing"
    },
    {
      label: "Least Engaged Activity",
      value: "shuffle Board"
    },
    {
      label: "Avg. Daily Plays (Top Game)",
      value: "65"
    },
    {
      label: "Top Game Repeat Rate",
      value: "72%"
    }
  ];

  return (
    <section className="w-full flex flex-col gap-4">
      {/* Section Title */}
      <div className="mb-2">
        <h2 className="text-[22px] leading-[33px] font-bold text-white font-poppins">
          Popular Games & Engaged Activity
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Metrics Summary */}
        <div 
          className="w-full rounded-2xl p-6 flex flex-col justify-center items-start gap-4"
          style={{ background: "#F9D2EA" }}
        >
          <div 
            className="w-full h-[108px] rounded-xl px-4 py-6 flex flex-row justify-between items-center gap-11"
            style={{ background: "#770F4E" }}
          >
            {gameMetrics.map((metric, index) => (
              <React.Fragment key={metric.label}>
                <div className="flex flex-col justify-center h-[60px] flex-1">
                  <span className="text-xs leading-[18px] font-medium text-white font-poppins mb-[18px]">
                    {metric.label}
                  </span>
                  <span className="text-base leading-6 font-bold text-white font-poppins">
                    {metric.value}
                  </span>
                </div>

                {index < gameMetrics.length - 1 && (
                  <div 
                    className="w-px h-[34px]"
                    style={{ background: "#F9D2EA" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Games Table */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <table
            className="w-full text-center border-separate"
            style={{ borderSpacing: 0 }}
          >
            <thead>
              <tr className="bg-[#F9D2EA]">
                {columns.map((col, index) => (
                  <th
                    key={col.key}
                    className="py-4 px-4 font-bold text-sm text-black font-montserrat"
                    style={{
                      borderTopLeftRadius: index === 0 ? 8 : 0,
                      borderTopRightRadius: index === columns.length - 1 ? 8 : 0,
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((game, idx) => (
                <tr
                  key={`${game.name}-${idx}`}
                  className={`${
                    idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                  } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer text-black`}
                >
                  <td className="py-4 px-4 font-montserrat font-medium text-sm">
                    {game.name}
                  </td>
                  <td className="py-4 px-4 font-montserrat font-medium text-sm">
                    {game.totalPlays.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 font-montserrat font-medium text-sm">
                    {game.avgDuration}
                  </td>
                  <td className="py-4 px-4 font-montserrat font-medium text-sm">
                    {game.repeatPercent}
                  </td>
                  <td className="py-4 px-4 font-montserrat font-medium text-sm">
                    <div className="flex justify-center">
                      <div
                        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full font-medium text-sm ${getEngagementLevelColor(
                          game.engagementLevel
                        )}`}
                        style={{
                          minWidth: game.engagementLevel === "Moderate" ? 85 : 56,
                          height: 32,
                          fontFamily: "Roboto",
                          fontSize: 14,
                          lineHeight: "20px",
                          letterSpacing: "0.1px"
                        }}
                      >
                        {game.engagementLevel}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="flex items-center justify-end py-4 px-4 bg-transparent">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
