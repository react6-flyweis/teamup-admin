import { useState } from "react";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import LoyaltyActionModal from "./modals/LoyaltyActionModal";
import LoyaltyEditModal from "./modals/LoyaltyEditModal";

interface LoyaltyTier {
  id: string;
  tierName: string;
  minPoints: number;
  benefits: string;
  usersInTiers: number;
}

const initialTiers: LoyaltyTier[] = [
  {
    id: "1",
    tierName: "Bronze",
    minPoints: 0,
    benefits: "5% off on food",
    usersInTiers: 412,
  },
  {
    id: "2",
    tierName: "Silver",
    minPoints: 500,
    benefits: "10% off food + 1 free drink/mo",
    usersInTiers: 168,
  },
  {
    id: "3",
    tierName: "Gold",
    minPoints: 1000,
    benefits: "15% off food + VIP game lanes",
    usersInTiers: 65,
  },
  {
    id: "4",
    tierName: "Platinum",
    minPoints: 2000,
    benefits: "20% off + exclusive access",
    usersInTiers: 12,
  },
];

const columns = [
  { key: "tierName", label: "Tier Name" },
  { key: "minPoints", label: "Min. Points" },
  { key: "benefits", label: "Benefits" },
  { key: "usersInTiers", label: "Users in Tiers" },
  { key: "action", label: "Action" },
];

export default function LoyaltyPointsRewardTiersTable() {
  const [tiers, setTiers] = useState<LoyaltyTier[]>(initialTiers);
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<LoyaltyTier | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditTier = (updatedTier: LoyaltyTier) => {
    setTiers(tiers.map(tier => 
      tier.id === updatedTier.id ? updatedTier : tier
    ));
  };

  const handleDeleteTier = () => {
    if (selectedTier) {
      setTiers(tiers.filter(tier => tier.id !== selectedTier.id));
      setShowActionModal(null);
    }
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Loyalty Points & Reward Tiers
        </h2>
      </div>

      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-black font-montserrat"
                  style={{
                    borderTopLeftRadius: col.key === columns[0].key ? 8 : 0,
                    borderTopRightRadius:
                      col.key === columns[columns.length - 1].key ? 8 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, idx) => (
              <tr
                key={`${tier.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {tier.tierName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {tier.minPoints}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {tier.benefits}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {tier.usersInTiers}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">
                  <button
                    onClick={() => {
                      setSelectedTier(tier);
                      setShowActionModal(idx);
                    }}
                    className="text-gray-600 hover:text-[#E1017D] cursor-pointer"
                  >
                    <HorizontalDotsIcon />
                  </button>
                  {showActionModal === idx && (
                    <LoyaltyActionModal
                      onClose={() => setShowActionModal(null)}
                      onEdit={() => {
                        setShowEditModal(true);
                        setShowActionModal(null);
                      }}
                      onDelete={handleDeleteTier}
                      style={{
                        top: idx >= tiers.length - 2 ? 'auto' : undefined,
                        bottom: idx >= tiers.length - 2 ? '100%' : undefined,
                        marginBottom: idx >= tiers.length - 2 ? '8px' : undefined
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <LoyaltyEditModal
          tier={selectedTier || undefined}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditTier}
        />
      )}
    </section>
  );
}