import User from "../model/user.js";
import path from "path";

const __dirname = path.resolve();

export const registerPage = async(req,res) =>{
    try {
        return res.sendFile(__dirname + "/public/HTML/register.html");
    } catch (error) {
        return res.send("Internal Server Error");
    }
}

export const register = async(req,res) =>{
    try {
        const {username, email, password, number} = req.body;

        const oldUser = await User.findOne({email}).exec();
        if(oldUser) return res.send( "User already registered.");

        const newUser = new User({
            username,
            email,
            password,
            number
        });
        await newUser.save();
        // res.redirect('/vote/login');
        return res.json({message:"User registered successfully."});

    } catch (error) {
        return res.send("Internal server error.");
    }
}

export const loginPage = async(req,res) =>{
    try {
        return res.sendFile(__dirname + "/public/HTML/login.html");
    } catch (error) {
        return res.send("Internal Server Error");
    }
}

export const login = async(req,res) =>{
    try {
        const {username} = req.body;
        req.session.username = username;
        return res.json("Login successful.");
        
    } catch (error) {
        return res.send("Internal Server Error");
    }
}