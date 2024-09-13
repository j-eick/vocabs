import express, { Express, Request, RequestHandler, Response } from "express";
import Flashcard from "./src/model/postModel";
import { CC } from "./util/cliColors";

const app: express.Application = express();

// enable express to send json
app.use(express.json());

// get all vocabs
app.get("/api/vocabs", async (req: Request, res: Response) => {
  const posts = await Flashcard.find();
  res.status(200).json(posts);
});

// get vocab
app.get("/api/vocabs/:vocabID", async (req: Request, res: Response) => {
  const id = req.params.vocabID;
  const targetPost = await Flashcard.findById(id);
  res.status(200).json(targetPost);
});

/**
 * CREATE VOCAB
 */
type CreateVocabBody = {
  front_title?: string;
  front_text?: string;
  back_title?: string;
  back_text?: string;
};
const createVocab: RequestHandler<unknown, unknown, CreateVocabBody, unknown> = async (req, res) => {
  CC("New Flashcard", "info");
  console.log(req.body);

  const { front_title, front_text, back_title, back_text } = req.body;

  const newCard = await Flashcard.create({
    front_title,
    front_text,
    back_title,
    back_text,
  });
  res.status(200).json(newCard);

  console.log(newCard);
};

app.post("/api/vocabs", createVocab);

export default app;
