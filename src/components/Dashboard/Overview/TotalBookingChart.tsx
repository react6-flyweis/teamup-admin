import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";

const weeklyBookingData = [
  { day: "Su", value: 2000 },
  { day: "Mo", value: 3000 },
  { day: "Tu", value: 2500 },
  { day: "We", value: 4000 },
  { day: "Th", value: 3500 },
  { day: "Fr", value: 4500 },
  { day: "Sa", value: 9500 }
];

// To ensure chart shows up to 10000
const maxDataVal = Math.max(...weeklyBookingData.map(d => d.value), 10000);
const minY = 0;
const yTicks = [0, 2000, 4000, 6000, 8000, 10000].filter(t => t <= maxDataVal);

export default function TotalBookingChart() {
  return (
    <div className="relative w-full h-[240px] bg-[#770F4E] rounded-xl overflow-hidden font-[Poppins] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 w-full z-10">
        <div>
          <span className="font-bold text-[16px] text-white">Total Booking</span>
          <span className="font-bold text-[22px] text-white ml-3">1058</span>
        </div>
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </div>
      {/* Chart & Axes */}
      <div className="flex-1 w-full pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weeklyBookingData}
            margin={{ left: 32, right: 10, top: 10, bottom: 20 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.5)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <YAxis
              ticks={yTicks}
              domain={[minY, maxDataVal]}
              tick={{
                fill: "#fff",
                fontSize: 10,
                fontFamily: "Poppins",
                fontWeight: 400,
                dx: -5,
              }}
              axisLine={false}
              tickLine={false}
              width={30}
              interval={0}
              allowDecimals={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#fff",
                fontSize: 10,
                fontFamily: "Poppins",
                fontWeight: 400,
              }}
              padding={{ left: 5, right: 5 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00FF77"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
            <Tooltip
              cursor={{ stroke: "#0fb45c", strokeWidth: 1 }}
              contentStyle={{
                height:"fit",
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
                boxShadow:
                  "0px 2px 12px 0px rgba(119, 15, 78, 0.12)"
              }}
              formatter={(value: number) => [`${value}`, "Bookings"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
