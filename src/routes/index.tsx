import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/Aurora";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Careers } from "@/components/landing/Careers";
import { Stats } from "@/components/landing/Stats";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Careers />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
