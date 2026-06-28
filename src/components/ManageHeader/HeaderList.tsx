import React, { useState, useEffect } from 'react';
import type { HeaderCategory, HeaderSubItem } from './types';
import { initialMockData } from './mockData';
import { EditIcon, TrashIcon, Chevron, EyeIcon, HideEyeIcon } from '@/assets/icons';
import SubItemList from './SubItemList';
import { useNavigate } from 'react-router-dom';
import Toggle from '@/components/common/Toggle';

const HeaderList: React.FC = () => {
  const [categories, setCategories] = useState<HeaderCategory[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load from local storage or use mock data
    const saved = localStorage.getItem('headerCategories');
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      setCategories(initialMockData);
    }
  }, []);

  const saveCategories = (newCategories: HeaderCategory[]) => {
    setCategories(newCategories);
    localStorage.setItem('headerCategories', JSON.stringify(newCategories));
  };

  const toggleVisibility = (id: string) => {
    const updated = categories.map(cat => 
      cat.id === id ? { ...cat, isHidden: !cat.isHidden } : cat
    );
    saveCategories(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      saveCategories(categories.filter(cat => cat.id !== id));
    }
  };



  const updateSubItems = (categoryId: string, subItems: HeaderSubItem[]) => {
    const updated = categories.map(cat => 
      cat.id === categoryId ? { ...cat, subItems } : cat
    );
    saveCategories(updated);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/manage-header/category/new')}
          className="bg-[#D92D20] text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-[#1C1C1C] rounded-lg border border-[#3A3530] overflow-hidden">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-[#3A3530] last:border-0">
            <div className="flex items-center justify-between p-4 bg-[#252525] hover:bg-[#2C2C2C] transition-colors">
              <div 
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => setExpandedCategoryId(expandedCategoryId === category.id ? null : category.id)}
              >
                <div className={`transform transition-transform ${expandedCategoryId === category.id ? 'rotate-180' : ''}`}>
                  <Chevron size={20} color="currentColor" className="text-gray-400" />
                </div>
                <h3 className={`text-lg font-medium ${category.isHidden ? 'text-gray-500 line-through' : 'text-white'}`}>
                  {category.name}
                </h3>
                <span className="text-xs bg-[#3A3530] text-gray-300 px-2 py-1 rounded-full">
                  {category.subItems.length} items
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div title={category.isHidden ? "Show Category" : "Hide Category"}>
                  <Toggle 
                    checked={!category.isHidden}
                    onChange={() => toggleVisibility(category.id)}
                    activeColor="#10A200"
                    inactiveColor="#EC221F"
                  />
                </div>
                <button 
                  onClick={() => navigate(`/manage-header/category/${category.id}`)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <EditIcon size={20} color="currentColor" />
                </button>
                <button 
                  onClick={() => handleDelete(category.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <TrashIcon size={20} color="currentColor" />
                </button>
              </div>
            </div>

            {expandedCategoryId === category.id && (
              <div className="p-4 bg-[#1C1C1C]">
                <SubItemList 
                  subItems={category.subItems} 
                  categoryName={category.name}
                  categoryId={category.id}
                  availableGames={[]}
                  onUpdate={(newSubItems) => updateSubItems(category.id, newSubItems)} 
                />
              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
};

export default HeaderList;
