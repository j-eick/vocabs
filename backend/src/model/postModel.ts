import { InferSchemaType, Schema, model } from "mongoose";

const flashcardSchema = new Schema(
  {
    front: {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    back: {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

type Flashcard = InferSchemaType<typeof flashcardSchema>;

export default model<Flashcard>("Flashcard", flashcardSchema);
