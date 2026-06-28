import React, { useState } from "react";
import Toggle from "@/components/common/Toggle";
import BookingCancelIcon from "@/assets/icons/BookingCancelIcon";
import BookingConfirmIcon from "@/assets/icons/BookingConfirmIcon";
import WarningIcon from "@/assets/icons/WarningIcon";
import BirthdayCakeIcon from "@/assets/icons/BirthdayCakeIcon";
import LastMinuteUpdateIcon from "@/assets/icons/LastMinuteUpdateIcon";
import SpecialDealOfferIcon from "@/assets/icons/SpecialDealOfferIcon";
import SpecialDealModal from "@/components/Alert/SpecialDealModal";

const AlertIcon = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => (
  <span
    className="w-9 h-9 mr-3 rounded-lg flex items-center justify-center"
    style={{ background: color }}
  >
    {children}
  </span>
);

const icons = [
  <AlertIcon key={1} color="#7E0B0B"><BookingCancelIcon /></AlertIcon>,
  <AlertIcon key={2} color="#003240"><BookingConfirmIcon /></AlertIcon>,
  <AlertIcon key={3} color="#9DB711"><WarningIcon color="#fff" /></AlertIcon>,
  <AlertIcon key={4} color="#AF52DE"><BirthdayCakeIcon /></AlertIcon>,
  <AlertIcon key={5} color="#0092BA"><LastMinuteUpdateIcon /></AlertIcon>,
  <AlertIcon key={6} color="#A2845E"><SpecialDealOfferIcon /></AlertIcon>,
];

const initialAlerts = [
  {
    title: "Booking Cancelled",
    description:
      "Booking made by John Smith for Axe throwing lane 2 has been cancelled.",
    icon: icons[0],
    showDetail: true,
    showToggle: false,
    showActive: false,
    isActive: false,
  },
  {
    title: "New Booking",
    description:
      "New booking is done by John Smith for Axe Throwing lane 2 has been confirmed.",
    icon: icons[1],
    showDetail: true,
    showToggle: false,
    showActive: false,
    isActive: false,
  },
  {
    title: "Low Inventory",
    description: "Low stock alert for vodka bottle, burger buns, french fries.",
    icon: icons[2],
    showDetail: true,
    showToggle: false,
    showActive: false,
    isActive: false,
  },
  {
    title: "User Birthday",
    description: "It’s John Smith birthday today",
    icon: icons[3],
    showDetail: false,
    showToggle: false,
    showActive: false,
    isActive: false,
  },
  {
    title: "Last–Minute Opening Update",
    description: "One slot has open up for Shuffle Board Lane 4",
    icon: icons[4],
    showDetail: true,
    showToggle: false,
    showActive: false,
    isActive: false,
  },
  {
    title: "Special Deal offer sent",
    description: "Get 20% off on all drinks until 19:00 PM",
    icon: icons[5],
    showDetail: true,
    showToggle: true,
    showActive: true,
    isActive: true,
  },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showDealModal, setShowDealModal] = useState(false);

  const onToggleActive = (idx: number, checked: boolean) => {
    setAlerts((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, isActive: checked } : a))
    );
  };

  return (
    <div className="min-h-screen bg-[#F9D2EA] rounded-2xl p-7 shadow-[0_10px_40px_0_rgba(140,40,110,0.09)]">
      <ul className="divide-y divide-[#F4A5D5]">
        {alerts.map((alert, idx) => (
          <li
            key={idx}
            className="flex items-start py-6 px-2 relative bg-transparent"
          >
            <div className="self-start mr-2">{alert.icon}</div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-poppins font-bold text-[16px] text-black mb-1 truncate">
                {alert.title}
              </span>
              <span className="text-black font-medium text-[15px] leading-[1.4] break-words pr-3">
                {alert.description}
              </span>
            </div>
            {(alert.showDetail || alert.showToggle) && (
              <div className="flex flex-col items-center gap-y-4 ml-4 min-w-[120px]">
                {alert.showDetail && (
                  <button
                    className="text-[#770F4E] underline font-montserrat text-[15px] font-medium hover:text-[#570B39] transition whitespace-nowrap"
                    onClick={() => {
                      if (alert.title === "Special Deal offer sent")
                        setShowDealModal(true);
                    }}
                  >
                    Show Detail
                  </button>
                )}
                {alert.showToggle && (
                  <Toggle
                    checked={alert.isActive}
                    onChange={(checked: boolean) => onToggleActive(idx, checked)}
                    activeText="Active"
                    inactiveText=""
                  />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <SpecialDealModal open={showDealModal} onClose={() => setShowDealModal(false)} />
    </div>
  );
};

export default Alerts;
