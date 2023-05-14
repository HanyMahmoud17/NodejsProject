const mongoose=require('mongoose')
const Schema=mongoose;
const userSchema=mongoose.Schema({
    name:{
        type:String,
        // required:true,
        // unique:true
    },
    email:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    image:{
        type:String
    }
    // blog:{
    // type:[Object]
    // }
},{
    strict:false,
    versionKey:false,
})

const Author=mongoose.model('authors',userSchema)
module.exports=Author;