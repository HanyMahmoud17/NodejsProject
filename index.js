require('./Config/connect');
const express=require('express');
const cors=require('cors');

const app=express();

// const cors=require('cors')
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// const path=require('path')
// app.get('/html',((req,res)=>{
//     res.sendFile(path.join(__dirname,'./Front','register.html'))
// }))

const authorRoute=require('./Routers/authorRoute');
app.use('/author',authorRoute);




// blog:{title:"php",body:"learn php course",tags:["phpLearn","css","html"]}
// const Author=require('./Models/Author')
// Author.create({name:"hany",email:"sawy@gmail.com",password:"1245454"}).then(data=>{
//     console.log(data);
// }).catch(err=>console.log(err))


// const Blog=require('./Models/BlogM');
// Blog.create({autherId:"645642ca9a74c5b1ad1a8556",title:"php",body:"learn my php course",tags:["phpLearn","css","html"]})

app.listen(3500,()=>{
    console.log("server is listen at port 3500");
})