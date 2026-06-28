import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip
} from "recharts";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";

const activeUsersData = [
  { month: "Jan", value: 150 }, { month: "Feb", value: 180 }, { month: "Mar", value: 200 },
  { month: "Apr", value: 200 }, { month: "May", value: 215 }, { month: "Jun", value: 250 },
  { month: "Jul", value: 1000 }, // peak (for demo)
  { month: "Aug", value: 250 }, { month: "Sep", value: 230 }, { month: "Oct", value: 220 },
  { month: "Nov", value: 220 }, { month: "Dec", value: 210 }
];

const chartLeftPadding = 32;
const chartRightPadding = 16;

export default function ActiveUsersChart() {
  // Dynamically calc min/max for the current data set
  const values = activeUsersData.map(d => d.value);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  // Dashed line at "center" of current scale (mathematically: (maxY+minY)/2)
  const centerY = Math.round((maxY + minY) / 2);

  return (
    <div className="relative w-full h-[240px] bg-[#770F4E] rounded-xl overflow-hidden font-[Poppins] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 w-full z-10">
        <div>
          <span className="font-bold text-[16px] text-white">Active Users</span>
          <span className="font-bold text-[22px] text-white ml-3">{centerY}</span>
        </div>
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </div>
      {/* Chart */}
      <div className="flex-1 w-full px-4 pb-3 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activeUsersData}
            margin={{ left: chartLeftPadding, right: chartRightPadding, top: 20, bottom: 28 }}
          >
            {/* Only vertical grid lines */}
            <CartesianGrid vertical horizontal={false} strokeDasharray="6 6" stroke="rgba(255,255,255,0.5)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#fff", fontSize: 13, fontFamily: "Poppins", fontWeight: 400 }}
              interval={0}
              padding={{ left: 0, right: 0 }}
            />
            {/* Center horizontal dashed line */}
            <ReferenceLine
              y={centerY}
              stroke="#fff"
              strokeWidth={3}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FFB800"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
            <Tooltip
              isAnimationActive={false}
              cursor={{ stroke: "#FFB800", strokeWidth: 1, fill: "rgba(255,184,0,0.03)" }}
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
              formatter={(value: number) => [`${value}`, "Active Users"]}
            />
            {/* Optional: Dot at one of the data points at centerY (if you want, use interpolation to find exact X or just skip) */}
          </LineChart>
        </ResponsiveContainer>
        {/* Custom yellow highlight bubble: horizontally centered */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 26, // Adjust for vertical spacing above the dashed line
            zIndex: 12,
            width: 36, height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFB800",
            color: "#FFF",
            fontFamily: "Josefin Sans, Poppins, sans-serif",
            fontWeight: 700,
            borderRadius: "22px",
            fontSize: 13,
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
          }}
        >
          {centerY >= 1000 && centerY % 1000 === 0
            ? `${(centerY / 1000).toFixed(0)}k`
            : `${centerY}`}
        </div>
      </div>
    </div>
  );
}
