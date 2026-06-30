import StarIcon from "@/assets/icons/StarIcon";
import React from "react";
import type { ReviewsDashboard } from "@/hooks/useSocialReviews";

interface ReviewAndRatingProps {
  reviewsDashboard: ReviewsDashboard;
  onUpdate: (updated: ReviewsDashboard) => void;
  isUpdating?: boolean;
}

const tabs = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

const ReviewAndRating: React.FC<ReviewAndRatingProps> = ({ reviewsDashboard, onUpdate, isUpdating }) => {
  const selected = reviewsDashboard.activeFilter || "daily";

  const handleTabChange = (tabKey: string) => {
    if (isUpdating) return;
    onUpdate({
      ...reviewsDashboard,
      activeFilter: tabKey,
    });
  };

  const filteredCards = (reviewsDashboard.cards || []).filter(
    (card) => card.period === selected && card.isActive
  );

  return (
    <div className="w-full mb-6 px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <span className="font-bold text-white text-2xl font-poppins">
          User Reviews & Rating
        </span>
        <div className="flex bg-[#A3EBFF] rounded-[4px] px-[2px] h-[44px] items-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              disabled={isUpdating}
              onClick={() => handleTabChange(tab.key)}
              className={`transition-colors duration-200 rounded-[4px] px-4 h-[40px] font-poppins font-medium text-[16px] ${
                selected === tab.key
                  ? "bg-[#005066] text-white"
                  : "bg-transparent text-[#333]"
              } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{
                minWidth: 90,
                lineHeight: "24px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center">
        {filteredCards.length === 0 ? (
          <div className="text-gray-400 py-10 font-poppins">
            No reviews available for the {selected} period.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            {filteredCards.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start bg-[#F9D2EA] rounded-[16px] p-6 w-full min-h-[244px]"
                style={{ gap: 10 }}
              >
                {/* Header Row: Avatar + Name + Stars */}
                <div
                  className="flex flex-row items-center gap-2 mb-2"
                  style={{ width: 130, height: 44 }}
                >
                  <img
                    src={review.avatarUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt={review.customerName}
                    className="w-8 h-8 object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/men/32.jpg";
                    }}
                  />
                  <div className="flex flex-col items-start justify-center">
                    <span
                      className="font-manrope font-semibold text-[16px] text-black"
                      style={{ lineHeight: "24px" }}
                    >
                      {review.customerName}
                    </span>
                    <div className="flex flex-row items-center gap-2">
                      {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                        <StarIcon key={i} color="#BFB00D" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Activity name and lane */}
                <div className="flex flex-col gap-1 mb-1" style={{ width: 288 }}>
                  <span className="font-poppins font-bold text-[16px] text-black leading-[24px]">
                    {review.gameName}
                  </span>
                  <span
                    className="font-poppins text-[12px] text-[#8C8C8C] font-medium leading-[18px]"
                    style={{ fontWeight: 500 }}
                  >
                    {review.lane}
                  </span>
                </div>
                {/* Message */}
                <div className="flex flex-col gap-2">
                  <span
                    className="font-poppins text-[16px] text-black leading-[24px]"
                    style={{ fontWeight: 400 }}
                  >
                    &quot;{review.review}&quot;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewAndRating;

