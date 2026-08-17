import { createFileRoute } from "@tanstack/react-router";
import { GuidedStoryJourney } from "@/components/journey/GuidedStoryJourney";

export const Route = createFileRoute("/dashboard/journey")({ component: JourneyPage });

export default function JourneyPage() {
  return <GuidedStoryJourney />;
}
