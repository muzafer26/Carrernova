import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/registry/magicui/animated-list";
import { Sticker, type StickerName } from "@/components/ui/Sticker";

interface StudentJourneyItem {
  name: string;
  description: string;
  sticker: StickerName;
  color: string;
  borderColor: string;
  time: string;
  badge: string;
}

const studentNotifications: StudentJourneyItem[] = [
  {
    name: "Class 10 Stream & ITI Decision",
    description: "Explored JKBOSE Science, Commerce, and Arts streams with ITI trade alternatives.",
    time: "Step 1–2",
    sticker: "graduate",
    color: "#ff7f46",
    borderColor: "border-l-[#ff7f46]",
    badge: "Stage 10th",
  },
  {
    name: "Class 12 NEP Degree Matching",
    description: "Evaluated 4-Year FYUGP degree eligibility under University of Jammu & Kashmir.",
    time: "Step 3–5",
    sticker: "lightbulb",
    color: "#4582ff",
    borderColor: "border-l-[#4582ff]",
    badge: "Stage 12th",
  },
  {
    name: "01–09 Pathway Deep Dive",
    description: "Inspected statutory prerequisites, core curriculum, verified colleges, and financial support.",
    time: "Step 6–7",
    sticker: "pathway",
    color: "#8c52ff",
    borderColor: "border-l-[#8c52ff]",
    badge: "01–09 Breakdown",
  },
  {
    name: "Verified J&K District GDC Map",
    description: "Filtered affiliated Government Degree Colleges by district and openstreetmap geographic markers.",
    time: "Step 8",
    sticker: "college",
    color: "#00d6d3",
    borderColor: "border-l-[#00d6d3]",
    badge: "Locality Map",
  },
  {
    name: "Official Action & Portal Links",
    description: "Direct links to J&K Samarth Portal, J&K DSD ITI, and JKPSC/JKSSB recruitment portals.",
    time: "Step 9",
    sticker: "target",
    color: "#9dbd00",
    borderColor: "border-l-[#9dbd00]",
    badge: "Official Next Step",
  },
];

const NotificationCard = ({ name, description, sticker, color, borderColor, time, badge }: StudentJourneyItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[520px] cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-[102%] group",
        "bg-gradient-to-r from-white via-[#fcfdfe] to-white border border-slate-200/80 shadow-md hover:shadow-xl border-l-4",
        borderColor
      )}
    >
      <div className="flex flex-row items-center gap-4">
        {/* 3D Sticker Container */}
        <div className="relative shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Sticker name={sticker} size="md" className="shadow-md" />
        </div>

        {/* Card Details */}
        <div className="flex flex-col overflow-hidden flex-1 space-y-1">
          <figcaption className="flex flex-row items-center justify-between font-display">
            <span className="text-xs sm:text-sm font-extrabold text-[#0f2239] group-hover:text-[#ff7f46] transition-colors">
              {name}
            </span>
            <span
              className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full text-white shadow-sm"
              style={{ backgroundColor: color }}
            >
              {badge}
            </span>
          </figcaption>
          <p className="text-xs text-[#636363] leading-relaxed font-medium">
            {description}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-bold text-slate-400">{time}</span>
            <span className="text-[10px] font-extrabold text-[#4582ff] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              Verified Path →
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
};

export function StudentJourneyAnimatedList({ className }: { className?: string }) {
  return (
    <div className="w-full space-y-4">
      <div className="text-center space-y-1 mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4582ff] uppercase tracking-wider">
          <span className="w-2 h-2 bg-[#4582ff] inline-block" />
          LIVE GUIDED JOURNEY LOG
          <span className="w-2 h-2 bg-[#4582ff] inline-block" />
        </div>
        <h3 className="text-xl md:text-3xl font-extrabold font-display text-[#0f2239]">
          Your Guided Student Journey
        </h3>
        <p className="text-xs md:text-sm text-[#636363] max-w-md mx-auto">
          Real-time step progression for J&K students finding their ideal college stream.
        </p>
      </div>

      <div
        className={cn(
          "relative flex h-[410px] w-full flex-col overflow-hidden p-3 rounded-3xl bg-slate-50/60 border border-slate-200/80 shadow-inner",
          className
        )}
      >
        <AnimatedList delay={2200}>
          {studentNotifications.map((item, idx) => (
            <NotificationCard {...item} key={idx} />
          ))}
        </AnimatedList>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
      </div>
    </div>
  );
}

export default StudentJourneyAnimatedList;
