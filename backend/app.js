var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;
const MONGO_DB = "mongodb+srv://moi:Ungreased-Showoff-Ragweed3@cluster0.hd4ao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(MONGO_DB, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield mongoose.connect(MONGO_DB);
            // Send a ping to confirm a successful connection
            yield client.db("blog").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.status(200).send("Hi World");
});
app.get("/hi", (req, res) => {
    res.status(200).send("Hi!!!");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
