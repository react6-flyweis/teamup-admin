import React, { useState } from 'react';
import type { BoomBundle } from './types';
import { EditIcon, TrashIcon, EyeIcon, HideEyeIcon } from '@/assets/icons';

interface BoomBundlesFormProps {
  initialData: BoomBundle[];
}

const BoomBundlesForm: React.FC<BoomBundlesFormProps> = ({ initialData }) => {
  const [bundles, setBundles] = useState<BoomBundle[]>(initialData);

  const toggleVisibility = (id: string) => {
    setBundles(bundles.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this bundle?')) {
      setBundles(bundles.filter(b => b.id !== id));
    }
  };

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Boom Bundles</h2>
        <button className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Add New Bundle
        </button>
      </div>

      <div className="space-y-4">
        {bundles.map((bundle) => (
          <div key={bundle.id} className={`p-4 rounded-lg border ${bundle.isActive ? 'border-[#3A3530] bg-[#222222]' : 'border-gray-800 bg-[#1A1A1A] opacity-75'}`}>
            <div className="flex gap-4">
              <img src={bundle.imageUrl} alt={bundle.title} className="w-32 h-24 object-cover rounded bg-gray-800" />
              <div className="flex-1">
                <h4 className={`text-lg font-medium mb-1 ${bundle.isActive ? 'text-white' : 'text-gray-500'}`}>{bundle.title}</h4>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">{bundle.description}</p>
                <div className="text-xs text-[#E1017D]">{bundle.buttonText} → {bundle.buttonLink}</div>
              </div>
              <div className="flex items-start gap-2">
                <button 
                  onClick={() => toggleVisibility(bundle.id)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title={bundle.isActive ? "Hide" : "Show"}
                >
                  {bundle.isActive ? <EyeIcon size={20} color="currentColor" /> : <HideEyeIcon size={20} color="currentColor" />}
                </button>
                <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <EditIcon size={20} color="currentColor" />
                </button>
                <button onClick={() => handleDelete(bundle.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors">
                  <TrashIcon size={20} color="currentColor" />
                </button>
              </div>
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

export default BoomBundlesForm;
