import Pagination from "@/utils/Pagination";
import { useState } from "react";

const columns = [
  { label: "Game", key: "game" },
  { label: "Zone", key: "zone" },
  { label: "Total", key: "total" },
  { label: "Total Occupancy", key: "occupancy" },
  { label: "Active Players", key: "players" },
];

const data = [
  {
    game: "Axe Throwing",
    zone: "Main Hall",
    total: "4 Lanes",
    occupancy: 40,
    players: 24,
  },
  {
    game: "Shuffle Board",
    zone: "Back Lounge",
    total: "4 Tables",
    occupancy: 24,
    players: 16,
  },
  {
    game: "AR Dart",
    zone: "Game Room",
    total: "8 Lanes",
    occupancy: 64,
    players: 60,
  },
  {
    game: "Beer Pong",
    zone: "Main Hall",
    total: "6 Tables",
    occupancy: 36,
    players: 32,
  },
  {
    game: "Karaoke Room",
    zone: "Back Lounge",
    total: "4 Rooms",
    occupancy: 60,
    players: 52,
  },
  {
    game: "Sports Simulator",
    zone: "Game Room",
    total: "20 Machines",
    occupancy: 40,
    players: 32,
  },
  {
    game: "Nexus Gel Blaster",
    zone: "Main Hall",
    total: "8 Lanes",
    occupancy: 64,
    players: 50,
  },
  {
    game: "Drone Soccer",
    zone: "Back Lounge",
    total: "8 Lanes",
    occupancy: 64,
    players: 50,
  },
  {
    game: "VR Arena",
    zone: "Main Hall",
    total: "8 Lanes",
    occupancy: 64,
    players: 50,
  },
  {
    game: "Arcade",
    zone: "Back Lounge",
    total: "20 Machine",
    occupancy: 40,
    players: 32,
  },
  {
    game: "Mini Golf",
    zone: "Game Room",
    total: "8 Lanes",
    occupancy: 64,
    players: 50,
  },
];

const ROWS_PER_PAGE = 10;

export default function LiveGameTable() {
  const [page, setPage] = useState(1);

  const pageData = data.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  return (
    <section className="w-full mt-14">
      <h2 className="font-bold text-white text-[22px] leading-[33px] font-poppins mb-6  px-4">
        Live Game & Total Occupancy
      </h2>
      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA] rounded-t-[8px]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-[#000] font-montserrat"
                  style={{
                    borderTopLeftRadius: col.key === columns[0].key ? 8 : 0,
                    borderTopRightRadius:
                      col.key === columns[columns.length - 1].key ? 8 : 0,
                    fontWeight: 700,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={row.game}
                className={
                  (idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]") +
                  " transition-all duration-200 ease-in-out " +
                  "hover:bg-[#f3e2f6] hover:shadow-sm  cursor-pointer"
                }
                style={{
                  transitionProperty: "background,box-shadow,transform",
                }}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.game}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.zone}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.total}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.occupancy}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {row.players}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end py-4 px-4 bg-transparent">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            // totalItems={data.length}
            // itemsPerPage={ROWS_PER_PAGE}
            onPageChange={setPage}
            // itemName="Games"
          />
        </div>
      </div>
    </section>
  );
}
