import mongoose from "mongoose";
import Url from "../models/url.model.js";
import connectDB from "../config/mongo.config.js"
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const intiData = async () => {
   connectDB().catch(err => console.log(err));
    let deleted = await Url.deleteMany({});
    // let find = await Url.find({})
    console.log("deleted", deleted);
    await mongoose.disconnect();
};

intiData();