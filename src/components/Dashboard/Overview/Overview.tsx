import React from "react";
import TotalBookingChart from "./TotalBookingChart";
import RevenueChart from "./RevenueChart";
import ActiveUsersChart from "./ActiveUsersChart";

const Overview: React.FC = () => (
  <div className="bg-[#F9D2EA] rounded-2xl shadow-lg p-6 w-full" style={{ marginTop: "2rem" }}>
    <h2 className="font-poppins font-bold text-[28px] text-black mb-0">Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3  mt-2 gap-4 w-full justify-items-center">
      <TotalBookingChart />
      <RevenueChart />
      <ActiveUsersChart />
    </div>
  </div>
);

export default Overview;
