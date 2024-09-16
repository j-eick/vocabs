import express, { Express, Request, RequestHandler, Response } from "express";
import FlashcardModel from "./src/model/flashcardModel";
import { CC } from "./util/cliColors";
import mongoose from "mongoose";

const app: express.Application = express();

// enable express to send json
app.use(express.json());

// get all vocabs
app.get("/api/vocabs", async (req: Request, res: Response) => {
  const posts = await FlashcardModel.find();
  res.status(200).json(posts);
});

// get vocab
app.get("/api/vocabs/:vocabID", async (req: Request, res: Response) => {
  const id = req.params.vocabID;
  const targetPost = await FlashcardModel.findById(id);
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
  const { front_title, front_text, back_title, back_text } = req.body;

  const newCard = await FlashcardModel.create({
    front_title,
    front_text,
    back_title,
    back_text,
  });
  res.status(200).json(newCard);

  console.log(newCard);
};
app.post("/api/vocabs", createVocab);

/**
 * UPDATE VOCAB
 */
type UpdateVocabBody = {
  front_title?: string;
  front_text?: string;
  back_title?: string;
  back_text?: string;
};

type UpdateVocabParams = {
  vocabID: string;
};

const updateVocab: RequestHandler<UpdateVocabParams, unknown, UpdateVocabBody, unknown> = async (req, res, next) => {
  const targetID = req.params.vocabID;
  const new_front_title = req.body?.front_title;
  const new_front_text = req.body?.front_text;
  const new_back_title = req.body?.back_title;
  const new_back_text = req.body?.back_text;

  try {
    // check validity of flashcard id
    if (!mongoose.isValidObjectId(targetID)) {
      throw new Error("Invalid Flashcard ID!");
    }
    const targetFlashcard = await FlashcardModel.findById(targetID).exec();
    if (!targetFlashcard) {
      throw new Error("Selected Flashcard was not found!");
    }

    if (!new_front_title) {
      throw new Error("Flashcard has no title!");
    }

    // only front_title needs to have value
    targetFlashcard.front_title = new_front_title;
    targetFlashcard.back_title = new_back_title;
    targetFlashcard.front_text = new_front_text;
    targetFlashcard.back_text = new_back_text;

    const updatedFlashcard = await targetFlashcard.save();
    res.status(200).json(updatedFlashcard);
    console.log(targetFlashcard);
  } catch (err) {
    console.error(err);
  }
};
app.patch("/api/vocabs/:vocabID", updateVocab);

export default app;
