import CalendarOutlineIcon from "@/assets/icons/CalendarIcon";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

// Demo Data
const salesSummary = [
  { label: "Total Revenue", value: "$1250" },
  { label: "Top Game", value: "Axe Throwing" },
  { label: "Cash Payment", value: "$300" },
  { label: "Card Payment", value: "$750" },
  { label: "Mobile Payment", value: "$200" },
  { label: "Top Food Item", value: "Beer, Burger, Fries" }
];

const monthlyData = [
  { month: "Jan", value: 650 },
  { month: "Feb", value: 730 },
  { month: "Mar", value: 860 },
  { month: "Apr", value: 950 },
  { month: "May", value: 960 },
  { month: "Jun", value: 540 }
];

const peakData = [
  { hour: "18:00", value: 340 },
  { hour: "19:00", value: 410 },
  { hour: "20:00", value: 520 },
  { hour: "21:00", value: 530 },
  { hour: "22:00", value: 480 },
  { hour: "23:00", value: 290 }
];



export default function Report() {
  return (
    <div className="min-h-screen py-6" style={{ background: "#232222" }}>
      {/* Header */}
      <div className="flex flex-row items-center justify-between  mb-6 px-4">
        <span
          className="font-bold text-white text-[22px]"
          style={{ fontFamily: "Poppins" }}
        >
          Reports
        </span>
        <div
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-[8px]"
          style={{ height: 48, minWidth: 180 }}
        >
          <CalendarOutlineIcon />
          <span
            className="font-bold text-black text-[16px]"
            style={{ fontFamily: "Poppins" }}
          >
            Date Range
          </span>
        </div>
      </div>

      {/* Daily Sales Report Card */}
      <div className="rounded-[16px] bg-[#F9D2EA] p-6  w-full  mb-8">
        <div>
          <div
            className="font-bold text-[22px]"
            style={{ fontFamily: "Poppins", color: "#000" }}
          >
            Daily Sales Report
          </div>
          <div
            className="text-[12px] text-[#565656] font-medium"
            style={{ fontFamily: "Poppins" }}
          >
            Overview of Today's Sale
          </div>
        </div>
        <div className="mt-5 bg-[#770F4E] rounded-[12px] py-6 px-4 flex flex-row items-center justify-between gap-2">
          {salesSummary.map((col, idx) => (
            <React.Fragment key={col.label}>
              <div className="flex flex-col items-start min-w-[100px] gap-3">
                <span
                  className="text-white text-[12px] font-medium"
                  style={{ fontFamily: "Poppins" }}
                >
                  {col.label}
                </span>
                <span
                  className="text-white text-[16px] font-bold"
                  style={{ fontFamily: "Poppins" }}
                >
                  {col.value}
                </span>
              </div>
              {idx < salesSummary.length - 1 && (
                <div
                  aria-hidden
                  className="h-8 border-l-[1.5px] border-[#F9D2EA] opacity-60 mx-3"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Cards Row */}
      <div className="flex flex-row gap-6  w-full ">
        {/* Monthly Sales Report */}
        <div
          className="bg-[#F9D2EA] rounded-[16px] shadow p-6 flex-1 flex flex-col"
          style={{ minWidth: 335, maxWidth: 600, height: 350 }}
        >
          <div className="mb-3">
            <span
              className="font-bold text-[16px] pb-1 border-b-2 border-[#B0A5FE]"
              style={{ fontFamily: "Poppins", color: "#000" }}
            >
              Monthly Sales Report
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid stroke="#bbb" strokeDasharray="5 5" />
              <XAxis
                dataKey="month"
                tick={{ fontFamily: "Inter", fill: "#222", fontSize: 13 }}
              />
              <YAxis
                tickFormatter={v => `$${v}`}
                tick={{ fontFamily: "Inter", fill: "#222", fontSize: 13 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8979FF"
                strokeWidth={2}
                dot={{
                  stroke: "#fff",
                  strokeWidth: 2,
                  fill: "#8979FF",
                  r: 4
                }}
                activeDot={{ r: 7 }}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          <div className="w-full flex flex-row justify-center items-center mt-3">
            <span
              className="inline-block w-4 h-4 rounded-full mr-2"
              style={{
                background: "#8979FF",
                border: "1.5px solid #fff"
              }}
            />
            <span
              className="text-[14px] font-bold"
              style={{
                fontFamily: "Inter",
                color: "rgba(0,0,0,0.7)",
                letterSpacing: 1
              }}
            >
              2025
            </span>
          </div>
        </div>
        {/* Peak Hours */}
        <div
          className="bg-[#F9D2EA] rounded-[16px] shadow p-6 flex-1 flex flex-col relative"
          style={{ minWidth: 335, maxWidth: 600, height: 350 }}
        >
          <div className="mb-3 flex flex-row items-center justify-between">
            <span
              className="font-bold text-[16px] pb-1 border-b-2 border-[#3cdde9]"
              style={{ fontFamily: "Poppins", color: "#000" }}
            >
              Peak Hours
            </span>
            <span
              className="absolute top-6 right-6 text-[10px] text-gray-400 font-bold uppercase"
              style={{ fontFamily: "Inter" }}
            >
              MORE
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={peakData}>
              <CartesianGrid stroke="#bbb" strokeDasharray="5 5" />
              <XAxis
                dataKey="hour"
                tick={{ fontFamily: "Inter", fill: "#222", fontSize: 13 }}
              />
              <YAxis
                tick={{ fontFamily: "Inter", fill: "#222", fontSize: 13 }}
              />
              <Bar dataKey="value" fill="#7086FD" barSize={36} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
          <div className="w-full flex flex-row justify-center items-center mt-3">
            <span
              className="inline-block w-4 h-4 rounded mr-2"
              style={{
                background: "#7086FD",
                border: "1.5px solid #fff"
              }}
            />
            <span
              className="text-[14px] font-bold"
              style={{
                fontFamily: "Inter",
                color: "rgba(0,0,0,0.7)",
                letterSpacing: 1
              }}
            >
              2023
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
