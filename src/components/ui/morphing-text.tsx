import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  texts: string[];
  className?: string;
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsTransitioning(false);
      }, 350);
    }, 2400);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span
      className={cn(
        "inline-block text-[#ff7f46] relative underline decoration-[#ff7f46]/40 underline-offset-8 transition-all duration-350 ease-out transform",
        isTransitioning
          ? "opacity-0 -translate-y-2 blur-sm scale-95"
          : "opacity-100 translate-y-0 blur-0 scale-100",
        className
      )}
    >
      {texts[textIndex]}
    </span>
  );
}

export default MorphingText;
