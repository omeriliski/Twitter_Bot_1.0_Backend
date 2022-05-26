import mongoose from "mongoose";

const connectDb=()=>{
    mongoose.connection.on("connecting", ()=>{console.log("DB connecting")})
    mongoose.connection.on("connected", ()=>{console.log("DB connected")})
    mongoose.connection.on("error", ()=>{console.log("error")})

    const {DB_USER, DB_PASS, DB_HOST, DB_NAME} =process.env;
    const connectionString =`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

    mongoose.connect(connectionString);
}

export default connectDb;
