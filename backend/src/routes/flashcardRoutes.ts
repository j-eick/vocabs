import express from "express";
import * as flashcardController from "../controller/flashcardController";

const router = express();

router.get("/api/vocabs", flashcardController.getAllVocabs);

router.get("/api/vocabs/:vocabID", flashcardController.getVocab);

router.post("/api/vocabs", flashcardController.createVocab);

router.patch("/api/vocabs/:vocabID", flashcardController.updateVocab);

router.delete("/api/vocabs/:vocabID", flashcardController.deleteVocab);

export default router;
