import { useState } from "react";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import VIPActionModal from "./modals/VIPActionModal";
import VIPEditModal from "./modals/VIPEditModal";

interface VIPRule {
  id: string;
  ruleName: string;
  triggerCondition: string;
  discountApplied: string;
  scope: string;
  status: "Active" | "Inactive";
}

const initialRules: VIPRule[] = [
  {
    id: "1",
    ruleName: "VIP Booking Deal",
    triggerCondition: "User Tier= Gold/Platinum",
    discountApplied: "20% off booking total",
    scope: "Game Zones",
    status: "Active",
  },
  {
    id: "2",
    ruleName: "Free Drink Friday",
    triggerCondition: "Tier = Silver+ on Friday",
    discountApplied: "$0 Drink (1/person)",
    scope: "Bar",
    status: "Active",
  },
  {
    id: "3",
    ruleName: "Birthday Reward",
    triggerCondition: "User Birthday = Today",
    discountApplied: "$20 off + free drink",
    scope: "All Zones",
    status: "Active",
  },
];

const columns = [
  { key: "ruleName", label: "Rule Name" },
  { key: "triggerCondition", label: "Trigger Condition" },
  { key: "discountApplied", label: "Discount Applied" },
  { key: "scope", label: "Scope" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

export default function AutomateDiscountVIPTable() {
  const [rules, setRules] = useState<VIPRule[]>(initialRules);
  const [showActionModal, setShowActionModal] = useState<number | null>(null);
  const [selectedRule, setSelectedRule] = useState<VIPRule | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditRule = (updatedRule: VIPRule) => {
    setRules(rules.map(rule => 
      rule.id === updatedRule.id ? updatedRule : rule
    ));
  };

  const handleDeleteRule = () => {
    if (selectedRule) {
      setRules(rules.filter(rule => rule.id !== selectedRule.id));
      setShowActionModal(null);
    }
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Automate Discount for VIP Members
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
            {rules.map((rule, idx) => (
              <tr
                key={`${rule.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {rule.ruleName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {rule.triggerCondition}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {rule.discountApplied}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {rule.scope}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${
                      rule.status === "Active" ? "bg-[#14AE5C]" : "bg-[#EC221F]"
                    } text-white`}
                  >
                    {rule.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">
                  <button
                    onClick={() => {
                      setSelectedRule(rule);
                      setShowActionModal(idx);
                    }}
                    className="text-gray-600 hover:text-[#E1017D] cursor-pointer"
                  >
                    <HorizontalDotsIcon />
                  </button>
                  {showActionModal === idx && (
                    <VIPActionModal
                      onClose={() => setShowActionModal(null)}
                      onEdit={() => {
                        setShowEditModal(true);
                        setShowActionModal(null);
                      }}
                      onDelete={handleDeleteRule}
                      style={{
                        top: idx >= rules.length - 2 ? 'auto' : undefined,
                        bottom: idx >= rules.length - 2 ? '100%' : undefined,
                        marginBottom: idx >= rules.length - 2 ? '8px' : undefined
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
        <VIPEditModal
          rule={selectedRule || undefined}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditRule}
        />
      )}
    </section>
  );
}