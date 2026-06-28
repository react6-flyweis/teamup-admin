import StaffRoleTable from '@/components/StaffRoles/StaffRoleTable';
import EmployeeCheckInTable from '@/components/StaffRoles/EmployeeCheckInTable';
import EmployeePerformanceTable from '@/components/StaffRoles/EmployeePerformanceTable';

const StaffRoles = () => {
  return (
    <div className="flex flex-col min-h-screen gap-8">
      <StaffRoleTable />
      <EmployeeCheckInTable />
      <EmployeePerformanceTable />
    </div>
  );
};

export default StaffRoles;