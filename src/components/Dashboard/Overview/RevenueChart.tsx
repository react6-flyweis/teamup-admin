import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";

const monthlyRevenueData = [
  { month: "Jan", value: 4200 }, { month: "Feb", value: 8100 }, { month: "Mar", value: 2100 }, { month: "Apr", value: 900 },
  { month: "May", value: 3600 }, { month: "Jun", value: 5500 }, { month: "Jul", value: 6600 }, { month: "Aug", value: 2900 },
  { month: "Sep", value: 5100 }, { month: "Oct", value: 900 }, { month: "Nov", value: 900 }, { month: "Dec", value: 4400 }
];

const minY = 0;
const maxY = 10000;
const yTicks = [0, 2000, 4000, 6000, 8000, 10000];

export default function RevenueChart() {
  return (
    <div className="relative w-full h-[240px] bg-[#770F4E] rounded-xl overflow-hidden font-[Poppins] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 w-full z-10">
        <div>
          <span className="font-bold text-[16px] text-white">Revenue</span>
          <span className="font-bold text-[22px] text-white ml-3">$8,564</span>
        </div>
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </div>
      {/* Chart */}
      <div className="flex-1 w-full  pr-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyRevenueData} margin={{ left: 32, right: 10, top: 10, bottom: 20 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.5)" strokeDasharray="3 3" vertical={false} />
            <YAxis
              ticks={yTicks}
              domain={[minY, maxY]}
              interval={0} // *** THIS FORCES ALL LABELS ***
              tick={{
                fill: "#fff",
                fontSize: 10,
                fontFamily: "Poppins",
                fontWeight: 400,
                dx: -5
              }}
              axisLine={false}
              tickLine={false}
              width={34}
              allowDecimals={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#fff",
                fontSize: 10,
                fontFamily: "Poppins",
                fontWeight: 400,
              }}
              interval={0}
              padding={{ left: 4, right: 4 }}
            />
            <Bar dataKey="value" fill="#0578FF" radius={[10, 10, 0, 0]} barSize={10} />
            <Tooltip
              cursor={{ fill: "rgba(5, 120, 255, 0.1)" }}
              contentStyle={{
                background: "#fff",
                color: "#770F4E",
                fontFamily: "Poppins",
                fontSize: "13px",
                borderRadius: 8,
                border: "none"
              }}
              labelStyle={{
                color: "#770F4E",
                fontWeight: 700,
                fontFamily: "Poppins",
                fontSize: "12px"
              }}
              wrapperStyle={{
                outline: "none",
                boxShadow: "0px 2px 12px 0px rgba(119, 15, 78, 0.12)"
              }}
              formatter={(value: number) => [`${value}`, "Revenue"]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
