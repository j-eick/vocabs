import express, { Express, Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;
const MONGO_DB =
  "mongodb+srv://moi:Ungreased-Showoff-Ragweed3@cluster0.hd4ao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(MONGO_DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("blog").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hi World");
});
app.get("/hi", (req: Request, res: Response) => {
  res.status(200).send("Hi!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
