import { createFileRoute } from "@tanstack/react-router";
import { AdvisorChat } from "@/components/advisor/AdvisorChat";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/mentor")({ component: MentorPage });

export default function MentorPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xl relative overflow-hidden">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl shrink-0 shadow-sm">
          <Sticker name="compass" size="xl" animate={false} />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black text-[#4582ff] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f46]" />
            REAL-TIME CAREERNOVA AI ADVISOR FOR J&K
          </div>
          <h1 className="text-3xl font-extrabold font-display text-[#0f2239]">Ask an Advisor</h1>
          <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
            Get instant, source-backed guidance on academic stream choices after Class 10, degree options across J&K Government Degree Colleges, scholarships (PMSSS), and official admission steps.
          </p>
        </div>
      </div>

      {/* Main Interactive Advisor Chat Interface */}
      <AdvisorChat />
    </div>
  );
}