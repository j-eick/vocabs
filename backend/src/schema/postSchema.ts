import { Schema, model } from "mongoose";

// const { Schema, model } = mongoose;

interface IPostSchema {
  title: String;
  text: String;
}

const postSchema = new Schema<IPostSchema>({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export const Post = model<IPostSchema>("Post", postSchema);
