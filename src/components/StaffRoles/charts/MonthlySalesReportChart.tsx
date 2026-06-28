import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend
} from "recharts";

const monthlySalesData = [
  { day: "Mon", value: 56 },
  { day: "Tue", value: 64 },
  { day: "Wed", value: 76 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 37 },
];

export default function MonthlySalesReportChart() {
  const yAxisLabels = ["On-Time", "Late", "Absent"];
  
  return (
    <div 
      className="bg-[#F9D2EA] rounded-[16px] flex flex-col"
      style={{
        width: "490px",
        height: "404px",
        padding: "16px",
        gap: "12px",
        boxShadow: "40px 40px 100px rgba(10, 20, 57, 0.4)"
      }}
    >
      {/* Header */}
      <div className="flex flex-row items-end" style={{ width: "458px", height: "40px" }}>
        <div className="flex flex-col justify-center items-start relative" style={{ width: "190px", height: "40px", padding: "0px 8px 4px", gap: "6px" }}>
          <h3 
            className="font-poppins font-bold text-black"
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "rgba(0, 0, 0, 0.9)",
              width: "174px",
              height: "24px"
            }}
          >
            Monthly Sales Report
          </h3>
          {/* Decorative underline */}
          <div className="absolute bottom-1 left-2" style={{ width: "147.5px", height: "3px" }}>
            <div 
              className="absolute"
              style={{
                width: "29px",
                height: "2px",
                left: "0px",
                top: "0px",
                background: "#3086F3",
                opacity: 0.5,
                filter: "blur(2.5px)"
              }}
            />
            <div 
              className="absolute"
              style={{
                width: "29px",
                height: "3px",
                left: "1px",
                top: "0px",
                background: "#07DBFA"
              }}
            />
            <div 
              className="absolute"
              style={{
                width: "200px",
                height: "1px",
                left: "33px",
                top: "1px",
                background: "rgba(0, 0, 0, 0.25)"
              }}
            />
          </div>
        </div>
        {/* Right side line element */}
        <div className="flex-1 relative" style={{ height: "40px" }}>
          <div 
            className="absolute bottom-1"
            style={{
              width: "800px",
              height: "6px",
              left: "0px",
              background: "rgba(0, 0, 0, 0.25)"
            }}
          />
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col items-start" style={{ width: "458px", height: "320px", padding: "8px" }}>
        {/* Chart and Axis */}
        <div className="flex flex-col items-start" style={{ width: "442px", height: "280px" }}>
          {/* Main Chart */}
          <div className="flex flex-row items-center relative" style={{ width: "442px", height: "259px", margin: "-2px 0px" }}>
            {/* Y-Axis Left */}
            <div className="flex flex-col justify-between items-end" style={{ width: "57px", height: "259px", padding: "0px 4px" }}>
              {yAxisLabels.map((label, index) => (
                <span 
                  key={index}
                  className="font-inter"
                  style={{
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "rgba(0, 0, 0, 0.7)",
                    textAlign: "center"
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            
            {/* Chart Area */}
            <div className="flex-1 relative" style={{ height: "259px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlySalesData}
                  margin={{ left: 32, right: 10, top: 7, bottom: 7 }}
                >
                  <CartesianGrid
                    strokeDasharray="1 1"
                    stroke="rgba(0, 0, 0, 0.25)"
                    horizontal={true}
                    vertical={true}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    height={0}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                    width={0}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8979FF"
                    strokeWidth={1}
                    dot={{
                      fill: "#8979FF",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      r: 4
                    }}
                    activeDot={{
                      fill: "#8979FF",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      r: 8,
                      fillOpacity: 0.25
                    }}
                    isAnimationActive={false}
                  />
                  <Tooltip
                    cursor={{ stroke: "#8979FF", strokeWidth: 1 }}
                    contentStyle={{
                      background: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontFamily: "Inter",
                      color: "rgba(0, 0, 0, 0.7)"
                    }}
                    formatter={(value: number) => [value, "Value"]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* X-Axis */}
          <div className="flex flex-row items-start" style={{ width: "442px", height: "23px", padding: "0px 0px 8px 29px" }}>
            {monthlySalesData.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-end flex-1"
                style={{ height: "15px" }}
              >
                <span 
                  className="font-inter"
                  style={{
                    fontSize: "12px",
                    lineHeight: "15px",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.7)",
                    width: "68.83px",
                    height: "15px"
                  }}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-row flex-wrap justify-center items-start" style={{ width: "442px", height: "24px" }}>
          <div className="flex flex-row flex-wrap justify-center items-center" style={{ width: "74px", height: "24px", padding: "0px 8px", gap: "0px 8px" }}>
            <div className="flex flex-row items-center" style={{ padding: "4px", gap: "4px", width: "58px", height: "24px" }}>
              <div className="relative" style={{ width: "16px", height: "16px" }}>
                <div 
                  className="absolute"
                  style={{
                    width: "16px",
                    height: "2px",
                    left: "0px",
                    top: "7px",
                    background: "#8979FF"
                  }}
                />
                <div 
                  className="absolute"
                  style={{
                    width: "8px",
                    height: "8px",
                    left: "4px",
                    top: "4px",
                    background: "#8979FF",
                    border: "1px solid #FFFFFF",
                    borderRadius: "50%"
                  }}
                />
              </div>
              <span 
                className="font-inter"
                style={{
                  width: "30px",
                  height: "15px",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "rgba(0, 0, 0, 0.7)"
                }}
              >
                2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}