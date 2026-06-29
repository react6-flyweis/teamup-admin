import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white p-6">
      <div className="relative flex flex-col items-center max-w-md text-center bg-[#1C1C1C] border border-[#3A3530] p-8 md:p-12 rounded-2xl shadow-xl backdrop-blur-md">
        
        {/* Neon accent glowing circle */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#E1017D]/10 rounded-full blur-xl border border-[#E1017D]/20 flex items-center justify-center">
          <span className="text-4xl font-extrabold text-[#E1017D] select-none animate-pulse">404</span>
        </div>

        {/* Outer space margin for absolute header element */}
        <div className="h-12"></div>

        <h2 className="text-3xl font-bold font-poppins text-white mb-3 mt-4 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 font-raleway text-sm md:text-base mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#E1017D] hover:bg-[#c0016a] text-white py-3 px-6 rounded-xl font-bold font-poppins text-sm tracking-wide transition-all duration-200 shadow-[0_0_15px_rgba(225,1,125,0.4)] hover:shadow-[0_0_25px_rgba(225,1,125,0.6)] transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
