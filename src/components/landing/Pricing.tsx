import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Sticker } from "@/components/ui/Sticker";

const exploreCategories = [
  {
    title: "Sciences & Technology",
    desc: "Fields including Computer Science, Information Technology, Biotechnology, Chemistry, and Botanical Sciences.",
    sticker: "microscope" as const,
    borderColor: "border-l-[#4582ff]",
    tags: ["B.Sc Computer Application", "B.Sc Biotechnology", "B.Sc Botany & Chemistry"],
    to: "/dashboard/directions",
  },
  {
    title: "Commerce & Management",
    desc: "Fields including Accounting, Business Administration, Commerce, Finance, and Enterprise Management.",
    sticker: "calculator" as const,
    borderColor: "border-l-[#ff7f46]",
    tags: ["B.Com (General / Honors)", "BBA (Business Administration)"],
    to: "/dashboard/directions",
  },
  {
    title: "Arts & Humanities",
    desc: "Fields including Literature, Languages, Economics, Political Science, Education, and Regional Studies.",
    sticker: "books" as const,
    borderColor: "border-l-[#00d6d3]",
    tags: ["B.A. Humanities", "B.A. Dogri / Languages", "B.A. Economics"],
    to: "/dashboard/directions",
  },
];

const freeInitiatives = [
  {
    name: "Class 10 Students",
    badge: "Stream Selector",
    desc: "Understand your interest areas before picking stream subjects.",
    features: [
      "Subject interest discovery",
      "Science / Commerce / Arts breakdown",
      "Polytechnic & Diploma options",
      "No registration fees",
    ],
    cta: "Start Class 10 Path",
    to: "/dashboard/profile",
    featured: false,
  },
  {
    name: "Class 12 Students",
    badge: "UG Degree Advisor",
    desc: "Explore verified bachelor programs across J&K Government Degree Colleges.",
    features: [
      "B.Sc, B.Com, B.A. course explorer",
      "Government Degree College finder by district",
      "Side-by-side college comparison",
      "Direct portal admission links",
    ],
    cta: "Explore Degree Programs",
    to: "/dashboard/directions",
    featured: true,
  },
  {
    name: "Official Data Access",
    badge: "100% Factual",
    desc: "Access source-backed J&K education information transparently.",
    features: [
      "Verified institutional records",
      "Official entrance exam details (CUET/JKBOPEE)",
      "District-wise college directory",
      "Always 100% Free",
    ],
    cta: "View Official Directory",
    to: "/dashboard/colleges",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-slate-200/80 relative space-y-24">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 space-y-24">

        {/* Section 1: What You Can Explore Cards (Exact Design from Image 2) */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display text-[#0f2239] tracking-tight">
              What You Can Explore
            </h2>
            <p className="text-sm md:text-base text-[#636363] max-w-xl mx-auto leading-relaxed">
              Explore verified undergraduate degree programs across government degree colleges in Jammu & Kashmir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exploreCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 border border-slate-200/80 border-l-4 ${cat.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group`}
              >
                <div className="space-y-6">
                  {/* Top Header Row with Sticker and Official Source Badge */}
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                      <Sticker name={cat.sticker} size="lg" animate={false} />
                    </div>
                    <span className="text-[11px] font-bold text-[#059669] bg-[#e6f9f0] border border-[#a7f3d0] px-3 py-1 rounded-full shadow-2xs">
                      Official Source
                    </span>
                  </div>

                  {/* Category Title & Body */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold font-display text-[#0f2239] group-hover:text-[#4582ff] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#636363] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#0f2239]">
                      EXAMPLE PROGRAMS:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.tags.map((tg) => (
                        <span
                          key={tg}
                          className="bg-slate-100/90 text-[#0f2239] font-bold text-xs px-3 py-1.5 rounded-full border border-slate-200/60 shadow-2xs"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="pt-6 border-t border-slate-100">
                  <Link
                    to={cat.to}
                    className="inline-flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider text-[#ff7f46] hover:text-[#e66c35] group-hover:translate-x-1 transition-all"
                  >
                    <span>EXPLORE STREAM OPTIONS</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: 100% Free Public Initiative Tiers */}
        <div className="space-y-12 pt-12 border-t border-slate-200/80">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4582ff] uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#4582ff] inline-block" />
              100% FREE PUBLIC INITIATIVE
              <span className="w-2 h-2 bg-[#4582ff] inline-block" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display text-[#0f2239]">
              Built for Every J&K Student
            </h2>
            <p className="text-sm md:text-base text-[#636363] max-w-xl mx-auto">
              Free, transparent, and source-backed higher education guidance with zero hidden costs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {freeInitiatives.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 bg-white border ${
                  t.featured
                    ? "border-[#ff7f46] shadow-xl ring-2 ring-[#ff7f46]/20"
                    : "border-slate-200/80 shadow-lg hover:shadow-xl"
                } transition-all space-y-6 flex flex-col justify-between`}
              >
                {t.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff7f46] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-xl text-[#0f2239]">{t.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4582ff]/10 text-[#4582ff]">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#636363] leading-relaxed">{t.desc}</p>
                  <div className="pt-2 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold text-[#0f2239]">FREE</span>
                    <span className="text-[#636363] text-xs font-semibold">/ Always</span>
                  </div>

                  <ul className="pt-4 border-t border-slate-100 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#0f2239]">
                        <Check className="h-4 w-4 text-[#ff7f46] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={t.to}
                  className={`block text-center w-full px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition ${
                    t.featured
                      ? "bg-[#ff7f46] text-white shadow-lg hover:bg-[#e66c35]"
                      : "bg-[#0f2239] text-white hover:bg-[#4582ff]"
                  }`}
                >
                  {t.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

