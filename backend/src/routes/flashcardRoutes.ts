import { RequestHandler } from "express";
import FlashcardModel from "../model/flashcardModel";
import { CC } from "../../util/cliColors";
import mongoose from "mongoose";

/**
 * get all vocabs
 */
export const getAllVocabs: RequestHandler = async (req, res) => {
  const posts = await FlashcardModel.find().exec();
  res.status(200).json(posts);
};

/**
 * GET VOCAB
 */
export const getVocab: RequestHandler = async (req, res) => {
  const id = req.params.vocabID;
  const targetPost = await FlashcardModel.findById(id);
  res.status(200).json(targetPost);
};

/**
 * CREATE VOCAB
 */
type CreateVocabBody = {
  front_title?: string;
  front_text?: string;
  back_title?: string;
  back_text?: string;
};
export const createVocab: RequestHandler<unknown, unknown, CreateVocabBody, unknown> = async (req, res) => {
  const { front_title, front_text, back_title, back_text } = req.body;
  console.log(front_title);

  const newCard = await FlashcardModel.create({
    front_title,
    front_text,
    back_title,
    back_text,
  });
  res.status(200).json(newCard);

  CC("New Card", "info");
  console.log(newCard);
};

/**
 * UPDATE VOCAB
 */
type UpdateVocabBody = {
  front_title: string;
  front_text: string;
  back_title: string;
  back_text: string;
};
type UpdateVocabParams = {
  vocabID: string;
};
export const updateVocab: RequestHandler<UpdateVocabParams, unknown, UpdateVocabBody, unknown> = async (req, res) => {
  const targetID = req.params.vocabID;
  const new_front_title = req.body.front_title;
  const new_front_text = req.body.front_text;
  const new_back_title = req.body.back_title;
  const new_back_text = req.body.back_text;

  console.log(req.body);

  try {
    // check validity of flashcard id
    if (!mongoose.isValidObjectId(targetID)) {
      throw new Error("Invalid Flashcard ID!");
    }

    if (!new_front_title) {
      throw new Error("Flashcard has no title!");
    }

    const targetFlashcard = await FlashcardModel.findById(targetID).exec();
    if (!targetFlashcard) {
      throw new Error("Selected Flashcard was not found!");
    }

    // only front_title needs to have value
    targetFlashcard.front_title = new_front_title;
    targetFlashcard.front_text = new_front_text;
    targetFlashcard.back_title = new_back_title;
    targetFlashcard.back_text = new_back_text;

    const updatedFlashcard = await targetFlashcard.save();
    res.status(200).json(updatedFlashcard);
    console.log(targetFlashcard);
  } catch (err) {
    console.error(err);
  }
};

/**
 * DELETE VOCAB
 */
export const deleteVocab: RequestHandler = async (req, res) => {
  const targetID = req.params.vocabID;

  try {
    // check validity of flashcard id
    if (!mongoose.isValidObjectId(targetID)) {
      throw new Error("Invalid Flashcard ID!");
    }
    const targetFlashcard = await FlashcardModel.findById(targetID).exec();

    if (!targetFlashcard) {
      throw new Error("Flashcard with this ID does not exist.");
    }
    await FlashcardModel.findByIdAndDelete(targetID);

    res.sendStatus(204);
    CC("Removed Card", "warn");
    console.log(`${targetID}`);
  } catch (err) {
    console.error(err);
  }
};
