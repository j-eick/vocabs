import express from "express";
import cors from "cors";
import { getAllVocabs, getVocab, createVocab, updateVocab, deleteVocab } from "./src/controller/flashcardController";
import { createStack, deleteStack, getStacks, getStack, renameStack } from "./src/controller/stackController";

const app: express.Application = express();

// enable express to send json
app.use(express.json());
// enable express to handle cors
app.use(cors());

// CONTEXT: FLASHCARDS
app.get("/api/vocabs", getAllVocabs);

app.get("/api/vocabs/:vocabID", getVocab);

app.post("/api/vocabs", createVocab);

app.patch("/api/vocabs/:vocabID", updateVocab);

app.delete("/api/vocabs/:vocabID", deleteVocab);

// FLASHCARDS BY STACK
// app.get("/api/vocabs/stack:stackID", getAllVocabsByStack);

// CONTEXT: STACKS
app.post("/api/stacks", createStack);

app.patch("/api/stacks/:stackID", renameStack);

app.get("/api/stacks", getStacks);

app.get("/api/stacks/:stackID", getStack);

// app.patch("/api/stacks/:stackID", updateStack);

app.delete("/api/stacks/:stackID", deleteStack);

export default app;
