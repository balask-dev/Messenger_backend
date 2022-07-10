import express from "express";
const router = express.Router();
 import User from "../models/User.js"
 import bcrypt from "bcrypt"

 router.post("/register", async (req, res) => {
  try {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

     const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

     const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err)
  }
});

 router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("User Not Found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).send("Invalid credentials")

    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
});

export const authRoute = router;
