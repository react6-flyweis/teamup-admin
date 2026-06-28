import React from "react";
import ClockIcon from "@/assets/icons/ClockIcon";
import CalendarIcon from "@/assets/icons/CalendarIcon";

interface SpecialDealModalProps {
  open: boolean;
  onClose: () => void;
  deal?: {
    title?: string;
    startDate?: string;
    endDate?: string;
    timeFrom?: string;
    timeTo?: string;
    discount?: string;
    minOrder?: string;
  };
  onSave?: (deal: Partial<SpecialDealModalProps["deal"]>) => void;
}

const SpecialDealModal: React.FC<SpecialDealModalProps> = ({
  open,
  onClose,
  deal,
  onSave = () => {},
}) => {
  const [title, setTitle] = React.useState(deal?.title || "");
  const [startDate, setStartDate] = React.useState(deal?.startDate || "");
  const [endDate, setEndDate] = React.useState(deal?.endDate || "");
  const [timeFrom, setTimeFrom] = React.useState(deal?.timeFrom || "");
  const [timeTo, setTimeTo] = React.useState(deal?.timeTo || "");
  const [discount, setDiscount] = React.useState(deal?.discount || "");
  const [minOrder, setMinOrder] = React.useState(deal?.minOrder || "");

  React.useEffect(() => {
    if (deal) {
      setTitle(deal.title || "");
      setStartDate(deal.startDate || "");
      setEndDate(deal.endDate || "");
      setTimeFrom(deal.timeFrom || "");
      setTimeTo(deal.timeTo || "");
      setDiscount(deal.discount || "");
      setMinOrder(deal.minOrder || "");
    }
  }, [deal, open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      startDate,
      endDate,
      timeFrom,
      timeTo,
      discount,
      minOrder,
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#F9D2EA] rounded-2xl p-6 w-[683px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black font-poppins">
            Create Special Deal Offer
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white rounded-full flex items-center justify-center border hover:bg-gray-100 transition"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M15 5L5 15M5 5L15 15" stroke="#000" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <hr className="border-black mb-6" />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-1 font-poppins">
              Promotion Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
              placeholder="Promotion Name"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative">
              <label className="block text-xs font-medium text-black mb-1 font-poppins">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 pr-12 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
                placeholder="Start Date"
                autoComplete="off"
              />
              <span className="absolute right-3 bottom-3 pointer-events-none">
                <CalendarIcon />
              </span>
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-black mb-1 font-poppins">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 pr-12 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
                placeholder="End Date"
                autoComplete="off"
              />
              <span className="absolute right-3 bottom-3 pointer-events-none">
                <CalendarIcon />
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative">
              <label className="block text-xs font-medium text-black mb-1 font-poppins">
                Time Range (From)
              </label>
              <input
                type="time"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="w-full p-3 pr-12 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
                placeholder="From"
                autoComplete="off"
              />
              <span className="absolute right-3 bottom-3 pointer-events-none">
                <ClockIcon />
              </span>
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-black mb-1 font-poppins">
                Time Range (To)
              </label>
              <input
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="w-full p-3 pr-12 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
                placeholder="To"
                autoComplete="off"
              />
              <span className="absolute right-3 bottom-3 pointer-events-none">
                <ClockIcon />
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-black mb-1 font-poppins">
                Discount Type
              </label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
                placeholder="e.g. 10%"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-black mb-1 font-poppins">
                Minimum Order
              </label>
              <input
                type="text"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full p-3 border border-[#AEB4C2] rounded-lg bg-white font-open-sans text-base text-[#333]"
                placeholder="$0"
              />
            </div>
          </div>
          <div className="flex justify-end gap-6 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#7E0B0B] text-[#7E0B0B] rounded-lg font-poppins font-semibold text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#E1017D] text-white rounded-lg font-poppins font-semibold text-base"
            >
              Save Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialDealModal;
