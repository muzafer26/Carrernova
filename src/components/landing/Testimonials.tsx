import { motion } from "framer-motion";
import { Sticker, type StickerName } from "@/components/ui/Sticker";

const items: {
  quote: string;
  name: string;
  role: string;
  rating: number;
  sticker: StickerName;
}[] = [
  {
    quote: "As a Class 12 student in Anantnag, I was totally confused between B.Sc IT and BCA. CareerNova showed me exact degree programs and which nearby Government Degree College offers them.",
    name: "Zaid Ahmad",
    role: "Class 12 Student, Anantnag",
    rating: 5,
    sticker: "graduate",
  },
  {
    quote: "Finding official college options used to mean opening 10 broken websites. CareerNova gathered verified J&K higher education data all in one clear place.",
    name: "Mehak Sharma",
    role: "Class 12 Commerce, Jammu",
    rating: 5,
    sticker: "books",
  },
  {
    quote: "The 6-step guided path helped me understand my subjects and stream options step-by-step. Now I feel ready for J&K UG admission counseling.",
    name: "Suhail Lone",
    role: "Class 10 Student, Baramulla",
    rating: 5,
    sticker: "trophy",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="text-center space-y-2 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4582ff] uppercase tracking-wider">
            <span className="w-2 h-2 bg-[#4582ff] inline-block" />
            OUR TESTIMONIALS
            <span className="w-2 h-2 bg-[#4582ff] inline-block" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-[#0f2239]">
            What J&K Students Say
          </h2>
          <p className="text-sm md:text-base text-[#636363] max-w-xl mx-auto">
            Real feedback from students across Jammu & Kashmir navigating their higher education choices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all space-y-4 relative flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-[#ff7f46]">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-base">★</span>
                    ))}
                  </div>
                  <Sticker name={t.sticker} size="sm" className="group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs text-[#636363] leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4582ff]/10 text-[#4582ff] font-bold flex items-center justify-center text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm font-display text-[#0f2239]">{t.name}</div>
                  <div className="text-[11px] text-[#636363]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
