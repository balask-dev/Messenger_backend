 import express from "express";
 import mongoose from "mongoose";
 import dotenv from "dotenv";
 import helmet from "helmet";
 import morgan from "morgan";
  import {userRoute} from "./routes/users.js";
 import {authRoute} from "./routes/auth.js";
  import {conversationRoute} from "./routes/conversations.js";
 import {messageRoute} from "./routes/messages.js"
  import cors from "cors"
 const app = express();
 
dotenv.config();
 
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },
  () => {console.log("Connected")});
 
 app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Connected");
});
