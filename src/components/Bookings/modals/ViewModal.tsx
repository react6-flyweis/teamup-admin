import React from 'react';
import CloseIcon from '@/assets/icons/CloseIcon';
import type { BookingStatus } from '../../common/StatusDropdown';

interface ModifyRequest {
  id: string;
  userName: string;
  bookingDate: string;
  timeSlot: string;
  status: BookingStatus;
  userRequest: string;
  action: string;
}

interface ViewModalProps {
  request?: ModifyRequest;
  onClose: () => void;
  onApprove: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ request, onClose, onApprove }) => {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[581px]">
        <div className="flex flex-col gap-7">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              ID: {request.id.replace('#', '')}
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
                <span className="font-roboto text-sm text-[#0C0C0C]">Booking Date</span>
                <span className="font-poppins font-medium text-base text-[#0C0C0C]">{request.bookingDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Time Slot:</span>
                <span className="font-roboto text-sm text-[#0C0C0C]">{request.timeSlot}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-roboto text-sm text-[#0C0C0C]">Status</span>
                <div className={`px-3 py-1.5 rounded-full ${
                  request.status === 'Confirm' ? 'bg-[#20B72E]' :
                  request.status === 'Pending' ? 'bg-[#E8B931]' :
                  'bg-[#EC221F]'
                } text-white font-roboto font-medium text-sm`}>
                  {request.status}
                </div>
              </div>
              <div className="flex  gap-4">
                <span className="font-roboto text-sm text-[#0C0C0C]">User Request:</span>
                <p className="font-roboto font-bold text-sm text-[#0C0C0C]">{request.userRequest}</p>
              </div>
            </div>

            {/* Approve Button */}
            <button
              onClick={onApprove}
              className="self-end px-5 py-4 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base"
            >
              Approve Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
