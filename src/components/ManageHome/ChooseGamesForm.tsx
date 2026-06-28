import React, { useState } from 'react';
import type { GameItem } from './types';
import { EditIcon, TrashIcon, EyeIcon, HideEyeIcon } from '@/assets/icons';

interface ChooseGamesFormProps {
  initialData: GameItem[];
}

const ChooseGamesForm: React.FC<ChooseGamesFormProps> = ({ initialData }) => {
  const [games, setGames] = useState<GameItem[]>(initialData);

  const toggleVisibility = (id: string) => {
    setGames(games.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g));
  };

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Choose Your Game</h2>
          <p className="text-sm text-gray-400 mt-1">Manage the games shown on the homepage.</p>
        </div>
        <button className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Add New Game
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <div key={game.id} className={`flex items-center gap-4 p-3 border rounded-lg ${game.isActive ? 'border-[#3A3530] bg-[#222222]' : 'border-gray-800 bg-[#1A1A1A] opacity-75'}`}>
            <img src={game.imageUrl} alt={game.name} className="w-16 h-16 rounded object-cover bg-gray-800" />
            <div className="flex-1">
              <h4 className={`text-sm font-bold ${game.isActive ? 'text-white' : 'text-gray-500'}`}>{game.name}</h4>
              <div className="flex gap-2 mt-1 text-xs">
                <span className="text-[#E1017D]">Book: {game.bookNowLink}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => toggleVisibility(game.id)} className="p-1 text-gray-400 hover:text-white">
                {game.isActive ? <EyeIcon size={16} color="currentColor" /> : <HideEyeIcon size={16} color="currentColor" />}
              </button>
              <button className="p-1 text-blue-400 hover:text-blue-300">
                <EditIcon size={16} color="currentColor" />
              </button>
              <button className="p-1 text-red-400 hover:text-red-300">
                <TrashIcon size={16} color="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ChooseGamesForm;
