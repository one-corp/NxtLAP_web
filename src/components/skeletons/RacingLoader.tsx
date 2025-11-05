"use client";

import { Car, Flag } from "lucide-react";

export const RacingLoader = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Racing Track Animation */}
        <div className="relative w-full max-w-md h-24 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-full border-4 border-slate-600 overflow-hidden">
          {/* Track Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-white/30 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
            </div>
          </div>
          
          {/* Racing Car */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 animate-[race_3s_ease-in-out_infinite]">
            <div className="relative">
              <Car className="w-8 h-8 text-red-500 rotate-90" />
              {/* Exhaust Trail */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-gradient-to-l from-orange-400 to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Checkered Flag */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <Flag className="w-6 h-6 text-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h3 className="text-lg font-bold text-gradient">Loading Races</h3>
          
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Speed Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-[speedLine_2s_ease-in-out_infinite]"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.2}s`,
                width: '100%',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes race {
          0% {
            left: -2rem;
            transform: translateY(-50%) scale(0.8);
          }
          50% {
            transform: translateY(-50%) scale(1.1);
          }
          100% {
            left: calc(100% - 2rem);
            transform: translateY(-50%) scale(0.8);
          }
        }
        
        @keyframes speedLine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};