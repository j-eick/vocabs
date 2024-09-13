import { InferSchemaType, Schema, model } from "mongoose";

const flashcardSchema = new Schema(
  {
    front_title: {
      type: String,
      required: true,
    },
    front_text: {
      type: String,
      default: "",
    },
    back_title: {
      type: String,
      default: "",
    },
    back_text: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

type Flashcard = InferSchemaType<typeof flashcardSchema>;

export default model<Flashcard>("Flashcard", flashcardSchema);
