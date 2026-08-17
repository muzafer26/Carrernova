import { motion } from "framer-motion";
import { Shield, GraduationCap, ExternalLink } from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";

const trustPoints = [
  {
    title: "Official Government Sources",
    desc: "Course and college details are retrieved directly from official J&K higher education portals and university affiliation records.",
    sticker: "target" as const,
    badgeIcon: Shield,
  },
  {
    title: "Verified College Information",
    desc: "Information is presented only when supported by confirmed institutional records. If data is unavailable, we state it transparently.",
    sticker: "college" as const,
    badgeIcon: GraduationCap,
  },
  {
    title: "Direct Admission Guidance",
    desc: "We guide students through education options and direct them to official J&K government websites for submitting admission forms.",
    sticker: "books" as const,
    badgeIcon: ExternalLink,
  },
];

export function Stats() {
  return (
    <section id="trust" className="py-24 border-t border-slate-200/80 relative bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#4582ff] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#4582ff] inline-block rounded-xs" />
            FACTUAL & TRANSPARENT
            <span className="w-1.5 h-1.5 bg-[#4582ff] inline-block rounded-xs" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-[#0f2239] tracking-tight">
            Grounded in Official J&K Data
          </h2>
          <p className="text-sm md:text-base text-[#636363] max-w-2xl mx-auto leading-relaxed">
            Our platform provides clear, reliable education guidance based entirely on verified institutional records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPoints.map((tp, idx) => (
            <motion.div
              key={tp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                  <Sticker name={tp.sticker} size="lg" animate={false} />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#e8f1ff] text-[#4582ff] flex items-center justify-center border border-[#d0e2ff] shrink-0">
                  <tp.badgeIcon className="h-4 w-4 stroke-[2.2]" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-extrabold font-display text-[#0f2239] group-hover:text-[#4582ff] transition-colors">
                  {tp.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#636363] leading-relaxed">
                  {tp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

