import { useState } from 'react';
import MenuTable from '../components/Bites/MenuTable';
import AddEditFoodItemsModal from '../components/Bites/AddEditFoodItemsModal';
import ComboCard from '../components/Bites/ComboCard';
import ComboModal from '../components/Bites/ComboModal';
import BitesHeaderBanner from '../components/Bites/BitesHeaderBanner';

// Import images
import BloodyMaryImage from '../assets/Bloody Mary.png';
import BurgerImage from '../assets/Fried Chicken Burger.png';
import TaterTotsImage from '../assets/Tater Tots.png';
import CoronaImage from '../assets/Corona.png';
export interface MenuItem {
  id: number;
  image: string;
  name: string;
  category: string;
  subCategory: string;
  availability: boolean;
  description: string;
  kcal?: string;
}


const initialItems: MenuItem[] = [
  {
    id: 1,
    image: BloodyMaryImage,
    name: 'Bloody Mary',
    category: 'Cocktails',
    subCategory: '---',
    availability: true,
    description: 'Lorem Ipsum is simply dummy...'
  },
  {
    id: 2,
    image: BurgerImage,
    name: 'Fried Chicken Burger',
    category: 'Food',
    subCategory: 'Burger',
    availability: true,
    description: 'Lorem Ipsum is simply dummy...'
  },
  {
    id: 3,
    image: TaterTotsImage,
    name: 'Tater Tots',
    category: 'Food Combos',
    subCategory: 'On The Side',
    availability: false,
    description: 'Lorem Ipsum is simply dummy...'
  },
  {
    id: 4,
    image: CoronaImage,
    name: 'Corona',
    category: 'Beer',
    subCategory: '---',
    availability: true,
    description: 'Lorem Ipsum is simply dummy...'
  }
];

interface ComboItem {
  id: number;
  pizza: string;
  bevvies: string;
  burger: string;
  welcomeBevvy: string;
  shots: string;
}

const Bites = () => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [combos, setCombos] = useState<ComboItem[]>([
    {
      id: 1,
      pizza: "The Buffalo Blaze",
      bevvies: "2 Bevvies Per Person\nCocktail Upgrade Available",
      burger: "Big Boss Burger",
      welcomeBevvy: "Prosecco, Wine, Or\nBottled Beer On Arrival",
      shots: "X"
    },
    {
      id: 2,
      pizza: "Your Choice (1 pc)",
      bevvies: "3 Bevvies Per Person\nCocktail Upgrade Available",
      burger: "Your Choice (2 pcs)",
      welcomeBevvy: "Prosecco, Wine, Or\nBottled Beer On Arrival",
      shots: "1 Shot Per Person"
    },
    {
      id: 3,
      pizza: "Your Choice (2 pcs)",
      bevvies: "4 Bevvies Per Person\nCocktail Upgrade Available",
      burger: "Your Choice (2 pcs)",
      welcomeBevvy: "Prosecco, Wine, Or\nBottled Beer On Arrival",
      shots: "1 Shot Per Person"
    }
  ]);

  const [showComboModal, setShowComboModal] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboItem | null>(null);

  const handleToggleAvailability = (id: number, availability: boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, availability } : item
    ));
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (item: MenuItem) => {
    setItems(items.filter(i => i.id !== item.id));
  };

  const handleSave = (updatedItem: Partial<MenuItem>) => {
    if (selectedItem) {
      // Editing existing item
      setItems(items.map(item => 
        item.id === selectedItem.id ? { ...item, ...updatedItem } : item
      ));
    } else {
      // Adding new item
      const newItem: MenuItem = {
        id: Math.max(...items.map(i => i.id)) + 1,
        image: '', // You would handle image upload here
        availability: true,
        ...updatedItem
      } as MenuItem;
      setItems([...items, newItem]);
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
    if (selectedCombo) {
      setCombos(combos.map(combo =>
        combo.id === selectedCombo.id ? { ...combo, ...updatedCombo } : combo
      ));
    } else {
      const newCombo = {
        id: Math.max(...combos.map(c => c.id)) + 1,
        ...updatedCombo
      } as ComboItem;
      setCombos([...combos, newCombo]);
    }
    setShowComboModal(false);
    setSelectedCombo(null);
  };

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
        />
      )}
    </div>
  );
};

export default Bites;