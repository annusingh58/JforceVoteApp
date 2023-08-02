import USER from "../model/user.js";
import encrypt from "encryptjs";

export const registerchk=async(req,res,next)=>{
    try {
        const{name,email,password,number}=req.body;
        if(!name)return res.send("name is required");
        if(!email)return res.send("email is required");
        if(!password)return res.send("password is required");
        if(!number)return res.send("number is required");
        
        next();


        
    } catch (error) {
        return res.send(error);
        
    }
}


export const votingpagechk=async(req,res,next)=>{

    try {
        
        const{name ,email,password,number}=req.body;
        if(!name)return res.send("name is required");
        if(!email)return res.send("email is required");
        if(!password)return res.send("password is required");
        if(!number)return res.send("number is required");

        next();
    } catch (error) {
        return res.send(error);
        
    }
}


