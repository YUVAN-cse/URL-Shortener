// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const { Schema } = mongoose;

const urlSchema = new Schema({
    full_url: {
        type: String,
        required: true,
        unique:true,
        index:true
    },
    short_url: {
        type: String,
        required: true,
        unique:true,
        index:true,
    },
    clicks:{
        type:Number,
        default:0,
    },
    createdBy :{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});


export default mongoose.model('Url', urlSchema);