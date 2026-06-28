import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

type TimePeriod = "Weekly" | "Monthly";

// --- SECTION HEADER UNDERLINE COMPONENT ---
const SectionHeaderUnderline: React.FC<{ text: string }> = ({ text }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [txtW, setTxtW] = useState(100);

  useEffect(() => {
    if (textRef.current) setTxtW(textRef.current.offsetWidth);
  }, [text]);

  const blueWidth = txtW + 4;
  const blueY = 10;
  const blueH = 4;
  const kneeRun = 7;
  const kneeRise = 12;
  const lineYEnd = blueY + blueH;

  return (
    <div className="relative flex items-end" style={{ minHeight: 22 }}>
      <span
        ref={textRef}
        className="font-poppins font-bold text-base text-black mb-2"
        style={{ color: "rgba(0,0,0,0.9)" }}
      >
        {text}
      </span>
      <svg
        className="absolute left-0 bottom-0"
        width="100%"
        height={lineYEnd + 2}
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Blue underline */}
        <rect
          x={0}
          y={blueY}
          width={blueWidth}
          height={blueH}
          rx={2}
          fill="#07DBFA"
        />
        {/* Gray knee then horizontal */}
        <path
          d={`
            M${blueWidth} ${lineYEnd}
            L${blueWidth + kneeRun} ${lineYEnd - kneeRise}
            H2000
          `}
          stroke="#AC99B9"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Sample data for weekly view
const weeklyData = [
  { period: "Week 1", retention: 64, churnRate: 42 },
  { period: "Week 2", retention: 72, churnRate: 36 },
  { period: "Week 3", retention: 70, churnRate: 88 },
  { period: "Week 4", retention: 71, churnRate: 48 },
  { period: "Week 5", retention: 81, churnRate: 64 }
];

// Sample data for monthly view
const monthlyData = [
  { period: "Jan", retention: 64, churnRate: 42 },
  { period: "Feb", retention: 65, churnRate: 43 },
  { period: "Mar", retention: 64, churnRate: 43 },
  { period: "Apr", retention: 64, churnRate: 44 },
  { period: "May", retention: 65, churnRate: 43 },
  { period: "Jun", retention: 64, churnRate: 43 },
  { period: "Jul", retention: 64, churnRate: 43 },
  { period: "Aug", retention: 64, churnRate: 42 },
  { period: "Sep", retention: 70, churnRate: 37 },
  { period: "Oct", retention: 70, churnRate: 88 },
  { period: "Nov", retention: 70, churnRate: 47 },
  { period: "Dec", retention: 81, churnRate: 64 }
];

const timePeriods: TimePeriod[] = ["Weekly", "Monthly"];

export default function RetentionChurnChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Weekly");
  
  const currentData = selectedPeriod === "Weekly" ? weeklyData : monthlyData;

  return (
    <section className="w-full">
      {/* Header Controls */}
      <div className="flex justify-end items-center mb-6">
        {/* Time Period Tabs */}
        <div 
          className="flex flex-row p-0.5 gap-0.5 rounded"
          style={{ background: "#A3EBFF", border: "1px solid #005066" }}
        >
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className="flex items-center justify-center px-4 py-2 rounded font-poppins font-medium text-base leading-6 transition-all duration-200"
              style={{
                minWidth: period === "Weekly" ? 91 : 97,
                height: 40,
                background: selectedPeriod === period ? "#003240" : "transparent",
                color: selectedPeriod === period ? "#FFFFFF" : "#333333",
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div 
        className="w-full rounded-2xl p-4 shadow-lg"
        style={{ 
          background: "#F9D2EA",
          boxShadow: "40px 40px 100px rgba(10, 20, 57, 0.4)"
        }}
      >
        {/* Chart Title and Legend */}
        <div className="flex justify-between items-end mb-3">
          <div className="pl-2">
            <SectionHeaderUnderline text="Retention VS Churn Over Time" />
          </div>
          
          {/* Legend */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-3">
              <div 
                className="w-[57px] h-[26px] rounded"
                style={{ background: "#8B95F9" }}
              />
              <span className="font-poppins text-xs leading-[18px] text-[#333333]">
                Retention
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="w-[57px] h-[26px] rounded"
                style={{ background: "#FB5669" }}
              />
              <span className="font-poppins text-xs leading-[18px] text-[#333333]">
                Churn Rate
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full px-2 pb-2" style={{ minHeight: 440 }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={currentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
              barCategoryGap="20%"
            >
              {/* Grid Lines */}
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                horizontal={true}
                stroke="rgba(0, 0, 0, 0.25)"
                strokeOpacity={1}
              />
              
              {/* Y Axis */}
              <YAxis
                type="number"
                domain={[0, 100]}
                ticks={[20, 40, 60, 80, 100]}
                width={40}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 12,
                  fill: "rgba(0,0,0,0.7)",
                }}
                tickFormatter={(value) => `${value}%`}
                interval={0}
                allowDecimals={false}
              />
              
              {/* X Axis */}
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                height={36}
                tick={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 12,
                  fill: "rgba(0,0,0,0.7)",
                }}
                interval={0}
                padding={{ left: 15, right: 15 }}
              />

              {/* Bars */}
              <Bar
                dataKey="retention"
                fill="#8B95F9"
                opacity={0.8}
                radius={[0, 0, 0, 0]}
                maxBarSize={selectedPeriod === "Weekly" ? 75 : 22}
              />
              
              <Bar
                dataKey="churnRate"
                fill="#FB5669"
                opacity={0.8}
                radius={[0, 0, 0, 0]}
                maxBarSize={selectedPeriod === "Weekly" ? 75 : 22}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{ fill: "#77777711" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  background: "#fff",
                  fontSize: 13,
                  fontFamily: "Inter",
                  color: "#222",
                }}
                labelStyle={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: 13,
                }}
                formatter={(value: any, name: string) => [
                  `${value}%`,
                  name === "retention" ? "Retention" : "Churn Rate"
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Legend */}
        <div className="w-full flex flex-row justify-center items-center mt-3 mb-4">
          <div className="flex flex-row items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white bg-[#7086FD] rounded-sm"></span>
            <span className="text-xs text-black/70 font-inter">2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}
