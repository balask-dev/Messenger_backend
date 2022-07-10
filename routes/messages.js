import express from "express";
const router = express.Router();
import Message from"../models/Message.js";

 
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const saved = await newMessage.save();
    res.status(200).send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

export const messageRoute = router;
