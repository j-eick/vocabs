import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

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
        stack: { type: Schema.Types.ObjectId, ref: "Stack", required: true },
        learnStatus: {
            type: String,
            enum: ["unsorted", "dontKnow", "notSure", "know"],
            default: "unsorted",
        },
        lastReviewed: { type: Date },
        nextReviewDate: { type: Date },
        reviewInterval: { type: Number },
        easinessFactor: { type: Number },
        repetitionCount: { type: Number },
    },
    { timestamps: true }
);

export default model<Flashcard>("Flashcard", flashcardSchema);
