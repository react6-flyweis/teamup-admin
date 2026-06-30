import CustomerQueriesLeft from "./CustomerQueriesLeft";
import CustomerQueriesRight from "./CustomerQueriesRight";
import React, { useState } from "react";
import type { CustomerFeedback } from "@/hooks/useSocialReviews";

interface CustomerQueriesAndFeedbackProps {
  customerFeedback: CustomerFeedback;
  onUpdate: (updated: CustomerFeedback) => void;
  isUpdating?: boolean;
}

export const CustomerQueriesAndFeedback: React.FC<CustomerQueriesAndFeedbackProps> = ({
  customerFeedback,
  onUpdate,
  isUpdating
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = customerFeedback.items || [];
  const activeFeedback = items[activeIndex];

  const handleSaveReply = (index: number, replyText: string) => {
    if (isUpdating) return;
    const updatedItems = items.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          reply: replyText,
          status: "replied"
        };
      }
      return item;
    });

    onUpdate({
      ...customerFeedback,
      items: updatedItems
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          {customerFeedback.title || "Customer Queries and Feedback"}
        </h2>
      </div>
      <div className="flex gap-6">
        <CustomerQueriesLeft
          items={items}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
        {activeFeedback ? (
          <CustomerQueriesRight
            feedback={activeFeedback}
            index={activeIndex}
            previousFeedback={customerFeedback.previousFeedback || []}
            onSaveReply={handleSaveReply}
            isUpdating={isUpdating}
          />
        ) : (
          <div className="w-full h-[780px] bg-[#F9D2EA] rounded-2xl p-6 flex items-center justify-center text-gray-500 font-poppins">
            No query selected.
          </div>
        )}
      </div>
    </div>
  );
};
