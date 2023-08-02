import mongoose,{Schema} from "mongoose";

const admin=new Schema({
    email:String,
    password:String
});

export default mongoose.model("ADMIN",admin);