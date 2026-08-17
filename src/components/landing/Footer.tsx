import { Link } from "@tanstack/react-router";
import { GraduationCap, ExternalLink } from "lucide-react";

export function Footer() {
  const officialLinks = [
    { label: "J&K UG Admission Portal", href: "https://jkadmissions.in" },
    { label: "Directorate of Colleges J&K", href: "https://directorcollegesjk.in/authusers/CourseListPublic.aspx" },
    { label: "University of Jammu", href: "https://jammuuniversity.ac.in" },
    { label: "University of Kashmir", href: "https://www.kashmiruniversity.net" },
    { label: "JKBOPEE Entrance Board", href: "https://www.jkbopee.gov.in" },
  ];

  const journeyLinks = [
    { label: "About You", to: "/dashboard/profile" },
    { label: "Discover Yourself", to: "/dashboard/assess" },
    { label: "Possible Directions", to: "/dashboard/directions" },
    { label: "Where You Can Study", to: "/dashboard/colleges" },
    { label: "Compare Options", to: "/dashboard/compare" },
    { label: "Your Next Step", to: "/dashboard/nextstep" },
  ];

  return (
    <footer className="bg-[#0f2239] text-white/80 py-16 relative text-xs border-t border-[#0f2239]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 text-white font-bold text-base font-display">
            <div className="p-2 rounded-full bg-[#ff7f46] text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            CareerNova | J&K Education
          </div>
          <p className="max-w-sm leading-relaxed text-[#94a3b8]">
            Factual education guidance for Jammu & Kashmir students after Class 12. Grounded in verified institutional records and official government portals.
          </p>
        </div>

        <div className="space-y-3">
          <span className="font-bold text-[#00d6d3] text-xs uppercase tracking-wider font-display">Student Journey</span>
          <ul className="space-y-2 pt-1">
            {journeyLinks.map((jl) => (
              <li key={jl.to}>
                <Link to={jl.to} className="hover:text-[#ff7f46] transition text-[#cbd5e1]">
                  {jl.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <span className="font-bold text-[#00d6d3] text-xs uppercase tracking-wider font-display">Official J&K Portals</span>
          <ul className="space-y-2 pt-1">
            {officialLinks.map((ol) => (
              <li key={ol.href}>
                <a
                  href={ol.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#ff7f46] transition inline-flex items-center gap-1 text-[#cbd5e1]"
                >
                  {ol.label} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-8 mt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[#94a3b8]">
        <div>© {new Date().getFullYear()} CareerNova — J&K Higher Education Guidance System</div>
        <div>Official J&K Education Guidance</div>
      </div>
    </footer>
  );
}
