import { InferSchemaType, model, Schema } from "mongoose";

export type StackModel = InferSchemaType<typeof stackSchema>;

const stackSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    flashcards: [
      {
        flashcard: { type: Schema.Types.ObjectId, ref: "Flashcard" },
        category: { type: String, enum: ["beginner", "intermediate", "advanced"] },
      },
    ],
  },
  { timestamps: true }
);

export default model<StackModel>("Stack", stackSchema);
