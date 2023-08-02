import USER from "../model/user.js"
import encrypt from "encryptjs";

export const register= async(req,res)=>{
    try {
        const{name,email,password,number}=req.body;
        const response=await USER.find({email}).exec();
        if(response.length) return res.send("email already exits");
        // console.log(response);

        var scretkey="pass";
        var encryptkey=encrypt.encrypt(password,scretkey,256);


        const user=new USER({
            name,
            email,
            password:encryptkey,
            number
            
        });
        await user.save();
        return res.send("registeration is sucessfull for voting ");
        
    } catch (error) {
        return res.send(error);
        
    }
}




export const login =async(req,res)=>{
        try {
            const{email,password}=req.body;

            if(!email)return res.send("email is required");
            if(!password)return res.send("password is required");


            const response=await USER.find({email}).exec();
            if(!response.length)return res.send("email not exit")
    
    
            var secretkey="pass";
            var decryptpass=encrypt.decrypt(response[0].password,secretkey,256);

            if(response[0].email ==email && decryptpass==password)
                return res.send("login sucessfull");

             else{
                    return res.send("incorrect email id");
                }

       
        
    } catch (error) {
        return res.send(error);
    }
}





