import { InferSchemaType, Schema, model, models } from "mongoose";

type Flashcard = InferSchemaType<typeof flashcardSchema>;

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

export default model<Flashcard>("Flashcard", flashcardSchema);
