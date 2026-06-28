import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ratingData = [
  { day: "Mon", value: 3.3 },
  { day: "Tue", value: 3.7 },
  { day: "Wed", value: 4.0 },
  { day: "Thu", value: 4.2 },
  { day: "Fri", value: 3.8 },
  { day: "Sat", value: 2.6 },
];

const yTicks = [1, 2, 3, 4, 5];

export default function CustomerRatingChart() {
  return (
    <div
      className="bg-[#F9D2EA] rounded-[16px] shadow-[40px_40px_100px_rgba(10,20,57,0.14)] p-4 flex flex-col"
      style={{ width: 491, height: 404, minWidth: 335, maxWidth: 650 }}
    >
      {/* Header */}
      <div className="flex flex-row items-end relative" style={{ width: 459, height: 40 }}>
        {/* Title and underline */}
        <div className="flex flex-col justify-center items-start relative px-2 pb-1" style={{ width: 209, height: 40 }}>
          <div className="font-poppins font-bold text-[22px] leading-[33px] text-black" style={{ color: "rgba(0,0,0,0.9)" }}>
            Customer Rating
          </div>
          {/* Underline */}
          <div className="absolute left-0 bottom-0 h-[3px] w-[147px] z-10 flex flex-row">
            <span className="bg-[#07DBFA] h-[3px] w-[29px] rounded-sm block" />
            <span className="bg-[#3086F3] h-[2px] w-[29px] opacity-50 blur-[2.5px] -ml-[25px] mt-0" />
            <span className="bg-black/25 h-[1.3px] w-[88px] ml-2 mt-[0.7px] rounded" />
          </div>
        </div>
        {/* More button top-right */}
        <span
          className="absolute text-[10px] text-black/50 font-inter font-normal"
          style={{
            right: 12, // place per Figma/visual
            top: "12px",
            letterSpacing: ".06em",
          }}
        >
          MORE
        </span>
      </div>
      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={ratingData}
            margin={{ left: 0, right: 0, top: 8, bottom: 8 }}
            barCategoryGap="20%"
            barGap={2}
          >
            <CartesianGrid stroke="#B5A4FB" strokeDasharray="6 7" />
            <YAxis
              domain={[1, 5]}
              ticks={yTicks}
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{
                fill: "rgba(0,0,0,0.7)",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: 12,
              }}
              width={26}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{
                fill: "rgba(0,0,0,0.7)",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: 12,
              }}
              height={24}
              padding={{ left: 14, right: 14 }}
            />
            <Bar
              dataKey="value"
              fill="#7086FD"
              fillOpacity={0.8}
              barSize={39}
              radius={[6, 6, 0, 0]}
            />
            <Tooltip
              cursor={{ fill: "#7086FD11" }}
              contentStyle={{
                background: "#fff",
                borderRadius: 10,
                border: "none",
                boxShadow: "0 4px 12px 0 #b5a4fb22",
                fontFamily: "Inter",
                fontSize: 13,
                color: "#232323"
              }}
              labelStyle={{
                color: "#232323",
                fontWeight: 600,
                fontFamily: "Inter",
                fontSize: 13
              }}
              formatter={(value: number) => [value.toFixed(1), "Rating"]}
            />
          </BarChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="flex flex-row justify-center items-center mt-2" style={{ width: 443, height: 24 }}>
          <span className="relative block w-4 h-4 mr-1">
            <span className="absolute left-1/2 top-1/2 w-2 h-2 bg-[#7086FD] border border-white rounded -translate-x-1/2 -translate-y-1/2" />
          </span>
          <span className="font-inter text-[12px] font-normal text-black/70 ml-2">2023</span>
        </div>
      </div>
    </div>
  );
}
