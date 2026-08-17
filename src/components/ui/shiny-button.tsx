import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 1 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.96 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      mass: 0.5,
    },
  },
} as HTMLMotionProps<"button">;

export interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...animationProps}
        {...props}
        className={cn(
          "relative rounded-full px-7 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[#ff7f46] overflow-hidden flex items-center justify-center gap-2",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <span
          className="absolute inset-0 z-20 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0)_calc(var(--x)+10%),rgba(255,255,255,0.6)_calc(var(--x)+25%),rgba(255,255,255,0)_calc(var(--x)+40%))] pointer-events-none"
        />
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
