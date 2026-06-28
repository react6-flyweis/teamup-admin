import React from 'react';

interface ComboItem {
  id?: number;
  pizza: string;
  bevvies: string;
  burger: string;
  welcomeBevvy: string;
  shots: string;
}

interface ComboModalProps {
  combo?: ComboItem;
  onClose: () => void;
  onSave: (combo: Partial<ComboItem>) => void;
}

const ComboModal: React.FC<ComboModalProps> = ({ combo, onClose, onSave }) => {
  const [values, setValues] = React.useState<Partial<ComboItem>>({
    pizza: combo?.pizza || '',
    bevvies: combo?.bevvies || '',
    burger: combo?.burger || '',
    welcomeBevvy: combo?.welcomeBevvy || '',
    shots: combo?.shots || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(values);
  };

  const handleChange = (field: keyof ComboItem, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#F9D2EA] rounded-2xl p-6 w-[683px]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {combo ? `Edit Combo ${combo.id}` : 'Add A New Combo'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            {/* Pizza */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Pizza</label>
              <input
                type="text"
                value={values.pizza}
                onChange={e => handleChange('pizza', e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter pizza details"
              />
            </div>
            {/* Bevvies */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Bevvies</label>
              <input
                type="text"
                value={values.bevvies}
                onChange={e => handleChange('bevvies', e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter bevvies details"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Burger */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Burger</label>
              <input
                type="text"
                value={values.burger}
                onChange={e => handleChange('burger', e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter burger details"
              />
            </div>
            {/* Welcome Bevy */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Welcome BEVY!</label>
              <input
                type="text"
                value={values.welcomeBevvy}
                onChange={e => handleChange('welcomeBevvy', e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
                placeholder="Enter welcome bevvy details"
              />
            </div>
          </div>

          {/* Shots */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Shots!!!</label>
            <input
              type="text"
              value={values.shots}
              onChange={e => handleChange('shots', e.target.value)}
              className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white"
              placeholder="Enter shots details"
            />
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
              {combo ? 'Save Changes' : 'Add Combo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComboModal;
