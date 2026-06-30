import { useState, useEffect } from "react";
import type { FeedbackItem, PreviousFeedbackItem } from "@/hooks/useSocialReviews";

interface CustomerQueriesRightProps {
  feedback: FeedbackItem;
  index: number;
  previousFeedback: PreviousFeedbackItem[];
  onSaveReply: (index: number, replyText: string) => void;
  isUpdating?: boolean;
}

export default function CustomerQueriesRight({
  feedback,
  index,
  previousFeedback,
  onSaveReply,
  isUpdating,
}: CustomerQueriesRightProps) {
  const [reply, setReply] = useState("");

  useEffect(() => {
    setReply(feedback.reply || "");
  }, [feedback]);

  const handleReplySubmit = () => {
    if (!reply.trim() || isUpdating) return;
    onSaveReply(index, reply.trim());
  };

  return (
    <div className="w-full h-[780px] bg-[#F9D2EA] rounded-2xl p-6 flex flex-col overflow-y-auto">
      {/* Name & date */}
      <div className="mb-2">
        <div className="font-poppins font-bold text-[16px] leading-6 text-[#050505]">
          {feedback.customerName}
        </div>
        <div className="font-poppins font-medium text-[12px] leading-[18px] text-[#555555]">
          {feedback.date}
        </div>
      </div>
      {/* Feedback highlight */}
      <div className="w-full bg-[#E5B5D5] rounded-[12px] px-4 py-4 my-2 border border-[#E9A7CE]">
        <span className="font-poppins font-medium text-[16px] leading-6 text-black block">
          {feedback.message}
        </span>
      </div>
      {/* Reply Section */}
      <div className="mt-6 flex flex-col gap-2">
        <span className="font-poppins font-medium text-[16px] leading-6 text-black">
          Reply
        </span>
        {feedback.reply ? (
          <div className="w-full bg-[#FCF0F7] rounded-[12px] px-4 py-4 border border-[#E9A7CE]/50 text-black font-poppins font-medium text-[16px] min-h-[60px]">
            {feedback.reply}
          </div>
        ) : (
          <>
            <textarea
              className="w-full min-h-[100px] max-h-[160px] bg-white border border-[#E1017D]/30 focus:border-[#E1017D] outline-none rounded-[12px] font-poppins font-medium text-[16px] px-4 py-2 text-black resize-none placeholder:text-[#A4A4A4]"
              placeholder="Add your reply here……"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              style={{ height: "120px" }}
            />
            <div className="flex w-full justify-end mt-2">
              <button
                onClick={handleReplySubmit}
                disabled={!reply.trim() || isUpdating}
                className={`rounded-[10px] px-5 py-2 font-poppins font-semibold text-[16px] leading-6 text-white transition-all
                  ${
                    reply.trim() && !isUpdating
                      ? "bg-[#E1017D] hover:bg-[#B71778] cursor-pointer"
                      : "bg-[#e2a8cc] text-[#A4A4A4] cursor-not-allowed"
                  }
                `}
                style={{ width: 86, height: 40 }}
              >
                {isUpdating ? "Saving" : "Reply"}
              </button>
            </div>
          </>
        )}
      </div>
      {/* Divider */}
      <hr className="my-6 border-t border-[#F4A5D5] w-full" />
      {/* Previous Feedback */}
      <div>
        <div className="font-poppins font-medium text-[16px] leading-6 text-black mb-3">
          Previous Feedback
        </div>
        <div className="flex flex-col gap-3">
          {previousFeedback.length === 0 ? (
            <div className="text-gray-500 font-poppins text-sm italic">
              No previous feedback found.
            </div>
          ) : (
            previousFeedback.map((fb, idx) => (
              <div
                key={idx}
                className="bg-[#EFC4DE] rounded-[12px] px-4 py-3 font-poppins font-medium text-[14px] text-black border border-[#ECB2DA]"
              >
                <div className="text-[11px] text-[#702052] font-semibold mb-1">{fb.date}</div>
                <div>{fb.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

