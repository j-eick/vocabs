import express, { Express, Request, Response } from "express";
import Post from "./src/model/postModel";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find().exec();
  console.log(posts);

  res.status(200).json(posts);
});
app.get("/hi", (req: Request, res: Response) => {
  res.status(200).send("Hi!!!");
});

export default app;
