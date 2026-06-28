import React from 'react';
import Toggle from '../common/Toggle';
import HorizontalDotsIcon from '../../assets/icons/HorizontalDotsIcon';
import EditPencilIcon from '../../assets/icons/EditIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import Pagination from '../../utils/Pagination';
import type { MenuItem } from '@/pages/Bites';

interface MenuTableProps {
  items: MenuItem[];
  onToggleAvailability: (id: number, availability: boolean) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const MenuTable: React.FC<MenuTableProps> = ({
  items,
  onToggleAvailability,
  onEdit,
  onDelete
}) => {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);

  // Click outside handler for action menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEditModal && 
          !(event.target as Element).closest('.action-menu') && 
          !(event.target as Element).closest('.menu-trigger')) {
        setShowEditModal(false);
        setSelectedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEditModal]);

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#F9D2EA] p-4 grid grid-cols-7 gap-4">
        <div className="font-bold text-black">Image</div>
        <div className="font-bold text-black">Item</div>
        <div className="font-bold text-black">Category</div>
        <div className="font-bold text-black">Sub-category</div>
        <div className="font-bold text-black">Availability</div>
        <div className="font-bold text-black">Description</div>
        <div className="font-bold text-black">Action</div>
      </div>

      {/* Table Body */}
      {items.map((item, index) => (
        <div 
          key={item.id}
          className={`p-4 grid grid-cols-7 gap-4 ${
            index % 2 === 0 ? 'bg-[#FDECF6]' : 'bg-[#FFFBFD]'
          }`}
        >
          <div>
            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
          </div>
          <div className="text-black">{item.name}</div>
          <div className="text-black">{item.category}</div>
          <div className="text-black">{item.subCategory}</div>
          <div className="flex items-center">
            <Toggle
              checked={item.availability}
              onChange={(checked) => onToggleAvailability(item.id, checked)}
              activeColor="#14AE5C"
              inactiveColor="#EC221F"
              activeText="Available"
              inactiveText="Out of Stock"
            />
          </div>
          <div className="text-black">{item.description}</div>
          <div className="relative group">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (selectedItem?.id === item.id) {
                  setShowEditModal(false);
                  setSelectedItem(null);
                } else {
                  setSelectedItem(item);
                  setShowEditModal(true);
                }
              }}
              className="menu-trigger p-1 hover:bg-gray-100 rounded relative"
            >
              <div className="cursor-pointer">
                <HorizontalDotsIcon />
              </div>
            </button>
            {showEditModal && selectedItem?.id === item.id && (
              <div 
                className={`action-menu absolute w-[122px] bg-white border border-[#570B39] shadow-lg z-50 
                  ${index >= items.length - 2 ? 'bottom-full right-0 mb-1 rounded-[12px_12px_12px_4px]' : 'top-full right-0 mt-1 rounded-[4px_12px_12px_12px]'}`}
              >
                <button 
                  className="flex items-center w-full px-6 py-3 gap-2 hover:bg-gray-50 text-black border-b border-[#898989]"
                  onClick={() => onEdit(item)}
                >
                  <EditPencilIcon size={20} color="#0A0A0A" />
                  <span className="font-bold">Edit</span>
                </button>
                <button 
                  className="flex items-center w-full px-6 py-3 gap-2 hover:bg-gray-50 text-black"
                  onClick={() => onDelete(item)}
                >
                  <TrashIcon size={20} color="#0A0A0A" />
                  <span className="font-bold">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-end p-4">
        <Pagination 
          currentPage={1}
          totalPages={15}
          onPageChange={(page: number) => console.log('Page changed:', page)}
        />
      </div>
    </div>
  );
};

export default MenuTable;
