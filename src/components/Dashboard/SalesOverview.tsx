import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Dropdown } from "../common/Dropdown";

const salesData = [
  { month: "Jan", value: 150000 },
  { month: "Feb", value: 210000 },
  { month: "Mar", value: 190000 },
  { month: "Apr", value: 230000 },
  { month: "May", value: 350000 },
  { month: "Jun", value: 490000 },
  { month: "Jul", value: 470000 },
  { month: "Aug", value: 400000 },
  { month: "Sep", value: 295000 },
  { month: "Oct", value: 320000 },
  { month: "Nov", value: 430000 },
  { month: "Dec", value: 520000 },
];

const tabs = [
  { label: "Individual Activity", key: "individual" },
  { label: "Overall", key: "overall" },
  { label: "Food Section", key: "food" },
  { label: "Drinks", key: "drinks" },
];

const periods = ["Yearly", "Monthly", "Weekly", "Daily"];

export default function SalesOverview() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  const [period, setPeriod] = useState(periods[0]);

  const yTicks = [0, 100000, 200000, 300000, 400000, 500000];

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center"
      style={{
        background: "#F9D2EA",
        borderRadius: 20,
        minHeight: 440,
        maxWidth: 1500,
        margin: "0 auto",
        boxSizing: "border-box",
        padding: "40px 24px 0 24px",
      }}
    >
      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between mb-6 ">
        <div>
          <div
            style={{
              fontFamily: "Poppins",
              color: "#000",
              fontWeight: 700,
              fontSize: 22,
              lineHeight: "31px",
            }}
          >
            Sales overview
          </div>
          <div
            style={{
              fontFamily: "Poppins",
              color: "#01B574",
              fontWeight: 700,
              fontSize: 14,
              lineHeight: "20px",
            }}
          >
            (+5) more in 2025
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {/* Primary Tabs */}
          <div
            className="flex flex-row p-1 gap-2"
            style={{
              background: "#A3EBFF",
              border: "1px solid #005066",
              borderRadius: 4,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
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
                    selectedTab === tab.key ? "#005066" : "transparent",
                  color: selectedTab === tab.key ? "#FFF" : "#333",
                  transition: "background 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Dropdown */}
          <Dropdown
            options={periods}
            value={period}
            onChange={setPeriod}
            width={170}
          />
        </div>
      </div>
      {/* Chart */}
      <div
        className="w-full"
        style={{
          height: 287,
          maxWidth: 1540,
          paddingLeft: "8px",
          paddingRight: "4px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 35, left: 45, bottom: 24 }}
          >
            <defs>
              <linearGradient id="chartStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#770F4E" stopOpacity={0.65} />
                <stop offset="80%" stopColor="#770F4E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="5 4"
              stroke="#56577A"
            />
            <YAxis
              dataKey="value"
              ticks={yTicks}
              domain={[0, 500000]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#000",
                fontSize: 14,
                fontFamily: "Montserrat",
                fontWeight: 700,
                dx: -10,
              }}
              tickFormatter={(v) => `$ ${v / 1000}k`}
              width={60}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#000",
                fontSize: 14,
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
              interval={0}
              padding={{ left: 14 }} // <<-- this creates the gap you want!
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#770F4E"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#chartStroke)"
              isAnimationActive={false}
            />
            <Tooltip
              contentStyle={{
                fontFamily: "Montserrat",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 10,
                border: "none",
              }}
              formatter={(v) => [
                `$${(+v / 1000).toLocaleString()}k`,
                "Revenue",
              ]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
