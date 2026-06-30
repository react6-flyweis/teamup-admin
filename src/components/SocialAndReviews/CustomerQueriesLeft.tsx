import type { FeedbackItem } from "@/hooks/useSocialReviews";

interface CustomerQueriesLeftProps {
  items: FeedbackItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function CustomerQueriesLeft({
  items,
  activeIndex,
  onSelect,
}: CustomerQueriesLeftProps) {
  return (
    <div className="w-[440px] h-[780px] bg-[#F9D2EA] rounded-2xl p-4 flex flex-col gap-4 items-start overflow-y-auto">
      {items.map((fb, idx) => (
        <div
          key={fb._id || fb.customerName + idx}
          onClick={() => onSelect(idx)}
          className={
            `flex flex-col px-4 py-4 gap-2 w-full min-h-[87px] rounded-[8px] cursor-pointer transition-all ` +
            (activeIndex === idx
              ? "bg-[#570B39] text-white"
              : "bg-transparent border border-[#570B39] text-[#570B39]")
          }
        >
          <span
            className="font-roboto font-medium text-[16px] leading-[19px] truncate w-full"
          >
            {fb.customerName}
          </span>
          <span
            className="font-roboto font-normal text-[14px] leading-[16px] line-clamp-2 w-full opacity-90"
          >
            {fb.summary || fb.message}
          </span>
        </div>
      ))}
    </div>
  );
}

