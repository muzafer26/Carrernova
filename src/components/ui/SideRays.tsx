import React from "react";

export interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: "top-right" | "top-left" | "top-center";
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
}

export function SideRays({
  speed = 2.5,
  rayColor1 = "#ff7f46", // Eduor Coral Orange
  rayColor2 = "#4582ff", // Eduor Blue
  intensity = 1.5,
  spread = 2,
  origin = "top-right",
  tilt = 0,
  saturation = 1.2,
  blend = 0.75,
  falloff = 1.6,
  opacity = 0.6,
  className = "",
}: SideRaysProps) {
  const originClass =
    origin === "top-right"
      ? "top-0 right-0 -mr-20 -mt-20"
      : origin === "top-left"
      ? "top-0 left-0 -ml-20 -mt-20"
      : "top-0 left-1/2 -translate-x-1/2 -mt-20";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    >
      {/* Animated Light Rays Container */}
      <div
        className={`absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-40 animate-pulse ${originClass}`}
        style={{
          background: `radial-gradient(circle at center, ${rayColor1} 0%, ${rayColor2} 45%, transparent 70%)`,
          filter: `saturate(${saturation}) blur(60px)`,
          animationDuration: `${speed * 3}s`,
          transform: `rotate(${tilt}deg) scale(${spread})`,
        }}
      />

      {/* Sweeping Beam 1 */}
      <div
        className={`absolute w-[600px] h-[600px] ${originClass}`}
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, ${rayColor1} 0deg, transparent 40deg, ${rayColor2} 80deg, transparent 140deg, ${rayColor1} 200deg, transparent 300deg)`,
          maskImage: `radial-gradient(circle at center, black 0%, transparent ${falloff * 40}%)`,
          WebkitMaskImage: `radial-gradient(circle at center, black 0%, transparent ${falloff * 40}%)`,
          opacity: blend * 0.4,
          mixBlendMode: "multiply",
          animation: `spin ${speed * 8}s linear infinite`,
        }}
      />

      {/* Secondary Soft Glow Beam */}
      <div
        className={`absolute w-[750px] h-[750px] ${originClass}`}
        style={{
          background: `radial-gradient(ellipse at center, ${rayColor2} 0%, transparent 60%)`,
          opacity: intensity * 0.2,
          filter: `blur(80px)`,
        }}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SideRays;
