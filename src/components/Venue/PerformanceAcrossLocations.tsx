import React, { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// --- KNEE UNDERLINE COMPONENT ---
const SectionHeaderUnderline: React.FC<{ text: string }> = ({
  text,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [txtW, setTxtW] = useState(100);

  useEffect(() => {
    if (textRef.current) setTxtW(textRef.current.offsetWidth);
  }, [text]);

  // 60deg: tan(60) ≈ 1.73 => For rise=8, run ≈ 4.6 (round to 5)
  // y0 is bottom of blue, left padding = 0 (flush) for true dashboard/figma look
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
        className="font-poppins font-bold text-[22px] text-black mb-2"
        style={{ color: "rgba(0,0,0,0.9)" }}
      >
        {text}
      </span>
      <svg
        className="absolute left-0 bottom-0 "
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

// --- MAIN COMPONENT ---
const data = [
  { location: "Downtown", revenue: 16500 },
  { location: "Newyork", revenue: 18200 },
  { location: "San Francisco", revenue: 18200 },
  { location: "California", revenue: 18200 },
  { location: "Texas", revenue: 20300 },
  { location: "Newyork", revenue: 21000 },
  { location: "Los Angeles", revenue: 19000 },
  { location: "Texas", revenue: 12500 },
];

const yTicks = [25000, 20000, 15000, 10000, 5000];
const tabs = [
  { key: "daily", label: "Daily", minWidth: 80 },
  { key: "weekly", label: "Weekly", minWidth: 90 },
  { key: "monthly", label: "Monthly", minWidth: 100 },
];

const PerformanceAcrossLocations: React.FC = () => {
  const [selected, setSelected] = useState("daily");

  return (
    <div className="w-full mb-8">
      <div className="flex flex-row justify-between items-center px-4 mb-6">
        <span className="font-bold text-white text-2xl leading-[33px] font-poppins">
          Performance Across Different Location
        </span>
        <div className="flex bg-[#A3EBFF] rounded-[4px] px-[2px] h-[44px] items-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelected(tab.key)}
              className={`transition-colors duration-200 rounded-[4px] px-4 h-[40px] font-poppins font-medium text-[16px] ${
                selected === tab.key
                  ? "bg-[#005066] text-white"
                  : "bg-transparent text-[#333]"
              }`}
              style={{
                minWidth: tab.minWidth,
                lineHeight: "24px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="bg-[#F9D2EA] rounded-[16px] shadow-[40px_40px_100px_rgba(10,20,57,0.17)] p-4 w-full"
      >
        <div className="pl-2 mb-3">
          <SectionHeaderUnderline text="Revenue"  />
        </div>
        <div className="w-full px-2 pb-2" style={{ minHeight: 420 }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{
                top: 14,
                right: 24,
                left: 0,
                bottom: 20,
              }}
              barGap={16}
              barCategoryGap={32}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical
                horizontal
                stroke="rgba(148, 148, 148, 0.6)"
                strokeOpacity={1}
              />
              <YAxis
                type="number"
                domain={[5000, 25000]}
                ticks={yTicks}
                width={62}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 12,
                  fill: "rgba(0,0,0,0.7)",
                }}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
                interval={0}
              />
              <XAxis
                dataKey="location"
                axisLine={false}
                tickLine={false}
                height={36}
                tick={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 13,
                  fill: "rgba(0,0,0,0.7)",
                }}
                interval={0}
                padding={{ left: 15, right: 15 }}
              />
              <Bar
                dataKey="revenue"
                fill="#7086FD"
                opacity={0.8}
                barSize={60}
                radius={[0, 0, 0, 0]}
                isAnimationActive={false}
              />
              <Tooltip
                cursor={{ fill: "#7086FD11" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  background: "#fff",
                  fontSize: 13,
                  fontFamily: "Inter",
                  color: "#222",
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
                labelStyle={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="w-full flex flex-row justify-center items-center mt-3">
            <div className="flex flex-row items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white bg-[#7086FD] rounded-sm"></span>
              <span className="text-[12px] text-black/70 font-inter">2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAcrossLocations;
