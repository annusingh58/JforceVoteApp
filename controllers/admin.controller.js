import path from "path";
import User from "../model/user.js";
import Candidate from "../model/candidate.js";;

const __dirname = path.resolve();

export const homePage = async(req,res) =>{
    try {
        const username = req.session.username;
        if(!username) return res.send("Please login first.");
        return res.sendFile(__dirname + "/public/HTML/home.html", {username});
    } catch (error) {
        return res.send("Internal Server Error.");
    }
}

export const home = async(req,res) =>{
    try {
        const {candidate} = req.body;
        const username = req.session.username;
        if(!username) return res.json({message:"Please login first."});
        if(!candidate) return res.json({message:"Vote at least one candidate."});

        const user = await User.findOne({username}).exec();
        if(!user) return res.json({message:"User not found."});

        if(!user.isVoted){
            const candidateData = await Candidate.findOne({name: candidate}).exec();
            user.isVoted = true;
            user.candidate = candidateData._id;

            await user.save();
            return res.json({message: "You have voted successfully."});
        }else{
            return res.json({message:"You have already voted."});
        }
    } catch (error) {
        return res.json({message:"Internal Server Error."});
    }
}

export const adminPage = async(req,res) =>{
    try {
        return res.sendFile(__dirname + "/public/HTML/adminPanel.html");
    } catch (error) {
        return res.send("Internal server error.");
    }
}

export const getVote = async(req,res) =>{
    try {
        const allUsers = await User.find({isVoted: true}).exec();
        const countVote = {};

        allUsers.forEach((user) =>{
            const candidateId = user.candidate.toString();
            if(!countVote[candidateId]){
                countVote[candidateId] = 1;
            }else{
                countVote[candidateId]++;
            }
        });

        const voteWithCandidate =await Promise.all(
            Object.entries(countVote).map(async ([candidateId, count])=>{
                const candidateName = await Candidate.findById(candidateId);
                return {candidate: candidateName.name, count: count};
            })
        );

        res.json({message:"Vote Count fecthed successfully.",data:voteWithCandidate});
    } catch (error) {
        return res.send(error);
    }
}