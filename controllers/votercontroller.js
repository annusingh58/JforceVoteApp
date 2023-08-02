import USER from "../model/user.js";
import VOTE from "../model/vote.js";
import ADMIN from "../model/admin.js";



export const voting =async(req,res)=>{

    try {
        const{email,vote}=req.body;
       if (!email)return res.send("email is required");
        const response=await USER.find({email}).exec();
        // const checkvoter =await VOTE.find({email}).exec();

        if (!response.length) return res.send("You are not registered for vote");

        

            const newVoter = new VOTE({
                email,
                vote
            });
            await newVoter.save();
            return res.send(" your Vote added Successfully");
        

    } catch (error) {
        return res.send(error);
    }
}


export const adminlogin=async(req,res)=>{
    try {
        const{email,password}=req.body;
        // if(!name)return res.send("name is required");
        if(!email)return res.send("email is required");
        if(!password)return res.send("password is required");

        const response=await ADMIN.find({}).exec();
        
        if(response[0].email==email && response[0].password==password){
            return res.send("Admin login Successfully.")
        }else{
            return res.send("Incorrect Admin Credentials.")
        }
        
    } catch (error) {
        return res.send(error)
    }

}
// export const getadmin=async(req,res)=>{
//     try{
//        const response=await USER.find({}).exec();
//        return res.send(response);
//     }
//     catch (error) {
//         return res.send(error)
//     }
// }


export const countvotes=async(req,res)=>{
    try {
        const response=await VOTE.find({}).exec();
        console.log(response);

        var candidate1=0;
        var candidate2=0;
        var candidate3=0;
        var candidate4=0;

        for(let i=0;i<response.length;i++){
            if(response[i].vote=="candidate-1"){
                candidate1=candidate1+1;
            }else if(response[i].vote=="candidate-2"){
                candidate2=candidate1+1;
            }else  if(response[i].vote=="candidate-3"){
                candidate3=candidate1+1;
            }else  if(response[i].vote=="candidate-4"){
                candidate4=candidate1+1;
            }
        }



        return res.send({"candidate-1":candidate1,"candidate-2":candidate2,"candidate-3":candidate3,"candidate-4":candidate4});

    } catch (error) {
        return res.send(error);
    }
}


        
