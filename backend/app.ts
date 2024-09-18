import express from "express";
import cors from "cors";
import { getAllVocabs, getVocab, createVocab, updateVocab, deleteVocab } from "./src/routes/flashcardRoutes";

const app: express.Application = express();

// enable express to send json
app.use(express.json());
// enable express to handle cors
app.use(cors());

app.get("/api/vocabs", getAllVocabs);

app.get("/api/vocabs/:vocabID", getVocab);

app.post("/api/vocabs", createVocab);

app.patch("/api/vocabs/:vocabID", updateVocab);

app.delete("/api/vocabs/:vocabID", deleteVocab);

export default app;
