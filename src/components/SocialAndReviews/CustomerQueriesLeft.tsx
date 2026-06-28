import  { useState } from "react";

const feedbackList = [
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 1,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 2,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 3,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 4,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 5,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 6,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 7,
  },
  {
    name: "Emma Anderson",
    message: "The staff were really Friendly and we had a great time.",
    id: 8,
  },
];

export default function CustomerQueriesLeft() {
  const [activeId, setActiveId] = useState(feedbackList[0].id);

  return (
    <div className="w-[440px] h-[780px] bg-[#F9D2EA] rounded-2xl p-4 flex flex-col gap-4 items-start overflow-scroll">
      {feedbackList.map((fb) => (
        <div
          key={fb.id}
          onClick={() => setActiveId(fb.id)}
          className={
            `flex flex-col px-4 py-4 gap-2 w-[288px] h-[87px] rounded-[8px] cursor-pointer ` +
            (activeId === fb.id
              ? "bg-[#570B39]"
              : "bg-transparent border border-[#570B39]")
          }
        >
          <span
            className={`font-roboto font-medium text-[16px] leading-[19px] ${
              activeId === fb.id ? "text-white" : "text-[#570B39]"
            }`}
            style={{ width: "256px", height: "19px" }}
          >
            {fb.name}
          </span>
          <span
            className={`font-roboto font-normal text-[14px] leading-[16px] ${
              activeId === fb.id ? "text-white" : "text-[#570B39]"
            }`}
            style={{ width: "256px", height: "32px" }}
          >
            {fb.message}
          </span>
        </div>
      ))}
    </div>
  );
}
