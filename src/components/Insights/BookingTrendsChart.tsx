import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import CalendarIcon from "@/assets/icons/CalendarIcon";

type TimePeriod = "Daily" | "Weekly" | "Monthly";

// --- KNEE UNDERLINE COMPONENT ---
const SectionHeaderUnderline: React.FC<{ text: string }> = ({
  text,
}) => {
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
        className="font-poppins font-bold text-[22px] text-black mb-2"
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

// Sample data for the booking trends - fixed to remove gaps
const bookingData = [
  { time: "11:00 AM - 13:00 PM", downtown: 550, uptown: 480 },
  { time: "13:00 PM - 15:00 PM", downtown: 420, uptown: 360 },
  { time: "15:00 PM - 17:00 PM", downtown: 450, uptown: 370 },
  { time: "17:00 PM - 19:00 PM", downtown: 280, uptown: 220 },
  { time: "19:00 PM - 21:00 PM", downtown: 380, uptown: 330 },
  { time: "21:00 PM - 00:00 AM", downtown: 460, uptown: 400 }
];

const timePeriods: TimePeriod[] = ["Daily", "Weekly", "Monthly"];

export default function BookingTrendsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Daily");
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <section className="w-full">
      {/* Header Controls */}
      <div className="flex justify-end items-center mb-6">
        <div className="flex gap-4 items-center">
          {/* Custom Date Picker */}
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-[200px] p-3 pr-12 border border-[#AEB4C2] rounded-lg bg-white font-poppins text-base text-[#333] placeholder-[#999]"
              placeholder="Select Custom Date"
              autoComplete="off"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <CalendarIcon size={20} color="#666" />
            </span>
          </div>

          {/* Time Period Tabs */}
          <div
            className="flex flex-row p-1 gap-2"
            style={{
              background: "#A3EBFF",
              border: "1px solid #005066",
              borderRadius: 4,
            }}
          >
            {timePeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className="flex items-center justify-center"
                style={{
                  minWidth: 76,
                  borderRadius: 4,
                  padding: "8px 16px",
                  height: 40,
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "24px",
                  background:
                    selectedPeriod === period ? "#005066" : "transparent",
                  color: selectedPeriod === period ? "#FFF" : "#333",
                  transition: "background 0.2s",
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div 
        className="rounded-2xl overflow-hidden shadow-lg relative"
        style={{
          width: "100%",
          height: 544,
          background: "#F9D2EA",
          boxShadow: "40px 40px 100px rgba(10, 20, 57, 0.4)",
        }}
      >
        {/* Chart Title and Legend */}
        <div className="flex justify-between items-end p-4 pb-2">
          <div className="pl-2 mb-3">
            <SectionHeaderUnderline text="Booking Trends" />
          </div>
          
          {/* Legend */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-3">
              <div 
                className="w-[57px] h-[26px] rounded"
                style={{ background: "#570B39" }}
              />
              <span 
                className="font-poppins text-[#333333]"
                style={{ fontSize: 12, lineHeight: "18px" }}
              >
                Downtown
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="w-[57px] h-[26px] rounded"
                style={{ background: "#003240" }}
              />
              <span 
                className="font-poppins text-[#333333]"
                style={{ fontSize: 12, lineHeight: "18px" }}
              >
                Uptown
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full px-2 pb-2" style={{ minHeight: 420 }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={bookingData}
              margin={{
                top: 14,
                right: 24,
                left: 0,
                bottom: 20,
              }}
            >
              {/* Grid Lines */}
              <CartesianGrid
                strokeDasharray="4 4"
                vertical
                horizontal
                stroke="rgba(148, 148, 148, 0.6)"
                strokeOpacity={1}
              />
              
              {/* Y Axis */}
              <YAxis
                type="number"
                domain={[150, 550]}
                ticks={[150, 250, 350, 450, 550]}
                width={62}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 12,
                  fill: "rgba(0,0,0,0.7)",
                }}
                interval={0}
                allowDecimals={false}
              />
              
              {/* X Axis */}
              <XAxis
                dataKey="time"
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

              {/* Lines */}
              <Line
                type="monotone"
                dataKey="downtown"
                stroke="#770F4E"
                strokeWidth={2}
                dot={{ 
                  fill: "#570B39", 
                  strokeWidth: 0, 
                  r: 7 
                }}
                activeDot={{ 
                  r: 8, 
                  fill: "#570B39",
                  strokeWidth: 2,
                  stroke: "#fff"
                }}
                isAnimationActive={false}
              />
              
              <Line
                type="monotone"
                dataKey="uptown"
                stroke="#003240"
                strokeWidth={2}
                dot={{ 
                  fill: "#003240", 
                  strokeWidth: 0, 
                  r: 7 
                }}
                activeDot={{ 
                  r: 8, 
                  fill: "#003240",
                  strokeWidth: 2,
                  stroke: "#fff"
                }}
                isAnimationActive={false}
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

          <div className="w-full flex flex-row justify-center items-center mt-3 mb-4">
            <div className="flex flex-row items-center gap-2">
              <span className=" inline-block w-4 h-4 border-2 border-white bg-[#7086FD] rounded-sm"></span>
              <span className="text-[12px] text-black/70 font-inter">2025</span>
            </div>
          </div>
      </div>
    </section>
  );
}
