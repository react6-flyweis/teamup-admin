import BookingTrendsChart from "@/components/Insights/BookingTrendsChart";
import RevenueForecastingCards from "@/components/Insights/RevenueForecastingCards";
import PeakHourTrafficTable from "@/components/Insights/PeakHourTrafficTable";
import CustomerRetentionAnalysis from "@/components/Insights/CustomerRetentionAnalysis";
import RetentionChurnChart from "@/components/Insights/RetentionChurnChart";
import PopularGamesTable from "@/components/Insights/PopularGamesTable";

const Insights = () => {
  return (
    <div className="text-white space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-poppins mb-8">
          Booking trends & Revenue Forecasting
        </h1>
      </div>
      
      {/* Booking trends Chart */}
      <BookingTrendsChart />
      
      {/* Revenue Forecasting Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Revenue Forecasting
        </h2>
        <RevenueForecastingCards />
      </div>
      
      {/* Peak Hour & Low Traffic Time Slots */}
      <PeakHourTrafficTable />
      
      {/* Customer Retention & Churn Rate Analysis */}
      <CustomerRetentionAnalysis />
      
      {/* Retention vs Churn Rate Chart */}
      <RetentionChurnChart />
      
      {/* Popular Games & Engaged Activity */}
      <PopularGamesTable />
    </div>
  );
};

export default Insights;