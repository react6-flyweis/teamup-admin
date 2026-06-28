import PaymentTrackingTable from '@/components/Payments/PaymentTrackingTable';
import RefundAdjustmentTable from '@/components/Payments/RefundAdjustmentTable';
import InvoiceTaxReportingTable from '@/components/Payments/InvoiceTaxReportingTable';

const Payments = () => {
  return (
    <div className="flex flex-col min-h-screen gap-8">
      <PaymentTrackingTable />
      <RefundAdjustmentTable />
      <InvoiceTaxReportingTable />
    </div>
  );
};

export default Payments;