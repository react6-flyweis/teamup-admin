import { useState } from "react";

const MAIN_FEEDBACK = {
  name: "Emma Anderson",
  date: "April 9, 2025",
  message:
    "The staff were really friendly and we had a great time whilst our stay, but there was some confusion about our booking time when we arrived. Would appreciate it if this could be smooth from next time.",
};

const PREVIOUS_FEEDBACK = [
  "The staff were really friendly and we had a great time whilst our stay, but...",
  "The staff were really friendly and we had a great time whilst our stay, but...",
  "The staff were really friendly and we had a great time whilst our stay, but...",
];

export default function CustomerQueriesRight() {
  const [reply, setReply] = useState("");

  return (
    <div className="w-full h-[780px] bg-[#F9D2EA] rounded-2xl p-6 flex flex-col">
      {/* Name & date */}
      <div className="mb-2">
        <div className="font-poppins font-bold text-[16px] leading-6 text-[#050505]">
          {MAIN_FEEDBACK.name}
        </div>
        <div className="font-poppins font-medium text-[12px] leading-[18px] text-[#050505]">
          {MAIN_FEEDBACK.date}
        </div>
      </div>
      {/* Feedback highlight */}
      <div className="w-full bg-[#D2D2D2] rounded-[12px] px-4 py-4 my-2">
        <span className="font-poppins font-medium text-[16px] leading-6 text-black block">
          {MAIN_FEEDBACK.message}
        </span>
      </div>
      {/* Reply Section */}
      <div className="mt-6 flex flex-col gap-2">
        <span className="font-poppins font-medium text-[16px] leading-6 text-black">
          Reply
        </span>
        <textarea
          className="w-full min-h-[100px] max-h-[160px] bg-white border border-black rounded-[12px] font-poppins font-medium text-[16px] px-4 py-2 text-black resize-none placeholder:text-[#A4A4A4]"
          placeholder="Add your reply here……"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          style={{ height: "120px" }}
        />
        <div className="flex w-full justify-end mt-2">
          <button
            className="bg-[#E1017D] rounded-[10px] px-5 py-2 font-poppins font-semibold text-[16px] leading-6 text-white"
            style={{ width: 86, height: 40 }}
          >
            Reply
          </button>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-6 border-t border-[#F4A5D5] w-full" />
      {/* Previous Feedback */}
      <div>
        <div className="font-poppins font-medium text-[16px] leading-6 text-black mb-3">
          Previous Feedback
        </div>
        <div className="flex flex-col gap-3">
          {PREVIOUS_FEEDBACK.map((msg, idx) => (
            <div
              key={idx}
              className="bg-[#BBBBBB] rounded-[12px] px-4 py-3 font-poppins font-medium text-[16px] text-black"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
