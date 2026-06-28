// import React from "react";
// // import BgTexture from "@/assets/AuthBackground.jpg";
// import LoadingGif from "@/assets/Loading.gif";

// const DashboardLoader: React.FC = () => {
//   return (
//     /* Mount this inside the dashboard content wrapper (parent must be relative) */
//     <div
//       className="absolute inset-0 z-[60] flex items-center justify-center"
//       style={{
//     //     backgroundImage: `url(${BgTexture})`,
//     //     backgroundSize: "cover",
//     //     backgroundPosition: "center",
//     //     backgroundRepeat: "no-repeat",
//     //     backgroundColor: "rgba(0,0,0,0.35)",
//     //     backgroundBlendMode: "overlay",
//       }}
//     >
//       {/* Decorative triangle - top right */}
//       <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
//         <div
//           style={{
//             width: 0,
//             height: 0,
//             borderLeft: "70px solid white",
//             borderTop: "40px solid transparent",
//             borderBottom: "40px solid transparent",
//           }}
//         />
//       </div>

//       {/* Decorative ellipse - bottom left */}
//       <div
//         className="absolute left-6 bottom-6 w-12 h-12 rounded-full bg-white opacity-20 pointer-events-none"
//       />

//       {/* Center loader */}
//       <div className="flex flex-col items-center gap-3">
//         <span className="text-white text-lg font-semibold">Loading.....</span>
//         <img src={LoadingGif} alt="Loading..." className="w-40 h-40 object-contain" />
//       </div>
//     </div>
//   );
// };

// export default DashboardLoader;
import React from "react";
// import BgTexture from "@/assets/AuthBackground.jpg";
import LoadingGif from "@/assets/Loading.gif";

const DashboardLoader: React.FC = () => {
  return (
    /* Mount this inside the dashboard content wrapper (parent must be relative) */
    <div
      className=" flex items-center justify-center h-[calc(100vh-100px)]"
      style={{
    //     backgroundImage: `url(${BgTexture})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor: "rgba(0,0,0,0.35)",
    //     backgroundBlendMode: "overlay",
      }}
    >
      {/* Decorative triangle - top right */}
      {/* <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "70px solid white",
            borderTop: "40px solid transparent",
            borderBottom: "40px solid transparent",
          }}
        />
      </div> */}

      {/* Decorative ellipse - bottom left */}
      {/* <div
        className="absolute left-6 bottom-6 w-12 h-12 rounded-full bg-white opacity-20 pointer-events-none"
      /> */}

      {/* Center loader */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-white text-lg font-semibold">Loading.....</span>
        <img src={LoadingGif} alt="Loading..." className="w-40 h-40 object-contain" />
      </div>
    </div>
  );
};

export default DashboardLoader;
