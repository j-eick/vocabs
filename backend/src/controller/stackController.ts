import { RequestHandler } from "express";
import StackModel from "../model/stackModel";
import mongoose from "mongoose";
import { CC } from "../../util/cliColors";
import FlashcardModel from "../model/flashcardModel";

/**
 * CREATE NEW STACK
 */
export const createStack: RequestHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(req.body);

    // const userID = req.user.id;  // Assume `req.user` is populated by authentication middleware

    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const newStack = await StackModel.create({
      name,
      description,
      flashcards: [],
    });

    res.status(201).json(newStack);
  } catch (error) {
    console.error("Server error while creating stack:" + error);
    res.status(500).send("Server error");
  }
};

/**
 * TODO: Reduce amount of transfered data: load the flashcards separately via an additional API request when the user clicks on a specific stack.
 */
// interface IStack {
//   name: string;
//   description: string;
//   _id: string;
//   flashcards: [];
//   createdAt: string;
//   updatedAt: string;
// }
export const getStacks: RequestHandler = async (req, res) => {
  let allStacks;

  try {
    allStacks = await StackModel.find().populate("flashcards").exec();

    res.status(200).json(allStacks);
  } catch (error) {
    console.error("Error while fetching Stacks from MongoDB " + error);
    res.status(500).json({ message: "Server errror while fetching stacks" });
  }
};

/**
 * DELETE STACK
 */
export const deleteStack: RequestHandler = async (req, res) => {
  const targetID = req.params.stackID;
  const withCards = req.query.withCards;
  console.log(targetID);
  console.log(withCards);

  try {
    // check validity of flashcard id
    if (!mongoose.isValidObjectId(targetID)) {
      throw new Error("Invalid Flashcard ID!");
    }

    const targetStack = await StackModel.findById(targetID).exec();
    if (!targetStack) {
      throw new Error("Stack with this ID does not exist.");
    }

    if (withCards === "true") {
      // DELETE STACK INCL. CARDS
      await FlashcardModel.deleteMany({ stack: targetID });
      await StackModel.findByIdAndDelete(targetID);
    } else {
      // DELETE STACK w/o CARDS
      await StackModel.findByIdAndDelete(targetID);
    }

    res.sendStatus(204);
    CC("Removed Stack", "warn");
    console.log(`${targetID}`);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};
