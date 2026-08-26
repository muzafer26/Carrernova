import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FloatingParticles } from "@/components/Aurora";
import { Sticker } from "@/components/ui/Sticker";
import { ShinyButton } from "@/components/ui/shiny-button";
import { SideRays } from "@/components/ui/SideRays";
import { StudentJourneyAnimatedList } from "@/components/landing/StudentJourneyAnimatedList";
import { MorphingText } from "@/registry/magicui/morphing-text";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const morphingTexts = ["choose", "explore", "pursue", "build"];

  return (
    <section className="relative min-h-[90svh] overflow-hidden pt-28 md:pt-32 pb-16">
      <SideRays
        speed={2.5}
        rayColor1="#ff7f46"
        rayColor2="#4582ff"
        intensity={1.8}
        spread={2.2}
        origin="top-right"
        tilt={-10}
        saturation={1.4}
        blend={0.65}
        falloff={1.8}
        opacity={0.45}
      />
      <FloatingParticles count={14} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Title & CTA */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-black text-[#4582ff] uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 bg-[#4582ff] inline-block rounded-xs" />
              J&K HIGHER EDUCATION GUIDANCE SYSTEM
            </motion.div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl leading-[1.1] text-[#0f2239] tracking-tight">
              Not sure what to{" "}
              <span className="relative inline-block text-[#ff7f46] underline decoration-[#ff7f46]/40 decoration-wavy underline-offset-8">
                <MorphingText texts={morphingTexts} />
              </span>{" "}
              next?
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-xs sm:text-base text-[#636363] leading-relaxed max-w-xl"
            >
              CareerNova helps Jammu & Kashmir students explore education and career pathways, understand their options, verify what is available locally in Government Degree Colleges, and take the appropriate official next step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            >
              <Link to="/dashboard/journey" className="w-full sm:w-auto">
                <ShinyButton className="w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 font-black uppercase tracking-wider shadow-xl hover:shadow-2xl justify-center">
                  Start Exploring <ArrowRight className="h-4 w-4 ml-1" />
                </ShinyButton>
              </Link>

              <a
                href="#how-it-works"
                className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm font-extrabold text-[#0f2239] group py-2"
              >
                <span className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-[#0f2239] text-white flex items-center justify-center group-hover:bg-[#4582ff] transition-all shadow-md">
                  ↓
                </span>
                <span>How It Works</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Exploration First Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            {/* Floating Decorative 3D Stickers */}
            <div className="absolute top-2 left-2 sm:left-6 z-20">
              <Sticker name="books" size="md" className="rotate-[-14deg] shadow-xl" />
            </div>
            <div className="absolute -bottom-4 right-2 sm:right-4 z-20">
              <Sticker name="college" size="md" className="rotate-[14deg] shadow-xl" />
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden sm:block">
              <Sticker name="trophy" size="sm" className="rotate-[-8deg] shadow-lg" />
            </div>

            {/* Main Exploration First Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xl flex flex-col items-center text-center space-y-4 sm:space-y-5 max-w-[280px] sm:max-w-[300px] w-full"
            >
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center">
                <Sticker name="graduate" size="xl" animate={false} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0f2239]">
                  Exploration First
                </h3>
                <p className="text-xs text-[#636363] leading-relaxed max-w-[220px]">
                  Source-backed guidance for Class 10 & Class 12 J&K students
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Magic UI AnimatedList for Your Guided Student Journey */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-16 pt-8 border-t border-slate-200/80"
        >
          <StudentJourneyAnimatedList />
        </motion.div>
      </div>
    </section>
  );
}

