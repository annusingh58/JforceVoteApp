import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    isVoted: {
        type: Boolean,
        default: false
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }
});

export default mongoose.model("User", userSchema);