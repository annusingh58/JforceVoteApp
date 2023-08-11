import express from "express";
import { login, loginPage, register, registerPage } from "../controllers/user.controller.js";
import { checkLogin, checkRegister } from "../middleware/auth.middleware.js";
import {CronJob} from "cron";
import User from "../model/user.js";
import { adminPage, getVote, home, homePage } from "../controllers/admin.controller.js";
import { candidate, candidatePage, getCandidate } from "../controllers/candidate.controller.js";

const generateAdmin = async(req,res) =>{
    try {
        const adminExist = await User.exists({username: 'admin'}).exec();

        if(!adminExist){
            const newAdmin = new User({
                username: 'admin',
                email: 'admin@admin',
                password: "admin",
                number: 123456789
            });
            await newAdmin.save();
            console.log("Admin generated successful.");
        }else{
            console.log("Admin already exists.");
        }
    } catch (error) {
        console.log(error);
        return;
    }
}

let job = new CronJob("* * * * * *", async() =>{
    await generateAdmin();

    job.stop();
})
job.start();



const router = express.Router();


router.get("/register", registerPage);
router.post("/register", checkRegister, register);

router.get("/login", loginPage);
router.post("/login", checkLogin, login);


router.get("/home", homePage);
router.post("/home", home);

router.get("/admin", adminPage);
router.get("/getVote", getVote);

router.get("/candidate", candidatePage);
router.post("/candidate", candidate);
router.get("/getCandidate", getCandidate);
export default router;