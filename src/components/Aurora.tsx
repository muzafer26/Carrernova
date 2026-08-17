import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * CareerNova Dark Editorial Ambient Canvas.
 * Near-black background with subtle warm amber and cobalt aurora highlights.
 */
export function AuroraBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 30, damping: 22 });
  const y = useSpring(mouseY, { stiffness: 30, damping: 22 });
  const tx1 = useTransform(x, (v) => `${v * 24}px`);
  const ty1 = useTransform(y, (v) => `${v * 24}px`);
  const tx2 = useTransform(x, (v) => `${v * -18}px`);
  const ty2 = useTransform(y, (v) => `${v * -18}px`);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e8f9f7 0%, #ffffff 50%, #f4efff 100%)",
        }}
      >
        {/* Eduor Cyan soft glow — top-left */}
        <motion.div
          style={{ x: tx1, y: ty1 }}
          className="absolute -top-72 -left-44 h-[760px] w-[760px] rounded-full blur-[120px] opacity-40 animate-drift-slow pointer-events-none"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, #00d6d3 0%, transparent 70%)" }}
          />
        </motion.div>

        {/* Eduor Soft Lavender glow — bottom-right */}
        <motion.div
          style={{ x: tx2, y: ty2 }}
          className="absolute top-[30%] -right-64 h-[680px] w-[680px] rounded-full blur-[140px] opacity-35 animate-drift-reverse pointer-events-none"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, #4582ff 0%, transparent 70%)" }}
          />
        </motion.div>
      </div>
    </>
  );
}

/** Slow, ambient particle drift matching dark editorial theme. */
export function FloatingParticles({ count = 10 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 2 + 1.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 6;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: i % 2 === 0 ? "oklch(0.84 0.13 78)" : "oklch(0.66 0.16 252)",
              opacity: 0.25,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

