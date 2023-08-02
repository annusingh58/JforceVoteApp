import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model("Candidate", candidateSchema);