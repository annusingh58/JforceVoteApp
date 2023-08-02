import mongoose from "mongoose";
import { Schema } from "mongoose";
const vote=new Schema({
    email:String,
    vote:String
});

export default mongoose.model("VOTE",vote);