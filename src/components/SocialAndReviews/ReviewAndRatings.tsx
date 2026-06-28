import StarIcon from "@/assets/icons/StarIcon";
import React, { useState } from "react";

// Dummy review data
const reviews = Array(6).fill({
  user: "John Smith",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  activity: "Axe Throwing",
  lane: "Lane 2",
  rating: 5,
  message:
    "Amazing experience! I had so much fun playing Axe Throwing with my friends. We will visit again soon!",
});

const tabs = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

const ReviewAndRating: React.FC = () => {
  const [selected, setSelected] = useState("daily");

  return (
    <div className="w-full mb-6  px-4 ">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <span className="font-bold text-white text-2xl font-poppins">
          User Reviews & Rating
        </span>
        <div className="flex bg-[#A3EBFF] rounded-[4px] px-[2px] h-[44px] items-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelected(tab.key)}
              className={`transition-colors duration-200 rounded-[4px] px-4 h-[40px] font-poppins font-medium text-[16px] ${
                selected === tab.key
                  ? "bg-[#005066] text-white"
                  : "bg-transparent text-[#333]"
              }`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start bg-[#F9D2EA] rounded-[16px] p-6 w-full  min-h-[244px]"
              style={{ gap: 10 }}
            >
              {/* Header Row: Avatar + Name + Stars */}
              <div
                className="flex flex-row items-center gap-2 mb-2"
                style={{ width: 130, height: 44 }}
              >
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <div className="flex flex-col items-start justify-center">
                  <span
                    className="font-manrope font-semibold text-[16px] text-black"
                    style={{ lineHeight: "24px" }}
                  >
                    {review.user}
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon key={i} color="#BFB00D" />
                    ))}
                  </div>
                </div>
              </div>
              {/* Activity name and lane */}
              <div className="flex flex-col gap-1 mb-1" style={{ width: 288 }}>
                <span className="font-poppins font-bold text-[16px] text-black leading-[24px]">
                  {review.activity}
                </span>
                <span
                  className="font-poppins text-[12px] text-[#C8C8C8] font-medium leading-[18px]"
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
                  &quot;{review.message}&quot;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewAndRating;
