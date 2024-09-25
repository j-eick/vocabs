import "./App.css";
import { useState } from "react";
import { Flashcard } from "./components/flashcard";
import { FlashcardProp } from "./types/flashcard";
import { NavLink } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";
import CardCaroussel from "./components/cardCaroussel/CardCaroussel";

type NewFlashcard = {
  front_title: string;
  front_text: string;
  back_title: string;
  back_text: string;
};

export default function App() {
  const [flashcards, setFlashcards, loading] = useFetchData();
  const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({
    front_title: "",
    front_text: "",
    back_title: "",
    back_text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/vocabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      });

      if (res.ok) {
        const newCard = await res.json();
        setFlashcards((prev) => [...prev, newCard]);
        localStorage.removeItem("myCards");
        localStorage.setItem("myCards", JSON.stringify(flashcards));
        // reset input field
        setNewFlashcard({
          front_title: "",
          front_text: "",
          back_title: "",
          back_text: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewFlashcard((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newFlashcard);
  };

  return (
    <>
      <nav>
        <ul className="mt-2 mb-2 flex justify-evenly">
          <li>
            <NavLink to="/">Study</NavLink>
          </li>
          <li>
            <NavLink to="/allVocabs">My Vocabs</NavLink>
          </li>
        </ul>
      </nav>
      {loading && <p>is loading...</p>}
      <ul role="list" className="border-">
        {flashcards.length >= 1 ? (
          flashcards.map((card: FlashcardProp) => (
            <li key={card._id} className="">
              <Flashcard flashcard={card} />
            </li>
          ))
        ) : (
          <p>Could nto retrieve your list of vocabularies.</p>
        )}
      </ul>
      <CardCaroussel flashcards={flashcards} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        action="/api/vocabs"
        method="post"
        name="create flashcard"
        className="mt-4 flex flex-col"
      >
        <label htmlFor="frontTitle">Front Title</label>
        <input
          id="frontTitle"
          type="text"
          name="front_title"
          value={newFlashcard.front_title}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <label htmlFor="frontDescription">Front Description </label>
        <input
          id="frontDescription"
          type="text"
          name="front_text"
          value={newFlashcard.front_text}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <label htmlFor="backTitle">Back Title</label>
        <input
          id="backTitle"
          type="text"
          name="back_title"
          value={newFlashcard.back_title}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <label htmlFor="backDescription">Back Description</label>
        <input
          id="backDescription"
          type="text"
          name="back_text"
          value={newFlashcard.back_text}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <button type="submit" className="bg-slate-300 mt-4 p-2 cursor-pointer">
          Create Vocab
        </button>
      </form>
    </>
  );
}
