import { InferSchemaType, model, Schema } from "mongoose";

export type StackModel = InferSchemaType<typeof stackSchema>;

const stackSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    flashcards: [{ type: Schema.Types.ObjectId, ref: "Flashcard" }],
  },
  { timestamps: true }
);

export default model<StackModel>("Stack", stackSchema);
