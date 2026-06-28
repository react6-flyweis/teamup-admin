import React from 'react';
import { Dropdown } from '../common/Dropdown';
import type { MenuItem } from '@/pages/Bites';

interface AddEditModalProps {
  onClose: () => void;
  item?: MenuItem | null;
  onSave: (item: Partial<MenuItem>) => void;
}

const AddEditFoodItemsModal: React.FC<AddEditModalProps> = ({
  onClose,
  item,
  onSave
}) => {
  const [category, setCategory] = React.useState(item?.category || '');
  const [subCategory, setSubCategory] = React.useState(item?.subCategory || '');
  const [name, setName] = React.useState(item?.name || '');
  const [kcal, setKcal] = React.useState(item?.kcal || '');
  const [description, setDescription] = React.useState(item?.description || '');
  const [image, setImage] = React.useState(item?.image || '');

  const categories = ['Food', 'Drinks', 'Food Combos'];
  const subCategories = category === 'Food Combos' ? ['Burger', 'Pizza', 'Pasta', 'On The Side'] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      category,
      subCategory,
      name,
      kcal,
      description,
      image
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="bg-[#F9D2EA] rounded-2xl p-6 w-[683px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {item ? 'Edit Food Item' : 'Add New Food'}
          </h2>
          <button 
            onClick={onClose}
            className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M15 5L5 15M5 5L15 15" stroke="#000" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
        <hr className="border-black mb-6" />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category and Sub-category row */}
          <div className="grid grid-cols-2 gap-5">
            <div className='w-full'>
              <label className="block text-sm font-medium text-black mb-1">Category</label>
              <Dropdown
                options={categories}
                value={category}
                onChange={setCategory}
                placeholder="Select Category"
                
              />
            </div>
            {category === 'Food Combos' && (
              <div>
                <label className="block text-sm font-medium text-black mb-1">Sub-category</label>
                <Dropdown
                  options={subCategories}
                  value={subCategory}
                  onChange={setSubCategory}
                  placeholder="Select Sub-category"
                />
              </div>
            )}
          </div>

          {/* Name and Kcal row */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Item Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Kcal</label>
              <input
                type="text"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter calories"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-[#AEB4C2] rounded-lg h-[72px] bg-white"
              placeholder="Enter description..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Item Image (optional)</label>
            <div className="border border-dashed border-black rounded-lg p-4 text-center bg-white">
              {image ? (
                <div className="flex flex-col items-center gap-4">
                  <img src={image} alt={name} className="w-auto h-32 rounded-lg object-cover" />
                  <button
                    type="button"
                    className="px-5 py-2 border border-[#E1017D] text-[#E1017D] rounded-lg bg-white"
                    onClick={() => setImage('')}
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 ">
                  <span className="text-black">Upload your photo here</span>
                  <button
                    type="button"
                    className="px-5 py-2 border border-[#E1017D] text-[#E1017D] rounded-lg bg-white"
                    onClick={() => {
                      // TODO: Implement file upload
                      // For now, let's just simulate it
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            if (e.target?.result) {
                              setImage(e.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                  >
                    Select Photo
                  </button>
                  <span className="text-xs text-gray-600">
                    Supported file format PNG, JPEG, JPG
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#7E0B0B] text-[#7E0B0B] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#E1017D] text-white rounded-lg"
            >
              {item ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditFoodItemsModal;
