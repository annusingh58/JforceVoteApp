import path from "path";
import Candidate from "../model/candidate.js";

const __dirname = path.resolve();

export const candidatePage = async(req,res) =>{
    try {
        return res.sendFile(__dirname + "/public/HTML/candidate.html");
    } catch (error) {
        return res.send("Internal Server Error.");
    }
}

export const candidate = async(req,res) =>{
    try {
        const {name} = req.body;

        const response = await Candidate.findOne({name}).exec();
        if(response) return res.send("Candidate already registered.");

        const newCandidate = new Candidate({
            name
        });

        await newCandidate.save();
        return res.send("Candidate registered successfully.");
    } catch (error) {
        return res.send("Internal Server Error.");
    }
}




export const getCandidate = async(req,res) =>{
    try {
        const response = await Candidate.find({}).exec();
        console.log(response);
        return res.json({response});
    } catch (error) {
        return res.send("Internal Server Error.");
    }
}