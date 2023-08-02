import User from "../model/user.js";

export const checkRegister = async(req,res,next) =>{
    try {
        const {username, email, password, number} = req.body;
        if(!username) return res.status(400).json({status: 400, message: "Username is required."});
        if(!email) return res.status(400).json({status: 400, message: "Email is required."});
        if(!password) return res.status(400).json({status: 400, message: "Password is required."});
        if(!number) return res.status(400).json({status: 400, message: "Number is required."});

        next();

    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error."});
    }
}

export const checkLogin = async(req,res,next) =>{
    try {
        const {username, password} = req.body;
        if(!username) return res.status(400).json({status: 400, message: "Username is required."});
        if(!password) return res.status(400).json({status: 400, message: "Password is required."});

        const userExist = await User.findOne({username}).exec();
        if(!userExist) return res.status(400).json({status: 400, message: "User not found."});
        if(password != userExist.password){
            return res.status(400).json({status:400, message: "Incorrect credentials."});
        }
        next();
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error."});
    }
}