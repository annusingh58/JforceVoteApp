import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
// import encrypt from "encryptjs";
import dotenv from "dotenv";
import router from "./route/userroutes.js";
import session from "express-session";

const app= express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(session({secret: 'jforceVote',
    resave: false,
    saveUninitialized: true
}))
app.use('/vote',router);

mongoose.connect(process.env.MONGO)
.then(()=>console.log("db connected"))
.catch((err)=>console.log("error",err));

app.listen(process.env.PORT,()=>console.log(`working on port ${process.env.PORT}`));
