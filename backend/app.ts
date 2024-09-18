import express from "express";
import cors from "cors";
import flashcardRoutes from "./src/routes/flashcardRoutes";

const app: express.Application = express();

// enable express to send json
app.use(express.json());
// enable express to handle cors
app.use(cors());

app.get("/api/vocabs", flashcardRoutes);

app.get("/api/vocabs/:vocabID", flashcardRoutes);

app.post("/api/vocabs", flashcardRoutes);

app.patch("/api/vocabs/:vocabID", flashcardRoutes);

app.delete("/api/vocabs/:vocabID", flashcardRoutes);

export default app;
