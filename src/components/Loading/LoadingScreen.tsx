import React from "react";
import TeamUpLogo from "@/assets/TeamUp.png"; // your logo
import LoadingGif from "@/assets/Loading.gif"; // your lottie/screenshot placeholder
import BgTexture from "@/assets/AuthBackground.jpg"; // your background texture


const FullScreenLoader: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${BgTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-hidden
    >
      {/* Logo (top-left) */}
      <div className="absolute left-[44px] top-[40px] w-[150px] h-[60.78px]">
        <img src={TeamUpLogo} alt="Team Up Logo" className="w-full h-full object-contain" />
      </div>

      {/* Triangle (top-right) - real triangle via borders */}
      <div className="absolute top-[50px] right-[46px] opacity-20 pointer-events-none" aria-hidden>
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "94px solid transparent",
            borderBottom: "94px solid transparent",
            borderLeft: "164px solid white",
          }}
        />
      </div>

      {/* Ellipse (bottom-left) */}
      <div
        className="absolute rounded-full bg-white opacity-20 pointer-events-none"
        style={{
          width: "67px",
          height: "67px",
          left: "218px",
          bottom: "80px",
        }}
        aria-hidden
      />

      {/* Center content */}
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-white font-roboto font-bold text-[45px] leading-[52px]">
          Loading.....
        </h1>

        <img
          src={LoadingGif}
          alt="Loading animation"
          className="w-[306.4px] h-[292.92px] object-contain"
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
