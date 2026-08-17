import React from "react";
import { ArrowRight } from "lucide-react";

interface Button5Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  activeColor?: string;
}

export const Component = ({
  children = "Our Work",
  icon = <ArrowRight className="h-4 w-4" />,
  className = "",
  activeColor = "bg-primary text-primary-foreground",
  ...props
}: Button5Props) => {
  return (
    <button
      className={`group relative cursor-pointer px-6 py-2.5 min-w-32 border border-white/20 glass rounded-full overflow-hidden text-foreground text-center font-semibold text-sm transition-all ${className}`}
      {...props}
    >
      <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      <div
        className={`flex gap-2 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none ${activeColor}`}
      >
        <span>{children}</span>
        {icon}
      </div>
    </button>
  );
};
