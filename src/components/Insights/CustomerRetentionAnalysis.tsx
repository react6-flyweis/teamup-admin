import React from 'react';

interface RetentionMetric {
  label: string;
  value: string;
}

const CustomerRetentionAnalysis: React.FC = () => {
  const retentionMetrics: RetentionMetric[] = [
    {
      label: "Returning Customer",
      value: "480"
    },
    {
      label: "Churn Rate", 
      value: "22%"
    },
    {
      label: "Retention Rate",
      value: "78%"
    },
    {
      label: "At-Risk Customer",
      value: "95"
    }
  ];

  return (
    <section className="w-full">
      {/* Section Title */}
      <div className="mb-2">
        <h2 className="text-[22px] leading-[33px] font-bold text-white font-poppins">
          Customer Retention & Churn Rate Analysis
        </h2>
      </div>

      {/* Main Container */}
      <div 
        className="w-full rounded-2xl p-6 flex flex-col justify-center items-start gap-4"
        style={{ background: "#F9D2EA" }}
      >
        {/* Inner Content Container */}
        <div 
          className="w-full h-[108px] rounded-xl px-4 py-6 flex flex-row justify-between items-center gap-11"
          style={{ background: "#770F4E" }}
        >
          {retentionMetrics.map((metric, index) => (
            <React.Fragment key={metric.label}>
              {/* Metric Group */}
              <div className="flex flex-col justify-center h-[60px] flex-1">
                {/* Label */}
                <span className="text-xs leading-[18px] font-medium text-white font-poppins mb-[18px]">
                  {metric.label}
                </span>
                
                {/* Value */}
                <span className="text-base leading-6 font-bold text-white font-poppins">
                  {metric.value}
                </span>
              </div>

              {/* Vertical Divider Line - Don't show after last item */}
              {index < retentionMetrics.length - 1 && (
                <div 
                  className="w-px h-[34px]"
                  style={{ background: "#F9D2EA" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerRetentionAnalysis;
