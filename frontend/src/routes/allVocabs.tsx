import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/allVocabs")({
  component: AllVocabsPage,
});

function AllVocabsPage() {
  return <>AllVocabs</>;
}
