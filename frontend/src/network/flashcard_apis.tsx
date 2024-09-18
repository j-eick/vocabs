export const fetchFlashcards = async () => {
  const res = await fetch("/api/vocabs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw Error("Error while fetching flashcards");
  }
  const result = await res.json();
  console.log(result);

  return result;
};
