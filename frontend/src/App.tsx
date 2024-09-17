import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData(input: RequestInfo, init?: RequestInit) {
      const res = await fetch(input, init);
      if (res.ok) {
        const cards = await res.json();
        console.log(cards);

        setNotes(cards);

        return res;
      } else {
        const errorBody = await res.json();
        const errorMsg = errorBody.error;
        throw Error(errorMsg);
      }
    }

    fetchData("/api/vocabs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <>
      <ul role="list">
        {notes.map((card, i) => (
          <li key={i}>
            <h1>{card.front_title}</h1>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
