import React from 'react';
import TrendUpIcon from '@/assets/icons/TrendUpIcon';

interface VenueData {
  name: string;
  amount: string;
}

interface ForecastCardProps {
  location: string;
  totalRevenue: string;
  venues: VenueData[];
  peakDay: string;
  lowestDay: string;
  promotionImpact: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  location,
  totalRevenue,
  venues,
  peakDay,
  lowestDay,
  promotionImpact
}) => {
  return (
    <div 
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{
        // width: 320,
        height: 511,
        background: "#F9D2EA",
        padding: "24px 16px",
        gap: 10
      }}
    >
      {/* Header with Location Tag */}
      <div className="flex flex-col items-end gap-2">
        <div 
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 122,
            height: 32,
            background: "#003240",
            borderRadius: 8,
            padding: "4px 16px"
          }}
        >
          <span 
            className="font-poppins font-semibold text-white"
            style={{
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 600
            }}
          >
            {location}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Revenue Forecast Header */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 32,
              height: 32,
              background: "#A3EBFF",
              borderRadius: 8
            }}
          >
            <TrendUpIcon size={24} color="#0D0D0D" />
          </div>
          <div className="flex flex-col">
            <span 
              className="font-poppins font-bold text-black"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 700
              }}
            >
              Revenue Forecast
            </span>
          </div>
        </div>

        {/* Total Forecasted Revenue */}
        <div className="flex flex-col gap-2">
          <span 
            className="font-poppins text-[#777777]"
            style={{
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 500
            }}
          >
            Total Forecasted Revenue
          </span>
          <span 
            className="font-poppins font-bold text-black"
            style={{
              fontSize: 22,
              lineHeight: "33px",
              fontWeight: 700
            }}
          >
            {totalRevenue}
          </span>
        </div>

        {/* Breakdown By Venue */}
        <div className="flex flex-col gap-4">
          <span 
            className="font-poppins text-[#777777]"
            style={{
              fontSize: 14,
              lineHeight: "24px",
              fontWeight: 500
            }}
          >
            Breakdown By Venue
          </span>
          
          <div className="flex flex-col gap-3">
            {venues.map((venue, index) => (
              <div key={index} className="flex justify-between items-center">
                <span 
                  className="font-poppins text-black"
                  style={{
                    fontSize: 12,
                    lineHeight: "24px",
                    fontWeight: 500
                  }}
                >
                  {venue.name}
                </span>
                <span 
                  className="font-poppins font-semibold text-black"
                  style={{
                    fontSize: 16,
                    lineHeight: "24px",
                    fontWeight: 600
                  }}
                >
                  {venue.amount}
                </span>
              </div>
            ))}

            {/* Peak Day */}
            <div className="flex justify-between items-center">
              <span 
                className="font-poppins text-black"
                style={{
                  fontSize: 12,
                  lineHeight: "24px",
                  fontWeight: 500
                }}
              >
                Peak Day (Expected)
              </span>
              <span 
                className="font-poppins font-semibold text-black"
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  fontWeight: 600
                }}
              >
                {peakDay}
              </span>
            </div>

            {/* Lowest Day */}
            <div className="flex justify-between items-center">
              <span 
                className="font-poppins text-black"
                style={{
                  fontSize: 12,
                  lineHeight: "24px",
                  fontWeight: 500
                }}
              >
                Lowest Day (Expected)
              </span>
              <span 
                className="font-poppins font-semibold text-black"
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  fontWeight: 600
                }}
              >
                {lowestDay}
              </span>
            </div>

            {/* Promotion Impact */}
            <div className="flex flex-col gap-2">
              <span 
                className="font-poppins text-black"
                style={{
                  fontSize: 12,
                  lineHeight: "24px",
                  fontWeight: 500
                }}
              >
                Promotion Impact -
              </span>
              <span 
                className="font-poppins font-semibold text-black"
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  fontWeight: 600
                }}
              >
                {promotionImpact}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevenueForecastingCards: React.FC = () => {
  const forecastData = [
    {
      location: "DownTown",
      totalRevenue: "$123,520",
      venues: [
        { name: "Axe Throwing & Ale", amount: "$41,253" },
        { name: "Beer Barn", amount: "$25,563" },
        { name: "Food & Drinks", amount: "$52,112" }
      ],
      peakDay: "June 2",
      lowestDay: "June 14",
      promotionImpact: "June 2 for 1 deal boosted booking by 18%"
    },
    {
      location: "Uptown",
      totalRevenue: "$123,520",
      venues: [
        { name: "Axe Throwing & Ale", amount: "$41,253" },
        { name: "Beer Barn", amount: "$25,563" },
        { name: "Food & Drinks", amount: "$52,112" }
      ],
      peakDay: "June 2",
      lowestDay: "June 14",
      promotionImpact: "June 2 for 1 deal boosted booking by 18%"
    },
    {
      location: "Midtown",
      totalRevenue: "$123,520",
      venues: [
        { name: "Axe Throwing & Ale", amount: "$41,253" },
        { name: "Beer Barn", amount: "$25,563" },
        { name: "Food & Drinks", amount: "$52,112" }
      ],
      peakDay: "June 2",
      lowestDay: "June 14",
      promotionImpact: "June 2 for 1 deal boosted booking by 18%"
    }
  ];

  return (
    <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {forecastData.map((data, index) => (
          <ForecastCard
            key={index}
            location={data.location}
            totalRevenue={data.totalRevenue}
            venues={data.venues}
            peakDay={data.peakDay}
            lowestDay={data.lowestDay}
            promotionImpact={data.promotionImpact}
          />
        ))}
      </div>
    </section>
  );
};

export default RevenueForecastingCards;
