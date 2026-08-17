import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe } from "lucide-react";
import { officialResources } from "@/data/jk-resources";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/resources")({ component: ResourcesPage });

function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(officialResources.map((r) => r.category)))];

  const filteredResources =
    selectedCategory === "All"
      ? officialResources
      : officialResources.filter((r) => r.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <Sticker name="books" size="lg" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display">Official Resources & Portals</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Direct links to authoritative J&K government, university, examination, and scholarship portals.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="text-xs rounded-xl"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <Card key={res.key} className="glass-strong border-white/10 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">
                  {res.category}
                </Badge>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                  Official Source
                </Badge>
              </div>
              <h3 className="font-semibold text-base leading-snug">{res.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{res.description}</p>

              <div className="text-[11px] text-muted-foreground/80 space-y-0.5 pt-1">
                <div><strong className="text-foreground/90">Organization:</strong> {res.organization}</div>
                <div><strong className="text-foreground/90">Stage:</strong> {res.audienceStage}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
              <span className="text-[10px] text-muted-foreground font-mono">
                Verified: {res.source.retrievedOn}
              </span>
              <Button asChild size="sm" variant="secondary">
                <a href={res.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs">
                  Visit Official Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
