import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// 1- hash the password
// 2- create the user
userRouter.post("/register",async(req,res)=>{
    console.log('req.body :>> ', req.body);
    try {
        req.body.password = await bcrypt.hash(req.body.password,10);
        const user = await User.create(req.body);
        console.log('user :>> ', user);
        console.log('req.body :>> ', req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// 1- find the user
// 2- check the password
// 3- create a token
userRouter.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        const isLoggedIn = bcrypt.compare(user.password, req.body.password);
        if(!isLoggedIn) throw Error("Password mismatch");

        //wt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign({uid:user._id}, process.env.SECRET);
        res.send({email:req.body.email, token:token});
    } catch (error) {
        res.status(401).send(error);
    }
})  

userRouter.get("/profile/:email", async (req,res)=>{
    try {
        const user = await User.findOne({email:req.params.email})
        delete user.password;
        res.send(user);
    } catch (error) {
        res.status.apply(400).send(error);
    }
})

userRouter.put("/updateUser/:email", async(req, res)=>{
    console.log('req.body :>> ', req.body);
    try {
        const updatedUser = await User.updateOne({email:req.params.email}, req.body);
        console.log('updatedUser :>> ', updatedUser);
        res.send({updatedUser});
    } catch (error) {
        
    }
})
export default userRouter;