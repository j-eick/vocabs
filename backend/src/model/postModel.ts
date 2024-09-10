import { InferSchemaType, Schema, model, models } from "mongoose";

const flashcardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Flashcard = InferSchemaType<typeof flashcardSchema>;

export default model<Flashcard>("Flashcard", flashcardSchema);
