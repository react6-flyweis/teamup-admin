import { useState } from "react";
import Pagination from "@/utils/Pagination";
import HorizontalDotsIcon from "@/assets/icons/HorizontalDotsIcon";
import { PromotionActionModal, PromotionEditModal } from "./modals";


interface Promotion {
    id: string;
    promotionName: string;
    type: string;
    status: "Active" | "Upcoming" | "Expired";
    dateRange: string;
    targetZone: string;
    discountDetails: string;
}

const initialPromotions: Promotion[] = [
    {
        id: "1",
        promotionName: "Happy Hour",
        type: "Time Based",
        status: "Active",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "Bar",
        discountDetails: "25% off all drinks",
    },
    {
        id: "2",
        promotionName: "Summer Splash",
        type: "Seasonal",
        status: "Upcoming",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "Food",
        discountDetails: "$100 off per person",
    },
    {
        id: "3",
        promotionName: "Combo Meal Special",
        type: "Menu Combo",
        status: "Expired",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "Axe Throwing",
        discountDetails: "Burger + Fries: $19",
    },
    {
        id: "4",
        promotionName: "Weekend Blitz",
        type: "Time Based",
        status: "Active",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "All Games",
        discountDetails: "15% off bookings",
    },
    {
        id: "5",
        promotionName: "Ladies' Night",
        type: "Weekly Event",
        status: "Active",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "Food",
        discountDetails: "Free mocktail on entry",
    },
    {
        id: "6",
        promotionName: "Family Pack",
        type: "Combo Discount",
        status: "Active",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "Shuffle Board",
        discountDetails: "4 for the price of 3",
    },
    {
        id: "7",
        promotionName: "Flash Friday",
        type: "Flash Deal",
        status: "Active",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "Bar",
        discountDetails: "30% off select snacks",
    },
    {
        id: "8",
        promotionName: "Birthday Bonus",
        type: "Personal Promo",
        status: "Active",
        dateRange: "Apr 1 - Apr 30",
        targetZone: "All Games",
        discountDetails: "$20 off on birthday",
    },
];

const ROWS_PER_PAGE = 8;

const columns = [
    { key: "promotionName", label: "Promotion Name" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "dateRange", label: "Date Range" },
    { key: "targetZone", label: "Target Zone" },
    { key: "discountDetails", label: "Discount Details" },
    { key: "action", label: "Action" },
];

export default function CreateSchedulePromotionTable() {
    const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
    const [page, setPage] = useState(1);
    const [showActionModal, setShowActionModal] = useState<number | null>(null);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleEditPromotion = (updatedPromotion: Promotion) => {
        setPromotions(promotions.map(promo =>
            promo.id === updatedPromotion.id ? updatedPromotion : promo
        ));
    };

    const handleCreatePromotion = (newPromotion: Promotion) => {
        const promotionWithId = {
            ...newPromotion,
            id: (promotions.length + 1).toString()
        };
        setPromotions([...promotions, promotionWithId]);
    };

    const handleDisablePromotion = () => {
        if (selectedPromotion) {
            console.log('Disable promotion:', selectedPromotion.id);
            setShowActionModal(null);
        }
    };

    const pageData = promotions.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );
    const totalPages = Math.ceil(promotions.length / ROWS_PER_PAGE);

    return (
        <section className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-poppins">
                    Create & Schedule Promotion
                </h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base hover:bg-[#c9016f] transition-colors"
                >
                    Create Promotion
                </button>
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
                        {pageData.map((promotion, idx) => (
                            <tr
                                key={`${promotion.id}-${idx}`}
                                className={`${idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                                    } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
                            >
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                                    {promotion.promotionName}
                                </td>
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                                    {promotion.type}
                                </td>
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                                    <div
                                        className={`inline-block px-3 py-1 rounded-full ${promotion.status === "Active"
                                                ? "bg-[#14AE5C]"
                                                : promotion.status === "Upcoming"
                                                    ? "bg-[#E8B931]"
                                                    : "bg-[#EC221F]"
                                            } text-white`}
                                    >
                                        {promotion.status}
                                    </div>
                                </td>
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                                    {promotion.dateRange}
                                </td>
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                                    {promotion.targetZone}
                                </td>
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                                    {promotion.discountDetails}
                                </td>
                                <td className="py-4 px-2 font-montserrat font-medium text-[14px] relative">
                                    <button
                                        onClick={() => {
                                            setSelectedPromotion(promotion);
                                            setShowActionModal(idx);
                                        }}
                                        className="text-gray-600 hover:text-[#E1017D] cursor-pointer"
                                    >
                                        <HorizontalDotsIcon />
                                    </button>
                                    {showActionModal === idx && (
                                        <PromotionActionModal
                                            onClose={() => setShowActionModal(null)}
                                            onEdit={() => {
                                                setShowEditModal(true);
                                                setShowActionModal(null);
                                            }}
                                            onDisable={handleDisablePromotion}
                                            style={{
                                                top: idx >= pageData.length - 3 ? 'auto' : undefined,
                                                bottom: idx >= pageData.length - 3 ? '100%' : undefined,
                                                marginBottom: idx >= pageData.length - 3 ? '8px' : undefined
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-end py-4 px-4 bg-transparent">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <PromotionEditModal
                    promotion={selectedPromotion || undefined}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleEditPromotion}
                    isEdit={true}
                />
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <PromotionEditModal
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleCreatePromotion}
                    isEdit={false}
                />
            )}
        </section>
    );
}