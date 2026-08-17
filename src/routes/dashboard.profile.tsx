import { createFileRoute } from "@tanstack/react-router";
import { GuidedStoryJourney } from "@/components/journey/GuidedStoryJourney";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

export default function ProfilePage() {
  return <GuidedStoryJourney />;
}

