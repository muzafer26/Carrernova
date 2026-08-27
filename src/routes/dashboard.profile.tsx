import { createFileRoute } from "@tanstack/react-router";
import { GuidedStoryJourney } from "@/components/journey/GuidedStoryJourney";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return <GuidedStoryJourney />;
}

