import React, { useState, useEffect } from 'react';
import type { HeaderCategory, HeaderSubItem } from '@/components/ManageHeader/types';
import { initialMockData } from '@/components/ManageHeader/mockData';
import { EditIcon, TrashIcon } from '@/assets/icons';
import SubItemList from '@/components/ManageHeader/SubItemList';
import { useNavigate } from 'react-router-dom';
import Toggle from '@/components/common/Toggle';

const ManageHeader: React.FC = () => {
  const [categories, setCategories] = useState<HeaderCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const navigate = useNavigate();

  const MOCK_DATA_VERSION = 'v8'; // bump this when mockData changes

  useEffect(() => {
    const savedVersion = localStorage.getItem('headerCategoriesVersion');
    const saved = localStorage.getItem('headerCategories');
    if (saved && savedVersion === MOCK_DATA_VERSION) {
      const parsed = JSON.parse(saved);
      setCategories(parsed);
      if (parsed.length > 0) setSelectedCategoryId(parsed[0].id);
    } else {
      // Fresh load with new mock data
      setCategories(initialMockData);
      localStorage.setItem('headerCategories', JSON.stringify(initialMockData));
      localStorage.setItem('headerCategoriesVersion', MOCK_DATA_VERSION);
      if (initialMockData.length > 0) setSelectedCategoryId(initialMockData[0].id);
    }
  }, []);

  const saveCategories = (newCategories: HeaderCategory[]) => {
    setCategories(newCategories);
    localStorage.setItem('headerCategories', JSON.stringify(newCategories));
    localStorage.setItem('headerCategoriesVersion', MOCK_DATA_VERSION);
  };

  const toggleVisibility = (id: string) => {
    saveCategories(categories.map(cat => cat.id === id ? { ...cat, isHidden: !cat.isHidden } : cat));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updated = categories.filter(cat => cat.id !== id);
      saveCategories(updated);
      if (selectedCategoryId === id) {
        setSelectedCategoryId(updated.length > 0 ? updated[0].id : null);
      }
    }
  };



  const updateSubItems = (categoryId: string, subItems: HeaderSubItem[]) => {
    saveCategories(categories.map(cat => cat.id === categoryId ? { ...cat, subItems } : cat));
  };

  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || null;
  const availableGames = (categories.find(c => c.name.toLowerCase().includes('choose game'))?.subItems) || [];

  return (
    <div className="p-6 text-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Header</h1>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6 min-h-[calc(100vh-140px)]">

        {/* ── LEFT MINI SIDEBAR ── */}
        <div className="w-64 flex-shrink-0 bg-[#1C1C1C] rounded-xl border border-[#3A3530] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#3A3530] flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Categories</span>
            <button
              onClick={() => navigate('/manage-header/category/new')}
              className="text-xs bg-[#D92D20] hover:bg-red-700 text-white px-2 py-1 rounded transition-colors font-medium"
            >
              + Add
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`group flex items-center justify-between px-4 py-3 cursor-pointer border-b border-[#2A2A2A] transition-all duration-200 ${
                  selectedCategoryId === category.id
                    ? 'bg-[#2C2C2C] border-l-2 border-l-[#E1017D]'
                    : 'hover:bg-[#252525] border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    category.isHidden ? 'text-gray-500 line-through' : 
                    selectedCategoryId === category.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{category.subItems.length} items</p>
                </div>

                {/* Actions (show on hover or selected) */}
                <div
                  className={`flex items-center gap-1 ml-2 transition-opacity ${selectedCategoryId === category.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  onClick={e => e.stopPropagation()}
                >
                  <div title={category.isHidden ? 'Show' : 'Hide'}>
                    <Toggle
                      checked={!category.isHidden}
                      onChange={() => toggleVisibility(category.id)}
                      activeColor="#10A200"
                      inactiveColor="#EC221F"
                    />
                  </div>
                  <button
                    onClick={() => navigate(`/manage-header/category/${category.id}`)}
                    className="text-blue-400 hover:text-blue-300 p-1 transition-colors"
                  >
                    <EditIcon size={14} color="currentColor" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                  >
                    <TrashIcon size={14} color="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT PANEL ── */}
        <div className="flex-1 bg-[#1C1C1C] rounded-xl border border-[#3A3530] overflow-hidden">
          {selectedCategory ? (
            <>
              <div className="px-6 py-4 border-b border-[#3A3530] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{selectedCategory.name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Manage sub-items and their page content</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  selectedCategory.isHidden 
                    ? 'bg-red-900/30 text-red-400' 
                    : 'bg-green-900/30 text-green-400'
                }`}>
                  {selectedCategory.isHidden ? 'Hidden' : 'Visible'}
                </span>
              </div>
              <div className="p-6">
                <SubItemList
                  subItems={selectedCategory.subItems}
                  categoryName={selectedCategory.name}
                  categoryId={selectedCategory.id}
                  availableGames={availableGames}
                  onUpdate={(newSubItems) => updateSubItems(selectedCategory.id, newSubItems)}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-24 text-gray-500">
              <div className="text-4xl mb-4">📂</div>
              <p className="text-sm">Select a category from the sidebar</p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default ManageHeader;
