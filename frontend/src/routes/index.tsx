import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: StudyPage,
});

function StudyPage() {
  return <>asd</>;
}
