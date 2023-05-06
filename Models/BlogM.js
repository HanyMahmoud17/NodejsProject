const mongoose=require('mongoose');
const express=require('express');
const app=express();

const Schema=mongoose;

const blogSchema=mongoose.Schema({
    autherId:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        // required:true
    },
    body:{
        type:String,
        // required:true
    },
    photo:{
        type:String,
        required:false
    },
    tags:{
        type:[String]
    }
},{
    strict:false,
    versionKey:false,
})

const Blog=mongoose.model('blogs',blogSchema);
module.exports=Blog;

