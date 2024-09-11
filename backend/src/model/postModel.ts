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
      },
    },
    back: {
      title: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

type Flashcard = InferSchemaType<typeof flashcardSchema>;

export default model<Flashcard>("Flashcard", flashcardSchema);
