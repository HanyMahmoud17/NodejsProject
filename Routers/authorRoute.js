const express=require('express');
const Author=require('../Models/Author')
const route=express.Router();
const bodyParser=require('body-parser')

// route.post('/register',bodyParser.urlencoded({extended:false}))
// router.get('/', function(req, res, next) {
//     res.render('index');
//   });
const path=require('path')
route.get("/register",function(req,res)
{
     res.sendFile(path.join(__dirname,'../Front',"register.html"));
})

route.post('/register',bodyParser.urlencoded({extended:false}),(req, res,next) => {
    let author= Author.create(req.body);
    console.log(author);
    // res.send(author);
    // res.redirect('C:\Users\LAPTOP WORLD\Desktop\BlogProject\Front\login.html')
  });

//   route.get('/',(res,req)=>{
//     
//   })

  module.exports=route;