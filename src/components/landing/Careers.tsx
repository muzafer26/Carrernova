import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import { Sticker, type StickerName } from "@/components/ui/Sticker";

const verifiedStreams: {
  title: string;
  desc: string;
  courses: string[];
  link: string;
  sticker: StickerName;
}[] = [
  {
    title: "Class 10 Stream & ITI Trades",
    desc: "Decide between JKBOSE Science, Commerce, and Arts streams, or explore immediate NSQF ITI trade diplomas.",
    courses: ["Science Stream (11–12)", "Commerce Stream", "Arts Stream", "ITI Computer Hardware"],
    link: "/dashboard/journey",
    sticker: "books",
  },
  {
    title: "NEP-2020 4-Year Degrees (10+2)",
    desc: "4-Year FYUGP degree programs available across verified J&K Government Degree Colleges by district.",
    courses: ["B.Sc Computer Application", "B.Sc Biotechnology", "B.Com (Hons)", "BBA", "B.A. Social Sciences"],
    link: "/dashboard/journey",
    sticker: "microscope",
  },
  {
    title: "Vocational Skills & Govt Cadres",
    desc: "Direct practical entry via ITI technical diplomas or long-term preparation for JKPSC & JKSSB competitive cadres.",
    courses: ["NSQF Level 4/5 ITI Trade", "JKPSC Civil Services CCE", "JKSSB Executive Cadres"],
    link: "/dashboard/journey",
    sticker: "trophy",
  },
];

export function Careers() {
  return (
    <section id="explore" className="py-20 border-t border-slate-200/80 relative">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4582ff] uppercase tracking-wider">
            <span className="w-2 h-2 bg-[#4582ff] inline-block" />
            OUR COURSE CATEGORIES
            <span className="w-2 h-2 bg-[#4582ff] inline-block" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-[#0f2239]">
            What You Can Explore
          </h2>
          <p className="text-sm md:text-base text-[#636363] max-w-2xl mx-auto">
            Explore verified undergraduate degree programs, Class 10 stream options, and skill trade pathways across Jammu & Kashmir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedStreams.map((st, idx) => {
            const colors = [
              { border: "border-l-4 border-l-[#ff7f46]", iconBg: "bg-[#ff7f46]" },
              { border: "border-l-4 border-l-[#4582ff]", iconBg: "bg-[#4582ff]" },
              { border: "border-l-4 border-l-[#00d6d3]", iconBg: "bg-[#00d6d3]" },
            ];
            const colorScheme = colors[idx % colors.length];

            return (
              <div
                key={st.title}
                className={`bg-white rounded-2xl p-6 border border-slate-200/80 ${colorScheme.border} space-y-4 flex flex-col justify-between hover:scale-[1.02] transition-all shadow-md hover:shadow-xl group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Sticker name={st.sticker} size="md" className="group-hover:scale-110 transition-transform" />
                    <div>
                      <Badge variant="outline" className="border-emerald-600/40 text-emerald-600 text-[10px] bg-emerald-50">
                        Official Source
                      </Badge>
                      <h3 className="text-lg font-bold font-display text-[#0f2239] mt-0.5">{st.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#636363] leading-relaxed">{st.desc}</p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-bold text-[#0f2239] uppercase tracking-wider">Covered Pathways:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {st.courses.map((c) => (
                        <Badge key={c} variant="secondary" className="text-[11px] bg-slate-100 text-[#0f2239] border border-slate-200">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={st.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ff7f46] hover:underline font-display"
                  >
                    Explore Options <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
