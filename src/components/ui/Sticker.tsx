import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Target,
  Compass,
  Award,
  Lightbulb,
  Building2,
  Library,
  Microscope,
  Calculator,
  Trophy,
  Route,
  type LucideIcon,
} from "lucide-react";

import stickerScience from "@design/Stickers/image-0U8no8ynRfnqUFPPANBiF9N6wnQAGo.png";
import stickerTech from "@design/Stickers/image-61FptNC7iNIc1qSqjjRSyRS4n3DRSq.png";
import stickerCalc from "@design/Stickers/image-HCwnlHIkzR4wXtkTVAySMqAWigIejw.png";
import stickerBooks from "@design/Stickers/image-OnCRI34hCGPNdfRwXG2o0xwH40M0iI.png";
import stickerLibrary from "@design/Stickers/image-R8hVzCbyw0suI86qIO9VC6zGMTdoDV.png";
import stickerStudy from "@design/Stickers/image-S4uSpPnTp4twy9dQ0gSVfwPIGe7R8s.png";
import stickerCampus from "@design/Stickers/image-XBjLVIOu2qaS6MevOloqBTMwan2sQW.png";
import stickerClassroom from "@design/Stickers/image-cUglLCcpw1XqZkTPP2z8ciYLxT7z07.png";
import stickerLaptop from "@design/Stickers/image-eP5KQCJDDuVeP72aHPCoeYD7Z9qWzZ.png";
import stickerCollege from "@design/Stickers/image-g3FqAQJ8QYZHlAEHxz5jeyVTX6fuuZ.png";
import stickerGraduate from "@design/Stickers/image-iZKfmUSHuQtDn1W2NBIwoLZ0epsnzZ.png";

export type StickerName =
  | "graduate"
  | "books"
  | "target"
  | "compass"
  | "certificate"
  | "lightbulb"
  | "college"
  | "backpack"
  | "microscope"
  | "calculator"
  | "trophy"
  | "pathway";

interface StickerProps extends React.HTMLAttributes<HTMLDivElement> {
  name: StickerName;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  priority?: boolean;
}

const stickerMap: Record<StickerName, string> = {
  graduate: stickerGraduate,
  books: stickerBooks,
  target: stickerStudy,
  compass: stickerLaptop,
  certificate: stickerClassroom,
  lightbulb: stickerTech,
  college: stickerCollege,
  backpack: stickerLibrary,
  microscope: stickerScience,
  calculator: stickerCalc,
  trophy: stickerCampus,
  pathway: stickerTech,
};

const stickerIconMap: Record<StickerName, { icon: LucideIcon; color: string; bg: string }> = {
  graduate: { icon: GraduationCap, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
  books: { icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  target: { icon: Target, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" },
  compass: { icon: Compass, color: "text-indigo-500", bg: "bg-indigo-500/10 border-indigo-500/20" },
  certificate: { icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  lightbulb: { icon: Lightbulb, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
  college: { icon: Building2, color: "text-sky-500", bg: "bg-sky-500/10 border-sky-500/20" },
  backpack: { icon: Library, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
  microscope: { icon: Microscope, color: "text-teal-500", bg: "bg-teal-500/10 border-teal-500/20" },
  calculator: { icon: Calculator, color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" },
  trophy: { icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  pathway: { icon: Route, color: "text-violet-500", bg: "bg-violet-500/10 border-violet-500/20" },
};

// Global memory cache to track loaded stickers across component mounts
const loadedImagesCache = new Set<string>();

// Eager preload in browser background for high priority stickers
if (typeof window !== "undefined") {
  const priorityStickers: StickerName[] = ["graduate", "books", "college", "compass", "target", "trophy"];
  priorityStickers.forEach((name) => {
    const src = stickerMap[name];
    if (src && !loadedImagesCache.has(src)) {
      const img = new Image();
      img.onload = () => loadedImagesCache.add(src);
      img.src = src;
    }
  });
}

export function Sticker({ name, size = "md", className = "", animate = true, priority = false, ...props }: StickerProps) {
  const imgSrc = stickerMap[name] || stickerGraduate;
  const iconInfo = stickerIconMap[name] || stickerIconMap.graduate;
  const IconComponent = iconInfo.icon;

  const [isLoaded, setIsLoaded] = useState<boolean>(() => loadedImagesCache.has(imgSrc));

  useEffect(() => {
    if (loadedImagesCache.has(imgSrc)) {
      setIsLoaded(true);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.src = imgSrc;
    if (img.complete) {
      loadedImagesCache.add(imgSrc);
      if (isMounted) setIsLoaded(true);
    } else {
      img.onload = () => {
        loadedImagesCache.add(imgSrc);
        if (isMounted) setIsLoaded(true);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [imgSrc]);

  const sizeClasses = {
    sm: "w-10 h-10 min-w-10 min-h-10",
    md: "w-16 h-16 min-w-16 min-h-16",
    lg: "w-24 h-24 min-w-24 min-h-24",
    xl: "w-32 h-32 min-w-32 min-h-32",
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const animationClass = animate ? "animate-float transition-all duration-300" : "";

  return (
    <div
      className={`shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 shadow-lg relative overflow-hidden select-none ${sizeClasses[size]} ${animationClass} ${className}`}
      {...props}
    >
      {/* 1. Instant fallback icon badge shown 0ms while 3D sticker loads */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-2xl ${iconInfo.bg} transition-opacity duration-500 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <IconComponent className={`${iconSizes[size]} ${iconInfo.color} animate-pulse`} />
      </div>

      {/* 2. High-res 3D PNG sticker cross-faded in once loaded */}
      <img
        src={imgSrc}
        alt={`${name} sticker`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => {
          loadedImagesCache.add(imgSrc);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-contain drop-shadow-md relative z-10 transition-all duration-500 transform ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
    </div>
  );
}


