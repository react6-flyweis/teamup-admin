import ModifyRequestTable from '@/components/Bookings/ModifyRequestTable';
import UserBookingTable from '@/components/Bookings/UserBookingTable';
import GroupEventTable from '@/components/Bookings/GroupEventTable';
import WaitlistTable from '@/components/Bookings/WaitlistTable';

const Bookings = () => {
  return (
    <div className="flex flex-col min-h-screen gap-8">
      <UserBookingTable />
      <ModifyRequestTable />
      <GroupEventTable />
      <WaitlistTable />
    </div>
  );
};

export default Bookings;