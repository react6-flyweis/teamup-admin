import React, { useState } from "react";

interface ContactEntry {
  id: number;
  name: string;
  enquiryType: string;
  email: string;
  phoneNo: string;
  comment: string;
}

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (replyData: any) => void;
  contactData: ContactEntry;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
  open,
  onClose,
  onSend,
  contactData,
}) => {
  const [reply, setReply] = useState("");

  if (!open) return null;

  const handleSend = () => {
    onSend({
      contactId: contactData.id,
      reply: reply,
    });
    setReply("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-[#F9D2EA] rounded-2xl p-6 w-[97vw] max-w-[683px] max-h-[629px] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] leading-[33px] font-bold font-poppins text-black">
            Reply
          </h2>
          <button
            className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="transform rotate-45">
              <path d="M10 2L10 18M2 10L18 10" stroke="#000" strokeWidth="1" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <hr className="border-black mb-6" />

        {/* Form Content */}
        <div className="space-y-4">
          {/* First Row - Name and Enquiry Type */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="block text-xs leading-[18px] font-medium text-black font-poppins mb-1">
                Name
              </label>
              <input
                type="text"
                value={contactData.name}
                readOnly
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#AEB4C2] text-[#333333]"
                style={{ fontFamily: "Open Sans" }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs leading-[18px] font-medium text-black font-poppins mb-1">
                Enquiry Type
              </label>
              <input
                type="text"
                value={contactData.enquiryType}
                readOnly
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#AEB4C2] text-[#333333]"
                style={{ fontFamily: "Open Sans" }}
              />
            </div>
          </div>

          {/* Second Row - Email and Phone No */}
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="block text-xs leading-[18px] font-medium text-black font-poppins mb-1">
                Email
              </label>
              <input
                type="email"
                value={contactData.email}
                readOnly
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#AEB4C2] text-[#333333]"
                style={{ fontFamily: "Open Sans" }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs leading-[18px] font-medium text-black font-poppins mb-1">
                Phone No
              </label>
              <input
                type="text"
                value={contactData.phoneNo}
                readOnly
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#AEB4C2] text-[#333333]"
                style={{ fontFamily: "Open Sans" }}
              />
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs leading-[18px] font-medium text-black font-poppins mb-1">
              Comment
            </label>
            <div className="w-full min-h-[98px] px-4 py-3 rounded-lg bg-white border border-[#AEB4C2] text-[#333333]">
              <div className="px-4">
                <p className="text-base leading-6" style={{ fontFamily: "Open Sans" }}>
                  {contactData.comment}
                </p>
              </div>
            </div>
          </div>

          {/* Reply */}
          <div>
            <label className="block text-xs leading-[18px] font-medium text-black font-poppins mb-1">
              Reply
            </label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Enter your reply here..."
              className="w-full h-[98px] px-4 py-3 rounded-lg bg-white border border-[#AEB4C2] text-[#333333] resize-none"
              style={{ fontFamily: "Open Sans" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 h-10 border border-[#7E0B0B] rounded-[10px] text-[#7E0B0B] font-semibold text-base font-poppins hover:bg-[#7E0B0B] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-5 py-2 h-10 bg-[#E1017D] rounded-[10px] text-white font-semibold text-base font-poppins hover:bg-[#c0016a] transition-colors"
          >
            Send reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
