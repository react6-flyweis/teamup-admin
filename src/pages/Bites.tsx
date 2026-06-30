import { useState } from 'react';
import MenuTable from '../components/Bites/MenuTable';
import AddEditFoodItemsModal from '../components/Bites/AddEditFoodItemsModal';
import ComboCard from '../components/Bites/ComboCard';
import ComboModal from '../components/Bites/ComboModal';
import BitesHeaderBanner from '../components/Bites/BitesHeaderBanner';

import {
  useFoodCategoriesQuery,
  useFoodItemsQuery,
  useCreateFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
  useDrinksQuery,
  useCreateDrinkMutation,
  useUpdateDrinkMutation,
  useDeleteDrinkMutation,
  useFoodDrinksContentQuery,
  useUpdateFoodDrinksContentMutation
} from '../hooks/useBites';
import type { FoodComboItem } from '../hooks/useBites';

export interface MenuItem {
  id: string;
  image: string;
  name: string;
  category: string;
  subCategory: string;
  availability: boolean;
  description: string;
  kcal?: string;
  price?: number;
  slug: string;
  isDrink?: boolean;
  categoryId?: string;
  isAlcoholic?: boolean;
}

export interface ComboItem {
  id?: number;
  pizza: string;
  bevvies: string;
  burger: string;
  welcomeBevvy: string;
  shots: string;
}

const Bites = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showComboModal, setShowComboModal] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboItem | null>(null);

  // Queries
  const { data: categories = [], isLoading: categoriesLoading } = useFoodCategoriesQuery();

  const { data: foodItems = [], isLoading: foodItemsLoading } = useFoodItemsQuery();
  const createFoodItemMutation = useCreateFoodItemMutation();
  const updateFoodItemMutation = useUpdateFoodItemMutation();
  const deleteFoodItemMutation = useDeleteFoodItemMutation();

  const { data: drinks = [], isLoading: drinksLoading } = useDrinksQuery();
  const createDrinkMutation = useCreateDrinkMutation();
  const updateDrinkMutation = useUpdateDrinkMutation();
  const deleteDrinkMutation = useDeleteDrinkMutation();

  const { data: foodDrinksContent, isLoading: contentLoading } = useFoodDrinksContentQuery();
  const updateContentMutation = useUpdateFoodDrinksContentMutation();

  // Loading indicator
  if (categoriesLoading || foodItemsLoading || drinksLoading || contentLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E1017D]"></div>
      </div>
    );
  }

  // Map backend items to unified UI model
  const mappedFoodItems: MenuItem[] = foodItems.map(item => {
    const cat = categories.find(c => c._id === item.categoryId);
    return {
      id: item._id,
      image: item.imageUrl || '',
      name: item.name,
      category: cat ? cat.name : 'Food',
      subCategory: item.tags?.[0] || '---',
      availability: item.isActive,
      description: item.description || '',
      kcal: item.calories || '',
      price: item.price,
      slug: item.slug,
      isDrink: false,
      categoryId: item.categoryId
    };
  });

  const mappedDrinks: MenuItem[] = drinks.map(item => {
    const formatDrinkCategory = (cat: string) => {
      if (!cat) return 'Drinks';
      if (cat.toLowerCase() === 'beers') return 'Beer';
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    return {
      id: item._id,
      image: item.imageUrl || '',
      name: item.name,
      category: 'Drinks',
      subCategory: formatDrinkCategory(item.category),
      availability: item.isActive,
      description: item.description || '',
      price: item.price,
      slug: item.slug,
      isDrink: true,
      isAlcoholic: item.isAlcoholic
    };
  });

  const items = [...mappedFoodItems, ...mappedDrinks];

  // Map site content combos
  const comboSectionItems = foodDrinksContent?.content?.data?.foodCombos?.items || [];
  const combos: ComboItem[] = comboSectionItems.map((item: FoodComboItem, idx: number) => ({
    id: item.order || (idx + 1),
    pizza: item.pizza,
    bevvies: item.bevvies,
    burger: item.burger,
    welcomeBevvy: item.welcomeBevy,
    shots: item.shots
  }));

  const handleToggleAvailability = (id: string, availability: boolean) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (item.isDrink) {
      updateDrinkMutation.mutate({
        slug: item.slug,
        payload: { isActive: availability }
      });
    } else {
      updateFoodItemMutation.mutate({
        slug: item.slug,
        payload: { isActive: availability }
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (item: MenuItem) => {
    if (item.isDrink) {
      deleteDrinkMutation.mutate(item.slug);
    } else {
      deleteFoodItemMutation.mutate(item.slug);
    }
  };

  const handleSave = (updatedItem: Partial<MenuItem>) => {
    const isNew = !selectedItem;
    const cleanSlug = updatedItem.name
      ? updatedItem.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
      : '';

    if (updatedItem.category === 'Drinks') {
      const categorySlug = (updatedItem.subCategory || 'cocktails').toLowerCase().replace(' ', '-');
      const payload = {
        name: updatedItem.name || '',
        slug: isNew ? cleanSlug : selectedItem.slug,
        category: categorySlug,
        description: updatedItem.description || '',
        price: updatedItem.price || 0,
        isAlcoholic: updatedItem.isAlcoholic || false,
        imageUrl: updatedItem.image || '',
        isActive: true,
        order: 1
      };

      if (isNew) {
        createDrinkMutation.mutate(payload);
      } else {
        updateDrinkMutation.mutate({
          slug: selectedItem.slug,
          payload
        });
      }
    } else {
      const categoryName = updatedItem.category || 'Food';
      const matchedCat = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      const categoryId = matchedCat ? matchedCat._id : (categories[0]?._id || '');

      const payload = {
        categoryId,
        name: updatedItem.name || '',
        slug: isNew ? cleanSlug : selectedItem.slug,
        description: updatedItem.description || '',
        calories: updatedItem.kcal || '',
        price: updatedItem.price || 0,
        tags: updatedItem.subCategory ? [updatedItem.subCategory] : [],
        imageUrl: updatedItem.image || '',
        isActive: true,
        order: 1
      };

      if (isNew) {
        createFoodItemMutation.mutate(payload);
      } else {
        updateFoodItemMutation.mutate({
          slug: selectedItem.slug,
          payload
        });
      }
    }

    setShowModal(false);
    setSelectedItem(null);
  };

  const handleEditCombo = (id: number) => {
    const combo = combos.find(c => c.id === id);
    if (combo) {
      setSelectedCombo(combo);
      setShowComboModal(true);
    }
  };

  const handleSaveCombo = (updatedCombo: Partial<ComboItem>) => {
    let newItems: FoodComboItem[] = [];

    if (selectedCombo) {
      newItems = comboSectionItems.map((item: FoodComboItem, idx: number) => {
        const currentId = item.order || (idx + 1);
        if (currentId === selectedCombo.id) {
          return {
            ...item,
            pizza: updatedCombo.pizza || item.pizza,
            bevvies: updatedCombo.bevvies || item.bevvies,
            burger: updatedCombo.burger || item.burger,
            welcomeBevy: updatedCombo.welcomeBevvy || item.welcomeBevy,
            shots: updatedCombo.shots || item.shots
          };
        }
        return item;
      });
    } else {
      const newOrder = comboSectionItems.length + 1;
      const newComboItem: FoodComboItem = {
        title: `Combo ${newOrder}`,
        subtitle: "heres what is included",
        pizza: updatedCombo.pizza || '',
        bevvies: updatedCombo.bevvies || '',
        burger: updatedCombo.burger || '',
        welcomeBevy: updatedCombo.welcomeBevvy || '',
        shots: updatedCombo.shots || '',
        order: newOrder,
        isActive: true
      };
      newItems = [...comboSectionItems, newComboItem];
    }

    updateContentMutation.mutate({
      data: {
        foodCombos: {
          title: foodDrinksContent?.content?.data?.foodCombos?.title || "Our Food Combos",
          items: newItems
        }
      }
    });

    setShowComboModal(false);
    setSelectedCombo(null);
  };

  const isSavingItem = createFoodItemMutation.isPending || updateFoodItemMutation.isPending || createDrinkMutation.isPending || updateDrinkMutation.isPending;
  const isSavingCombo = updateContentMutation.isPending;
  const isProcessing = deleteFoodItemMutation.isPending || deleteDrinkMutation.isPending || (updateFoodItemMutation.isPending && !showModal) || (updateDrinkMutation.isPending && !showModal);

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      {/* Banner Section */}
      <BitesHeaderBanner />

      {/* Menu Items Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Menu Items & Pricing</h1>
          <button
            onClick={() => {
              setSelectedItem(null);
              setShowModal(true);
            }}
            className="bg-[#E1017D] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#c9016f] transition-colors"
          >
            Add Item
          </button>
        </div>

        {/* Table Section */}
        <MenuTable
          items={items}
          onToggleAvailability={handleToggleAvailability}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isProcessing={isProcessing}
        />
      </div>

      {/* Food Combo Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Our Food Combo</h2>
          <button
            onClick={() => {
              setSelectedCombo(null);
              setShowComboModal(true);
            }}
            className="bg-[#E1017D] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#c9016f] transition-colors"
          >
            Add A New Combo
          </button>
        </div>

        <div className="flex gap-5 flex-wrap justify-start">
          {combos.map(combo => (
            <ComboCard
              key={combo.id}
              combo={combo}
              onEdit={handleEditCombo}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Menu Item Modal */}
      {showModal && (
        <AddEditFoodItemsModal
          onClose={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onSave={handleSave}
          isSaving={isSavingItem}
        />
      )}

      {/* Add/Edit Combo Modal */}
      {showComboModal && (
        <ComboModal
          combo={selectedCombo || undefined}
          onClose={() => {
            setShowComboModal(false);
            setSelectedCombo(null);
          }}
          onSave={handleSaveCombo}
          isSaving={isSavingCombo}
        />
      )}
    </div>
  );
};

export default Bites;