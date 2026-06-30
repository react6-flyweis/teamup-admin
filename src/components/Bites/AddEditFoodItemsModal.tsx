import React from 'react';
import { Dropdown } from '../common/Dropdown';
import type { MenuItem } from '@/pages/Bites';

interface AddEditModalProps {
  onClose: () => void;
  item?: MenuItem | null;
  onSave: (item: Partial<MenuItem>) => void;
  isSaving?: boolean;
}

const AddEditFoodItemsModal: React.FC<AddEditModalProps> = ({
  onClose,
  item,
  onSave,
  isSaving = false
}) => {
  const [category, setCategory] = React.useState(item?.isDrink ? 'Drinks' : (item?.category || ''));
  const [subCategory, setSubCategory] = React.useState(item?.subCategory || '');
  const [name, setName] = React.useState(item?.name || '');
  const [kcal, setKcal] = React.useState(item?.kcal || '');
  const [description, setDescription] = React.useState(item?.description || '');
  const [image, setImage] = React.useState(item?.image || '');
  const [price, setPrice] = React.useState(item?.price !== undefined ? String(item.price) : '');
  const [isAlcoholic, setIsAlcoholic] = React.useState(item?.isAlcoholic || false);

  const categories = ['Food', 'Drinks', 'Food Combos'];
  const subCategories = 
    category === 'Food Combos' || category === 'Food'
      ? ['Burger', 'Pizza', 'Pasta', 'On The Side']
      : category === 'Drinks'
      ? ['Cocktails', 'Beers', 'Draught', 'Mocktails', 'Soft-drinks', 'Shots', 'Wine', 'Other']
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      category,
      subCategory,
      name,
      kcal,
      description,
      image,
      price: price ? parseFloat(price) : 0,
      isAlcoholic
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
            {item ? (item.isDrink ? 'Edit Drink Item' : 'Edit Food Item') : 'Add New Item'}
          </h2>
          <button 
            onClick={onClose}
            disabled={isSaving}
            className="w-6 h-6 bg-white rounded-full flex items-center justify-center disabled:opacity-50"
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
                onChange={(val) => {
                  setCategory(val);
                  setSubCategory('');
                }}
                placeholder="Select Category"
              />
            </div>
            {(category === 'Food Combos' || category === 'Food' || category === 'Drinks') && (
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  {category === 'Drinks' ? 'Drink Category' : 'Sub-category'}
                </label>
                <Dropdown
                  options={subCategories}
                  value={subCategory}
                  onChange={setSubCategory}
                  placeholder={category === 'Drinks' ? 'Select Drink Category' : 'Select Sub-category'}
                />
              </div>
            )}
          </div>

          {/* Name and Price row */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Item Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Price (£)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Kcal or IsAlcoholic row */}
          {category === 'Drinks' ? (
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isAlcoholic"
                checked={isAlcoholic}
                onChange={(e) => setIsAlcoholic(e.target.checked)}
                className="w-5 h-5 accent-[#E1017D] rounded border-[#AEB4C2]"
              />
              <label htmlFor="isAlcoholic" className="text-base font-semibold text-black cursor-pointer">
                Alcoholic Drink
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-black mb-1">Kcal (Calories)</label>
              <input
                type="text"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter calories (e.g. 450 kcal)"
              />
            </div>
          )}

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
                    disabled={isSaving}
                    className="px-5 py-2 border border-[#E1017D] text-[#E1017D] rounded-lg bg-white disabled:opacity-50"
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
                    disabled={isSaving}
                    className="px-5 py-2 border border-[#E1017D] text-[#E1017D] rounded-lg bg-white disabled:opacity-50"
                    onClick={() => {
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
              disabled={isSaving}
              className="px-5 py-2 border border-[#7E0B0B] text-[#7E0B0B] rounded-lg disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-[#E1017D] text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              )}
              {isSaving ? 'Saving...' : (item ? 'Save Changes' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditFoodItemsModal;
