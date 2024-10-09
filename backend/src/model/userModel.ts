// // models/User.ts
// import { Schema, model, Document, Types, InferSchemaType } from "mongoose";
// import StackModel from "./stackModel";

// type UserModel = InferSchemaType<typeof userSchema>;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   stacks: [{ type: Schema.Types.ObjectId, ref: "Stack" }],
// });

// export default model<UserModel>("User", userSchema);
