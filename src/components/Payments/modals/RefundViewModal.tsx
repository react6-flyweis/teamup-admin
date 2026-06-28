import React from 'react';
import CloseIcon from '@/assets/icons/CloseIcon';

interface RefundRequest {
  id: string;
  userName: string;
  eventBooking: string;
  amountPaid: number;
  refundAmount: number;
  reason: string;
  status: "Approved" | "Pending" | "Rejected";
}

interface RefundViewModalProps {
  request?: RefundRequest;
  onClose: () => void;
  onApprove: () => void;
}

const RefundViewModal: React.FC<RefundViewModalProps> = ({ request, onClose, onApprove }) => {
  if (!request) return null;

  // Generate user request message based on refund data
  const generateUserRequest = () => {
    switch (request.reason) {
      case "Lane Malfunction":
        return `Can you please add 2 more people in the ${request.eventBooking}`;
      case "Partial Cancellation":
        return `Request partial refund for ${request.eventBooking} due to reduced party size`;
      case "Event Cancelled":
        return `Full refund requested for cancelled ${request.eventBooking}`;
      case "Pricing Adjustment":
        return `Price adjustment request for ${request.eventBooking}`;
      case "No Show By Host":
        return `Refund request due to host no-show for ${request.eventBooking}`;
      default:
        return `Refund request for ${request.eventBooking} - ${request.reason}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[581px]">
        <div className="flex flex-col gap-7">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              ID: {request.id.replace('PMT#', '')}
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center bg-white rounded-full cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            {/* User Info */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">User Name:</span>
                <span className="font-poppins font-medium text-base text-[#0C0C0C]">{request.userName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Event/Booking:</span>
                <span className="font-poppins font-medium text-base text-[#0C0C0C]">{request.eventBooking}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Amount Paid:</span>
                <span className="font-roboto text-sm text-[#0C0C0C]">${request.amountPaid}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Refund Amount:</span>
                <span className="font-roboto text-sm text-[#0C0C0C]">${request.refundAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Reason:</span>
                <span className="font-roboto text-sm text-[#0C0C0C]">{request.reason}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Status</span>
                <div className={`px-3 py-1.5 rounded-full ${
                  request.status === 'Approved' ? 'bg-[#20B72E]' :
                  request.status === 'Pending' ? 'bg-[#E8B931]' :
                  'bg-[#EC221F]'
                } text-white font-roboto font-medium text-sm`}>
                  {request.status === 'Approved' ? 'Confirm' : request.status}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-roboto text-sm text-[#0C0C0C]">User Request:</span>
                <p className="font-roboto font-bold text-sm text-[#0C0C0C]">
                  {generateUserRequest()}
                </p>
              </div>
            </div>

            {/* Approve Button - Only show for pending requests */}
            {request.status === 'Pending' && (
              <button
                onClick={onApprove}
                className="self-end px-5 py-4 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base"
              >
                Approve Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundViewModal;