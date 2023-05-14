require('./Config/connect');
const express=require('express');
const path=require('path')
const app=express();
const cors=require('cors')
const multer  = require('multer')



app.use(express.static(path.join(__dirname,'statics')))

// route of blog
//////////////////////////////////////////////
const blogRoute=require('./Routers/blogRoute');
app.use(cors());
app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 
app.use('/blog',blogRoute);
// ////////////////////////////////////////////////

// route of author
//////////////////////////////////////
const authorRoute=require('./Routers/authorRoute');
app.use('/author',authorRoute);
////////////////////////////



// add user
// const Author=require('./Models/Author')
// Author.create({name:"hany",email:"sawy@gmail.com",password:"1245454"}).then(data=>{
//     console.log(data);
// }).catch(err=>console.log(err))

// add blog
// const Blog=require('./Models/BlogM');
// Blog.create({autherId:"64574be0157ab557a4b0263d",title:"momy",body:"learn my momy course",tags:["momy","momy learn","front"],image:"1683570573775-Screenshot(78).png"})


// app.get('/login',(req,res)=>{
// res.sendFile(path.join(__dirname,'./Front','login.html'))
// })



// this to go for page
// app.get('/authorPage',((req,res)=>{
//     res.sendFile(path.join(__dirname,'./Front','author.html'))
// }))
app.get('/createPost',(req,res)=>{
    res.sendFile(path.join(__dirname,'./Front','post.html'))
    })

// app.get('/updateAuthor',((req,res)=>{
//     res.send(req.body);
// }))


app.listen(3500,()=>{
    console.log("server is listen at port 3500");
})