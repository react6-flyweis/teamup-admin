import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const monthlySalesData = [
  { day: "Mon", value: 56 },
  { day: "Tue", value: 64 },
  { day: "Wed", value: 76 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 37 },
];

const yLabels = [
  { value: 80, label: "On-Time" },
  { value: 55, label: "Late" },
  { value: 30, label: "Absent" },
];

export default function MonthlySalesReportChart() {
  return (
    <div
      className="bg-[#F9D2EA] rounded-[16px] shadow-[40px_40px_100px_rgba(10,20,57,0.14)] flex flex-col relative"
      style={{ width: 490, height: 404, minWidth: 335, maxWidth: 600, padding: 16 }}
    >
      {/* Header */}
      <div className="flex items-end relative h-10 mb-1 w-full max-w-[458px]">
        <div className="flex flex-col justify-center items-start relative px-2 pb-1 z-0" style={{ width: 190 }}>
          <span className="font-poppins font-bold text-[16px] text-black" style={{ color: "rgba(0,0,0,0.9)" }}>
            Monthly Sales Report
          </span>
          {/* Underline */}
          <div className="absolute left-0 bottom-0 h-[3px] w-[148px] flex flex-row z-10">
            <span className="bg-[#07DBFA] h-[3px] w-[29px] rounded-sm block" />
            <span className="bg-[#3086F3] h-[2px] w-[29px] opacity-50 blur-[2.5px] -ml-[22px] mt-0" />
            <span className="bg-black/25 h-[1px] w-[85px] ml-2 mt-[0.8px] rounded" />
          </div>
        </div>
        <span className="absolute right-2 top-2 font-inter text-[10px] text-black/50 tracking-[.06em]">
          MORE
        </span>
      </div>

      {/* Chart with left Y axis labels */}
      <div className="flex flex-row items-start pt-3 pb-1">
        {/* Left Y labels */}
        <div className="flex flex-col justify-between h-[272px] pr-1 pt-[8px] pb-[8px]" style={{ width: 57 }}>
          {yLabels.map((l) => (
            <span key={l.label} className="font-inter text-[12px] text-black/70" style={{ height: 15 }}>
              {l.label}
            </span>
          ))}
        </div>
        {/* Chart */}
        <ResponsiveContainer width={383} height={272}>
          <LineChart
            data={monthlySalesData}
            margin={{ left: 0, right: 0, top: 0, bottom: 32 }}
          >
            <CartesianGrid stroke="#B5A4FB" strokeDasharray="6 7" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(0,0,0,0.7)",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: 12,
              }}
              height={24}
              interval={0}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis domain={[30, 80]} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8979FF"
              strokeWidth={2}
              dot={{
                fill: "#fff",
                stroke: "#8979FF",
                strokeWidth: 3,
                r: 7,
              }}
              activeDot={{
                fill: "#8979FF",
                fillOpacity: 0.25,
                stroke: "#8979FF",
                strokeWidth: 6,
                r: 14,
              }}
              isAnimationActive={false}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                background: "#fff",
                fontSize: "13px",
              }}
              formatter={(value: number) => [value, "Sales"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-row justify-center items-center w-full mt-2">
        <div className="flex flex-row items-center gap-2 w-[74px] h-6 px-2">
          <div className="relative w-4 h-4">
            <span className="absolute w-full h-[2px] bg-[#8979FF] top-1.5 left-0" />
            <span className="absolute left-1/2 top-1/2 w-2 h-2 bg-[#8979FF] border border-white rounded -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="font-inter text-[12px] text-black/70 ml-2">2025</span>
        </div>
      </div>
    </div>
  );
}
