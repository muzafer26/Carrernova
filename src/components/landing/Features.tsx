import { motion } from "framer-motion";
import { User, Brain, Compass, GraduationCap, ArrowLeftRight, CheckCircle2, Shield, ExternalLink } from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";

const groundedFeatures = [
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

const steps = [
  {
    num: "01",
    title: "About You",
    desc: "Select your class level, academic stream (Science, Commerce, Arts), and preferred subjects.",
    icon: User,
    theme: {
      bgCircle: "bg-[#3a86ff]",
      borderColor: "border-l-[#3a86ff]",
      glow: "hover:shadow-[#3a86ff]/20",
    },
  },
  {
    num: "02",
    title: "Discover Yourself",
    desc: "Answer brief preference questions to highlight higher study fields matching your interests.",
    icon: Brain,
    theme: {
      bgCircle: "bg-[#ff7f46]",
      borderColor: "border-l-[#ff7f46]",
      glow: "hover:shadow-[#ff7f46]/20",
    },
  },
  {
    num: "03",
    title: "Possible Directions",
    desc: "View matching fields of study tailored to your stream qualification with clear explanations.",
    icon: Compass,
    theme: {
      bgCircle: "bg-[#ff5252]",
      borderColor: "border-l-[#ff5252]",
      glow: "hover:shadow-[#ff5252]/20",
    },
  },
  {
    num: "04",
    title: "Explore Colleges",
    desc: "Review verified degree courses, eligibility rules, and entrance exam requirements.",
    icon: GraduationCap,
    theme: {
      bgCircle: "bg-[#9dbd00]",
      borderColor: "border-l-[#9dbd00]",
      glow: "hover:shadow-[#9dbd00]/20",
    },
  },
  {
    num: "05",
    title: "Where You Can Study",
    desc: "Find verified Government Degree Colleges in J&K offering your chosen program by district.",
    icon: ArrowLeftRight,
    theme: {
      bgCircle: "bg-[#8c52ff]",
      borderColor: "border-l-[#8c52ff]",
      glow: "hover:shadow-[#8c52ff]/20",
    },
  },
  {
    num: "06",
    title: "Your Next Step",
    desc: "Access direct links to official J&K higher education portals for admission counseling.",
    icon: CheckCircle2,
    theme: {
      bgCircle: "bg-[#00d6d3]",
      borderColor: "border-l-[#00d6d3]",
      glow: "hover:shadow-[#00d6d3]/20",
    },
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="py-24 border-t border-slate-200/80 relative overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 space-y-12">

        {/* Section: How It Works */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4582ff] uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#4582ff] inline-block" />
              STEP-BY-STEP PATH
              <span className="w-2 h-2 bg-[#4582ff] inline-block" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display text-[#0f2239]">How It Works</h2>
            <p className="text-sm md:text-base text-[#636363] max-w-xl mx-auto">
              A clear 6-step guided path for Class 10 and Class 12 students in Jammu & Kashmir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
            {steps.map((st, idx) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group cursor-pointer"
              >
                <div
                  className={`bg-[#f4f7fe] border-l-4 ${st.theme.borderColor} shadow-md group-hover:shadow-2xl ${st.theme.glow} rounded-r-2xl py-6 px-6 sm:px-7 flex items-center transition-all duration-300 transform -skew-x-6 group-hover:-translate-y-1.5`}
                >
                  <div className="transform skew-x-6 flex items-center gap-5 w-full">
                    <div
                      className={`w-16 h-16 rounded-full ${st.theme.bgCircle} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <st.icon className="h-7 w-7 stroke-[2.2]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#0f2239] shadow-sm border border-slate-200/60">
                          Step {st.num}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold font-display text-[#0f2239] group-hover:text-[#ff7f46] transition-colors">
                        {st.title}
                      </h3>
                      <p className="text-xs text-[#636363] leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

