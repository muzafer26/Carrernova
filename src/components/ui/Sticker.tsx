import React from "react";

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

export function Sticker({ name, size = "md", className = "", animate = true, ...props }: StickerProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const animationClass = animate ? "animate-float" : "";
  const imgSrc = stickerMap[name] || stickerGraduate;

  return (
    <div className={`shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white/5 border border-white/10 shadow-lg ${sizeClasses[size]} ${animationClass} ${className}`} {...props}>
      <img src={imgSrc} alt={`${name} sticker`} className="w-full h-full object-contain drop-shadow-md" />
    </div>
  );
}

