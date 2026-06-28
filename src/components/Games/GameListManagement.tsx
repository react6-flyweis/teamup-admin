import { useState } from "react";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import ActionModal from "./modals/ActionModal";
import GameModal, { type GameData } from "./modals/GameModal";

interface Game {
  id: string;
  gameName: string;
  totalPeoplePerLane: number;
  totalLanes: number;
  timeMin: string;
  pricePerPerson: string;
  minAge: string;
  wheelchairAccess: string;
}

const initialGames: Game[] = [
  {
    id: "1",
    gameName: "Digi Axe Throw",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "Yes",
  },
  {
    id: "2",
    gameName: "Duckpin Bowling",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "Yes",
  },
  {
    id: "3",
    gameName: "Indoor Mini Golf",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "Yes",
  },
  {
    id: "4",
    gameName: "Nexus Gel Blaster / Laser tag",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "-",
    wheelchairAccess: "Yes",
  },
  {
    id: "5",
    gameName: "Digi Archery",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "Yes",
  },
  {
    id: "6",
    gameName: "AR Darts",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "Yes",
  },
  {
    id: "7",
    gameName: "Golf Simulator",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "-",
  },
  {
    id: "8",
    gameName: "Base Ball Simulator",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "-",
    wheelchairAccess: "-",
  },
  {
    id: "9",
    gameName: "Arcade",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "18+ (ID Req)",
    wheelchairAccess: "-",
  },
  {
    id: "10",
    gameName: "Karaoke Dance Floor",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "-",
    wheelchairAccess: "-",
  },
  {
    id: "11",
    gameName: "Snooker",
    totalPeoplePerLane: 12,
    totalLanes: 4,
    timeMin: "30/60",
    pricePerPerson: "$15",
    minAge: "-",
    wheelchairAccess: "-",
  },
];

const columns = [
  { key: "gameName", label: "Game Name" },
  { key: "totalPeoplePerLane", label: "Total People Per Lane" },
  { key: "totalLanes", label: "Total Lanes" },
  { key: "timeMin", label: "Time (Min)" },
  { key: "pricePerPerson", label: "Price (Per Person)" },
  { key: "minAge", label: "Min. Age (ID Req)" },
  { key: "wheelchairAccess", label: "Wheelchair Access" },
  { key: "action", label: "Action" },
];

export default function GameListingManagement() {
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [games, setGames] = useState(initialGames);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleAddGame = () => {
    setSelectedGame(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleEditGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      setSelectedGame(game);
      setModalMode("edit");
      setShowModal(true);
    }
    setShowActionModal(null);
  };

  const handleDeleteGame = (gameId: string) => {
    setGames(games.filter((game) => game.id !== gameId));
    setShowActionModal(null);
  };

  const handleSaveGame = (gameData: GameData) => {
    if (modalMode === "add") {
      const newGame = {
        id: (games.length + 1).toString(),
        gameName: gameData.gameName,
        totalPeoplePerLane: parseInt(gameData.peopleAllowedPerLane) || 0,
        totalLanes: parseInt(gameData.totalLanes) || 0,
        timeMin: gameData.timeOption,
        pricePerPerson: gameData.pricePerPerson,
        minAge: gameData.idRequired
          ? `${gameData.minimumAgeRequirement} (ID Req)`
          : gameData.minimumAgeRequirement,
        wheelchairAccess: gameData.wheelchairAccessible ? "Yes" : "-",
      };
      setGames([...games, newGame]);
    } else if (modalMode === "edit" && selectedGame) {
      setGames(
        games.map((game) =>
          game.id === selectedGame.id
            ? {
                ...game,
                gameName: gameData.gameName,
                totalPeoplePerLane:
                  parseInt(gameData.peopleAllowedPerLane) || 0,
                totalLanes: parseInt(gameData.totalLanes) || 0,
                timeMin: gameData.timeOption,
                pricePerPerson: gameData.pricePerPerson,
                minAge: gameData.idRequired
                  ? `${gameData.minimumAgeRequirement} (ID Req)`
                  : gameData.minimumAgeRequirement,
                wheelchairAccess: gameData.wheelchairAccessible ? "Yes" : "-",
              }
            : game
        )
      );
    }
    setShowModal(false);
    setSelectedGame(null);
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Game Listing Management
        </h2>
        <button
          onClick={handleAddGame}
          className="bg-[#E1017D] hover:bg-[#c5016b] text-white px-6 py-2 rounded-lg font-montserrat font-medium text-[14px] transition-colors duration-200"
        >
          Add Game
        </button>
      </div>
      <div className="rounded-[10px] shadow-lg" style={{ overflow: "visible" }}>
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
            {games.map((game, idx) => {
              const isLastRows = idx >= games.length - 3;
              return (
                <tr
                  key={game.id}
                  className={`
                    ${idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"}
                    hover:bg-[#f3e2f6] hover:shadow-sm   transition-all duration-200 ease-in-out cursor-pointer
                  `}
                >
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px] text-center">
                    {game.gameName}
                  </td>
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                    {game.totalPeoplePerLane}
                  </td>
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                    {game.totalLanes}
                  </td>
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                    {game.timeMin}
                  </td>
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                    {game.pricePerPerson}
                  </td>
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                    {game.minAge}
                  </td>
                  <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                    {game.wheelchairAccess}
                  </td>
                  <td className="relative py-4 px-2 pr-6 font-montserrat font-medium text-[14px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActionModal(idx);
                      }}
                      className="text-gray-600 hover:text-[#E1017D] transition-colors duration-200"
                    >
                      <HorizontalDotsIcon />
                    </button>
                    {showActionModal === idx && (
                      <ActionModal
                        onClose={() => setShowActionModal(null)}
                        onEdit={() => handleEditGame(game.id)}
                        onDelete={() => handleDeleteGame(game.id)}
                        style={
                          isLastRows
                            ? {
                                bottom: "100%",
                                top: "auto",
                                marginBottom: "8px",
                              }
                            : { top: "100%", bottom: "auto", marginTop: "8px" }
                        }
                        direction={isLastRows ? "up" : "down"}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <GameModal
          mode={modalMode}
          initialData={
            modalMode === "edit" && selectedGame
              ? {
                  gameName: selectedGame.gameName,
                  peopleAllowedPerLane: selectedGame.totalPeoplePerLane + "",
                  totalLanes: selectedGame.totalLanes + "",
                  timeOption: selectedGame.timeMin,
                  pricePerPerson: selectedGame.pricePerPerson,
                  minimumAgeRequirement: selectedGame.minAge.replace(
                    " (ID Req)",
                    ""
                  ),
                  idRequired: selectedGame.minAge.includes("ID Req"),
                  wheelchairAccessible: selectedGame.wheelchairAccess === "Yes",
                  gameIcon: "",
                  cardImage: "",
                  bannerPhoto: "",
                  headline: "",
                  description: "",
                }
              : undefined
          }
          onClose={() => {
            setShowModal(false);
            setSelectedGame(null);
          }}
          onSave={handleSaveGame}
        />
      )}
    </section>
  );
}
