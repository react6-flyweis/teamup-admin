import { useEffect, useState } from "react";
import LoadingScreen from "@/components/Loading/ContentLoader"; 
import SalesOverview from "@/components/Dashboard/SalesOverview";
import Overview from "@/components/Dashboard/Overview/Overview";
import Report from "@/components/Dashboard/Reports/Report";
import LiveGameTable from "@/components/Dashboard/LiveGameTable";
import VenuePerformanceTable from "@/components/Dashboard/VenuePerformanceTable";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 300ms delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6 ">
      <Overview />
      <SalesOverview/>
      <Report/>
      <LiveGameTable/>
      <VenuePerformanceTable/>
    </div>
  );
};

export default Dashboard;
