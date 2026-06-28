import {
  //  useParams,
    useNavigate } from 'react-router-dom';
import { MonthlySalesReportChart, CustomerRatingChart } from "@/components/StaffDetails/charts";
import StarIcon from '@/assets/icons/StarIcon';
import ArrowLeftCircleIcon from '@/assets/icons/ArrowLeftCircleIcon';

interface PerformanceMetric {
  key: string;
  label: string;
  johnSmithValue: string | number;
  teamValue: string | number;
  isRating?: boolean;
}

const performanceMetrics: PerformanceMetric[] = [
  { key: "shiftCompleted", label: "Shift Completed", johnSmithValue: 18, teamValue: 20 },
  { key: "onTimeArrival", label: "On-Time Arrival Rate", johnSmithValue: "72%", teamValue: "88%" },
  { key: "bookingHandled", label: "Booking Handled", johnSmithValue: 30, teamValue: 38 },
  { key: "avgCustomerRating", label: "Avg Customer Rating", johnSmithValue: 4.5, teamValue: 4.5, isRating: true },
  { key: "compliments", label: "Compliments", johnSmithValue: 10, teamValue: 15 },
  { key: "complaints", label: "Complaints", johnSmithValue: 4, teamValue: 6 }
];


const StaffDetail = () => {
  // const { id } = useParams();
const navigate = useNavigate();

const renderRating = (rating: number) => (
  <div className="flex items-center gap-1 justify-center">
    <StarIcon/>
    <span className="font-montserrat font-medium text-[14px]">{rating}</span>
  </div>
);

  return (
    <div className="flex flex-col min-h-screen gap-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4" style={{ marginTop: 12 }}>
        <button
          onClick={()=>navigate('-1')}
          className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center hover:bg-[#f4f2f2] transition-colors"
          style={{ fontSize: 22, marginTop: 4 }}
        >
          <ArrowLeftCircleIcon />{" "}
        </button>
        <h1 className="text-[22px] font-bold text-white font-poppins">John Smith</h1>
      </div>

      {/* Performance Summary */}
      <section className="w-full">
        <h2 className="text-[22px] font-bold text-white font-poppins mb-4">Performance Summary April (2025)</h2>
        <div className="rounded-[10px] overflow-hidden shadow-lg  bg-transparent">
          <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
            <thead>
              <tr className="bg-[#FFD0F8]" style={{height: '49px'}}>
                <th className="py-4 px-6 font-bold text-[14px] text-black font-montserrat text-left" style={{ borderTopLeftRadius: 8, width: "33.33%" }}>
                  Key Metric
                </th>
                <th className="py-4 px-6 font-bold text-[14px] text-black font-montserrat" style={{ width: "33.33%" }}>
                  John Smith
                </th>
                <th className="py-4 px-6 font-bold text-[14px] text-black font-montserrat text-center" style={{ borderTopRightRadius: 8, width: "33.33%" }}>
                  Team
                </th>
              </tr>
            </thead>
            <tbody>
              {performanceMetrics.map((metric, idx) => (
                <tr
                  key={metric.key}
                  className={`${
                    idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                  } hover:bg-[#f3e2f6] transition-all duration-200`}
                  style={{ height: '49px' }}
                >
                  <td className="px-6 font-montserrat font-medium text-[14px] text-left">{metric.label}</td>
                  <td className="px-6 font-montserrat font-medium text-[14px] text-center">{metric.isRating ? renderRating(metric.johnSmithValue as number) : metric.johnSmithValue}</td>
                  <td className="px-6 font-montserrat font-medium text-[14px] text-center">{metric.isRating ? renderRating(metric.teamValue as number) : metric.teamValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts Section */}
      <section className="w-full">
        <h2 className="text-[22px] font-bold text-white font-poppins mb-4">
          Performance Analytics
        </h2>
        <div className="flex gap-12">
          <MonthlySalesReportChart />
          <CustomerRatingChart />
        </div>
      </section>
    </div>
  );
};

export default StaffDetail;
