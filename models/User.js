import mongoose from "mongoose";

const {Schema, model} = mongoose;

const popularAccountSchema= new Schema({
    id:{type:String},
    id_str:{type:String},
    name:{type:String},
    screen_name:{type:String},
    location:{type:String},
    profile_image_url:{type:String}
})

const userSchema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    apiKey:{type:String},
    apiSecretKey:{type:String},
    accessToken:{type:String},
    accessTokenSecret:{type:String},
    rtCount:{type:Number},
    likeCount:{type:Number},
    followCount:{type:Number},
    retweetedCount:{type:Number},
    popularAccountsList:{type:[popularAccountSchema]},
    hashtagList:{type:Array}
})

const User = model("user",userSchema);

export default User;