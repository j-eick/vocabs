import { RequestHandler } from "express";
import StackModel from "../model/stackModel";

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
