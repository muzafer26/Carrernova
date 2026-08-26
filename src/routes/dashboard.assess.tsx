import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/assess")({
  component: AssessRedirect,
});

function AssessRedirect() {
  return <Navigate to="/dashboard/profile" replace />;
}
