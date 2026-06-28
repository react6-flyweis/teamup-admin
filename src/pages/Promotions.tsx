import CreateSchedulePromotionTable from '@/components/Promotions/CreateSchedulePromotionTable';
import LoyaltyPointsRewardTiersTable from '@/components/Promotions/LoyaltyPointsRewardTiersTable';
import AutomateDiscountVIPTable from '@/components/Promotions/AutomateDiscountVIPTable';
import PromotionalNotificationSettings from '@/components/Promotions/PromotionalNotificationSettings';

const Promotions = () => {
  return (
    <div className="flex flex-col min-h-screen gap-8">
      <CreateSchedulePromotionTable />
      <LoyaltyPointsRewardTiersTable />
      <AutomateDiscountVIPTable />
      <PromotionalNotificationSettings />
    </div>
  );
};

export default Promotions;