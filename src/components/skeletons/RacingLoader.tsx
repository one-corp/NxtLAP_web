"use client";

import Image from "next/image";
import Car from "../../../public/car.svg";

export const RacingLoader = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Racing Track Animation */}
        <div className="relative w-full max-w-md h-24 overflow-hidden">
          {/* Bouncing Racing Car with tilt */}
          <div className="absolute top-1/2 left-1/3 transform translate-x-18 -translate-y-1/2 animate-[bounce_0.6s_ease-in-out_infinite]">
            <div className="relative animate-[tilt_0.8s_ease-in-out_infinite]">
              {/* Car Image */}
              <div className="relative">
                <Image
                  src={Car}
                  width={60}
                  height={60}
                  alt="car loader svg"
                  className="drop-shadow-2xl"
                />
                
                {/* Rotating Wheels */}
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-slate-900 rounded-full border-2 border-slate-600 animate-[wheelSpin_0.4s_linear_infinite]">
                  <div className="absolute inset-0 border-l-2 border-white rounded-full"></div>
                </div>
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-slate-900 rounded-full border-2 border-slate-600 animate-[wheelSpin_0.4s_linear_infinite]">
                  <div className="absolute inset-0 border-l-2 border-white rounded-full"></div>
                </div>
              </div>

              {/* Turbo Boost Flames */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 animate-[turbo_0.3s_ease-in-out_infinite]">
                <div className="w-4 h-2 bg-gradient-to-r from-orange-500 to-transparent rounded-full opacity-80"></div>
                <div className="w-3 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full -mt-1 ml-1"></div>
                <div className="w-4 h-2 bg-gradient-to-r from-red-500 to-transparent rounded-full -mt-1"></div>
              </div>
              
              {/* Exhaust smoke puffs */}
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-gray-400/60 rounded-full animate-[smoke_1s_ease-out_infinite]"></div>
                <div className="w-2 h-2 bg-gray-400/40 rounded-full animate-[smoke_1s_ease-out_infinite] absolute top-0 left-2" style={{ animationDelay: "0.3s" }}></div>
                <div className="w-2 h-2 bg-gray-400/30 rounded-full animate-[smoke_1s_ease-out_infinite] absolute top-0 left-4" style={{ animationDelay: "0.6s" }}></div>
              </div>

              {/* Speed sparks */}
              <div className="absolute -right-2 bottom-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-[spark_0.5s_ease-out_infinite]"></div>
                <div className="w-1 h-1 bg-yellow-500 rounded-full animate-[spark_0.5s_ease-out_infinite] absolute -top-1 left-0" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-[spark_0.5s_ease-out_infinite] absolute top-1 left-1" style={{ animationDelay: "0.4s" }}></div>
              </div>

              {/* Speed lines coming from car */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 animate-[speedDash_0.6s_ease-out_infinite]">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent -translate-x-full"></div>
                <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent -translate-x-full mt-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text with Racing Theme */}
        <div className="text-center space-y-3">
          {/* Racing Traffic Light dots */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-800 rounded-lg border-2 border-slate-600">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-[trafficLight_3s_ease-in-out_infinite] shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-[trafficLight_3s_ease-in-out_infinite] shadow-lg shadow-yellow-500/50" style={{ animationDelay: "1s" }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-[trafficLight_3s_ease-in-out_infinite] shadow-lg shadow-green-500/50" style={{ animationDelay: "2s" }}></div>
            </div>
          </div>
        </div>

        {/* Speed Lines Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[speedLine_1.5s_ease-in-out_infinite]"
              style={{
                top: `${15 + i * 12}%`,
                animationDelay: `${i * 0.15}s`,
                width: '100%',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-15px) translateX(-50%);
          }
          50% {
            transform: translateY(5px) translateX(-50%) scale(0.95);
          }
        }

        @keyframes tilt {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg) scale(1.05);
          }
        }

        @keyframes wheelSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes turbo {
          0%, 100% {
            transform: translateX(0) scaleX(1);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-3px) scaleX(1.3);
            opacity: 1;
          }
        }

        @keyframes trackMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes smoke {
          0% {
            transform: translateX(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateX(-30px) scale(1.8);
            opacity: 0;
          }
        }

        @keyframes spark {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-20px) translateY(-10px) scale(0);
            opacity: 0;
          }
        }

        @keyframes speedDash {
          0% {
            transform: translateY(-50%) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) translateX(-30px);
            opacity: 0;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(-50%) rotate(-10deg);
          }
          50% {
            transform: translateY(-50%) rotate(10deg);
          }
        }

        @keyframes cheer {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.3) translateY(-5px);
          }
        }

        @keyframes trafficLight {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          33% {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 20px currentColor;
          }
        }

        @keyframes textPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes speedLine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
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
