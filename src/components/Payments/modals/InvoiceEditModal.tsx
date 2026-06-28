import React, { useState } from 'react';
import CloseIcon from '@/assets/icons/CloseIcon';

interface InvoiceRecord {
  id: string;
  customerName: string;
  amountBeforeTax: number;
  taxCollected: string;
  totalAmount: number;
  status: "Paid" | "Pending";
}

interface InvoiceEditModalProps {
  invoice?: InvoiceRecord;
  onClose: () => void;
  onSave: (updatedInvoice: InvoiceRecord) => void;
}

const InvoiceEditModal: React.FC<InvoiceEditModalProps> = ({ invoice, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    codeName: '',
    type: '',
    value: '',
    usage: '',
    associatedUserEvent: '',
      expirationDate: '',
    status: true
  });

  if (!invoice) return null;

  const handleSave = () => {
    // Here you would typically update the invoice with the form data
    // For now, we'll just close the modal
    onSave(invoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[700px]">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-4">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              DISC20APRIL
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center bg-white rounded-full cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Code Name */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Code Name
              </label>
              <input
                type="text"
                value={formData.codeName}
                onChange={(e) => setFormData({...formData, codeName: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-600 bg-white"
                placeholder="DISC20APRIL"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="Discount Code"
              />
            </div>

            {/* Value */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Value
              </label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-600 bg-white"
                placeholder="15% OFF"
              />
            </div>

            {/* Usage */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Usage
              </label>
              <input
                type="text"
                value={formData.usage}
                onChange={(e) => setFormData({...formData, usage: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="10"
              />
            </div>

            {/* Associated User/Event */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Associated User/Event
              </label>
              <input
                type="text"
                value={formData.associatedUserEvent}
                onChange={(e) => setFormData({...formData, associatedUserEvent: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="Event"
              />
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Expiration Date
              </label>
              <input
                type="text"
                value={formData.expirationDate}
                onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                className="px-4 py-3 rounded-lg border border-gray-300 font-roboto text-sm text-gray-400 bg-white"
                placeholder="25/04/2025"
              />
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex flex-col gap-2">
            <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
              Status
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFormData({...formData, status: !formData.status})}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  formData.status ? 'bg-[#005066]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    formData.status ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="font-roboto text-sm text-[#0C0C0C]">
                {formData.status ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[#E1017D] rounded-[10px] text-[#E1017D] font-poppins font-semibold text-base bg-transparent hover:bg-[#E1017D]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base hover:bg-[#c9016f] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditModal;