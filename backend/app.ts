import express from "express";
import cors from "cors";
import flashcardRoutes from "./src/routes/flashcardRoutes";

const app: express.Application = express();

// enable express to send json
app.use(express.json());
// enable express to handle cors
app.use(cors());

app.use("api/vocabs", flashcardRoutes);

export default app;
