import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import userRouter from "./routes/userRouter.js";
import twitRouter from "./routes/twitRouter.js";

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
connectDb();

app.use("/user",userRouter);
app.use("/twit", twitRouter);

app.use((err, req, res, next)=>{
    res.send(err);
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening ${process.env.PORT}`)
})