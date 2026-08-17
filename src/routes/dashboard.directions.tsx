import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/directions")({
  component: DirectionsLayoutPage,
});

function DirectionsLayoutPage() {
  return <Outlet />;
}
