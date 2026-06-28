import React, { useState } from "react";
import Toggle from "@/components/common/Toggle";
import Pagination from "@/utils/Pagination";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";

const allGamesData = [
  {
    id: "1",
    gameName: "Axe Throwing",
    status: "Partial",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "Multiple",
    lanes: [
      {
        id: "l1",
        name: "Lane 1",
        status: "Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "N/A",
        isIssueActive: false,
      },
      {
        id: "l2",
        name: "Lane 2",
        status: "Non-Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "Target alignment issue",
        isIssueActive: true,
      },
      {
        id: "l3",
        name: "Lane 3",
        status: "Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "N/A",
        isIssueActive: false,
      },
      {
        id: "l4",
        name: "Lane 4",
        status: "Non-Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "Target alignment issue",
        isIssueActive: true,
      },
      {
        id: "l5",
        name: "Lane 5",
        status: "Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "Target alignment issue",
        isIssueActive: false,
      },
      {
        id: "l6",
        name: "Lane 6",
        status: "Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "N/A",
        isIssueActive: false,
      },
      {
        id: "l7",
        name: "Lane 7",
        status: "Operational",
        lastMaintenance: "24/04/2025",
        nextInspectionDue: "24/08/2025",
        issue: "N/A",
        isIssueActive: false,
      },
    ],
  },
  {
    id: "2",
    gameName: "Shuffle Board",
    status: "Partial",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "Multiple",
    lanes: [],
  },
  {
    id: "3",
    gameName: "Karaoke Room",
    status: "Partial",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "Multiple",
    lanes: [],
  },
  {
    id: "4",
    gameName: "Sports Simulator",
    status: "Partial",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "Multiple",
    lanes: [],
  },
  {
    id: "5",
    gameName: "Nexus Gel Blaster",
    status: "Partial",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "Multiple",
    lanes: [],
  },
  {
    id: "6",
    gameName: "Drone Soccer",
    status: "Operational",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "N/A",
    lanes: [],
  },
  {
    id: "7",
    gameName: "VR Arena",
    status: "Operational",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "N/A",
    lanes: [],
  },
  {
    id: "8",
    gameName: "Arcade",
    status: "Operational",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "N/A",
    lanes: [],
  },
  {
    id: "9",
    gameName: "Mini Golf",
    status: "Operational",
    lastMaintenance: "Operational",
    nextInspectionDue: "24/08/2025",
    issue: "N/A",
    lanes: [],
  },
];

const PAGE_SIZE = 8;

const columns = [
  { key: "gameName", label: "Game Name", className: "w-[22%]" },
  { key: "status", label: "Status", className: "w-[13%]" },
  { key: "lastMaintenance", label: "Last Maintenance", className: "w-[17%]" },
  {
    key: "nextInspectionDue",
    label: "Next Inspection Due",
    className: "w-[18%]",
  },
  { key: "issue", label: "Issue", className: "w-[19%]" },
  { key: "action", label: "Action", className: "w-[11%] text-center" },
];

const SUB_ROW_HEIGHT = 48;

export default function GameEquipmentStatus() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const [lanesState, setLanesState] = useState(() =>
    Object.fromEntries(
      allGamesData.map((g) => [g.id, g.lanes.map((lane) => ({ ...lane }))])
    )
  );

  const totalPages = Math.ceil(allGamesData.length / PAGE_SIZE);
  const paginatedGames = allGamesData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleToggle(gameId: string, laneIdx: number) {
    setLanesState((prev) => {
      const arr = [...prev[gameId]];
      arr[laneIdx] = {
        ...arr[laneIdx],
        isIssueActive: !arr[laneIdx].isIssueActive,
      };
      return { ...prev, [gameId]: arr };
    });
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-5">
        Game Equipment Status
      </h2>
      <div className="rounded-xl overflow-hidden bg-transparent shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#FFD0F8]">
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`py-4 px-2 font-bold text-[15px] text-black ${
                    col.className || ""
                  }`}
                  style={{
                    borderTopLeftRadius: i === 0 ? 12 : 0,
                    borderTopRightRadius: i === columns.length - 1 ? 12 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedGames.map((game, idx) => {
              const globalIdx = (page - 1) * PAGE_SIZE + idx;
              const isOpen = expandedIdx === globalIdx;
              const lanes = lanesState[game.id] || [];
              const isOdd = idx % 2 === 0;

              return (
                <React.Fragment key={game.id}>
                  {/* Main game row */}
                  <tr
                    className={`
                      ${isOdd ? "bg-[#FFF0F8]" : "bg-[#FFFBFD]"}
                      hover:bg-[#f3e2f6] hover:shadow-sm   transition-all duration-200 ease-in-out cursor-pointer
                    `}
                  >
                    <td className="py-4 px-2 font-bold ">
                      {game.gameName}
                    </td>
                    <td className="py-4 px-2">{game.status}</td>
                    <td className="py-4 px-2">{game.lastMaintenance}</td>
                    <td className="py-4 px-2">{game.nextInspectionDue}</td>
                    <td className="py-4 px-2">{game.issue}</td>
                    <td className="py-2 px-2 text-center">
                      {lanes.length > 0 ? (
                        <button
                          onClick={() =>
                            setExpandedIdx(isOpen ? null : globalIdx)
                          }
                          className="transition-transform duration-200 inline-flex items-center"
                          aria-label={
                            isOpen ? "Collapse details" : "Expand details"
                          }
                        >
                          <span
                            className={
                              isOpen ? "rotate-180 transition-transform" : ""
                            }
                          >
                            <ChevronDownIcon className="inline-block text-lg cursor-pointer" color="#000" />
                          </span>
                        </button>
                      ) : (
                        <ChevronDownIcon className="inline-block opacity-30 text-lg cursor-auto" color='#6b6a6a' />
                      )}
                    </td>
                  </tr>

                  {/* Expandable subtable */}
                  <tr style={{ background: "#FFD0F8" }}>
                    <td
                      colSpan={6}
                      style={{
                        padding: 0,
                        border: 0,
                        transition: "all 0.4s cubic-bezier(.68,-0.55,.27,1.55)",
                        height:
                          isOpen && lanes.length
                            ? lanes.length * SUB_ROW_HEIGHT
                            : 0,
                        borderBottomLeftRadius: !isOpen
                          ? idx === paginatedGames.length - 1
                            ? 12
                            : 0
                          : 0,
                        borderBottomRightRadius: !isOpen
                          ? idx === paginatedGames.length - 1
                            ? 12
                            : 0
                          : 0,
                      }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight:
                            isOpen && lanes.length
                              ? lanes.length * SUB_ROW_HEIGHT
                              : 0,
                          transition:
                            "max-height 0.5s cubic-bezier(.68,-0.55,.27,1.55)",
                          background: "#FFD0F8",
                        }}
                        className="w-full"
                      >
                        {isOpen && lanes.length > 0 && (
                          <table className="w-full">
                            <tbody>
                              {lanes.map((lane, laneIdx) => (
                                <tr
                                  className="text-sm"
                                  key={lane.id}
                                  style={{ height: SUB_ROW_HEIGHT }}
                                >
                                  <td className="pl-12 py-2 font-medium  w-[22%]">
                                    {lane.name}
                                  </td>
                                  <td className="w-[13%]">{lane.status}</td>
                                  <td className="w-[17%]">
                                    {lane.lastMaintenance}
                                  </td>
                                  <td className="w-[18%]">
                                    {lane.nextInspectionDue}
                                  </td>
                                  <td className="w-[19%]">
                                    <div className=" text-center">
                                      {lane.issue}
                                    </div>
                                  </td>
                                  <td className="w-[11%]">
                                    {lane.issue !== "N/A" &&
                                      lane.issue !== "" && (
                                        <Toggle
                                          checked={!!lane.isIssueActive}
                                          onChange={() =>
                                            handleToggle(game.id, laneIdx)
                                          }
                                          activeText=""
                                          inactiveText=""
                                        />
                                      )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="pt-3 flex justify-end items-center">
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
