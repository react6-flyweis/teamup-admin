import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { HeaderCategory, HeaderSubItem } from '@/components/ManageHeader/types';
import { initialMockData } from '@/components/ManageHeader/mockData';
import { Chevron } from '@/assets/icons';
import GroupActivityForm from './forms/GroupActivityForm';

const GroupActivityFormPage: React.FC = () => {
  const { categoryId, subItemId } = useParams<{ categoryId: string; subItemId: string }>();
  const navigate = useNavigate();
  
  const [initialData, setInitialData] = useState<HeaderSubItem | null>(null);
  const [availableGames, setAvailableGames] = useState<HeaderSubItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('headerCategories');
    const categories: HeaderCategory[] = saved ? JSON.parse(saved) : initialMockData;
    const category = categories.find(c => c.id === categoryId);
    
    const gamesCategory = categories.find(c => c.name.toLowerCase().includes('choose game'));
    if (gamesCategory) {
      setAvailableGames(gamesCategory.subItems);
    }

    if (subItemId && subItemId !== 'new') {
      const subItem = category?.subItems.find(s => s.id === subItemId);
      if (subItem) {
        setInitialData(subItem);
      }
    }
    setLoading(false);
  }, [categoryId, subItemId]);

  const handleSave = (subItemData: Partial<HeaderSubItem>) => {
    const saved = localStorage.getItem('headerCategories');
    let categories: HeaderCategory[] = saved ? JSON.parse(saved) : initialMockData;

    categories = categories.map(category => {
      if (category.id === categoryId) {
        let newSubItems = [...category.subItems];
        if (subItemId && subItemId !== 'new') {
          newSubItems = newSubItems.map(item => item.id === subItemId ? { ...item, ...subItemData, pageType: 'group-activity' } as HeaderSubItem : item);
        } else {
          newSubItems.push({ ...subItemData, id: Date.now().toString(), isHidden: false, pageType: 'group-activity' } as HeaderSubItem);
        }
        return { ...category, subItems: newSubItems };
      }
      return category;
    });

    localStorage.setItem('headerCategories', JSON.stringify(categories));
    navigate('/manage-header');
  };

  const handleClose = () => {
    navigate('/manage-header');
  };

  if (loading) return null;

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
          <div className="rotate-90">
            <Chevron size={24} color="currentColor" />
          </div>
        </button>
        <h1 className="text-2xl font-bold">
          {subItemId && subItemId !== 'new' ? 'Edit Group Activity' : 'Add Group Activity'}
        </h1>
      </div>

      <div className="bg-[#1C1C1C] rounded-xl border border-[#3A3530] w-full max-w-4xl overflow-hidden mx-auto">
        <GroupActivityForm initialData={initialData} availableGames={availableGames} onClose={handleClose} onSave={handleSave} />
      </div>
    </div>
  );
};

export default GroupActivityFormPage;
