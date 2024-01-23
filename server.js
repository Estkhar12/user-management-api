import express from "express";
import userRoute from "./routes/user.js";
import authRoute from './routes/auth.js';
import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

mongoose.connect(process.env.MONGODB_URI);

const port = 3000;

app.listen(port, () => {
  console.log(`server is runnign on ${port}`);
});
