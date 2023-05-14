const express=require('express');
const Author=require('../Models/Author')
const Blog = require('../Models/BlogM')
const route=express.Router();
const bodyParser=require('body-parser')
const multer  = require('multer')
const path=require('path');
const { log } = require('console');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
route.use(cookieParser())


//////////////home Page
route.get('/PageHome', ((req, res) => {
  res.sendFile(path.join(__dirname, '../Front', 'home.html'))
}))
//////////////author Page

route.get('/authorPage', ((req, res) => {
  res.sendFile(path.join(__dirname, '../Front', 'author.html'))
}))
//////////////register Page
route.get("/register",function(req,res)
{
     res.sendFile(path.join(__dirname,'../Front',"register.html"));
})
//////////////login Page

route.get("/loginPage",function(req,res)
{
     res.sendFile(path.join(__dirname,'../Front',"login.html"));
})


const filestorage = multer.diskStorage({
  destination: (req, file, callbackfun) => {
      // console.log(req,file);
      callbackfun(null, './statics/assets/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", ''))
  }
})
const upload = multer({ storage: filestorage });


//////////////register route

route.post('/register',upload.single('image'),bodyParser.urlencoded({ extended: false }),(req, res) => {  
  Author.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      image:req.file.filename
     });
    res.redirect('/author/loginPage')
  });

//////////////login route

route.post('/login',async function(req,res)
{
    
    let us= await Author.findOne({
      email:req.body.email,
      password:req.body.password
    })
    if(us){
    let payload = { userId: us._id };
    let token = jwt.sign(payload, "key");
    //res.send(token);
     res.cookie('token', token, { maxAge: 900000, httpOnly: true });
    // localStorage.setItem('token', 'token')
    res.redirect('/author/PageHome')
    
    }
})
// ////////////////////////////////////
route.get('/getProfAuthor',async (req,res)=>{
  // const userId = req.cookies.token;
  let decodedUthor = jwt.verify(req.cookies.token, "key");
  // console.log(decodedUthor.userId);
//     // let uses = await Author.findOne({_id:decoded.userId})
//     // let uses = await Author.findOne({_id:decoded.userId})
//     // console.log(uses);
//     console.log(decodedUthor);
//     // let we = await Author.findById(decodedUthor.userId)
//     // let blogs = await Blog.find({"publisher._id":we._id});
// // console.log(blogs);
// // console.log(us);
 let authorInfo=await Author.findOne({_id:decodedUthor.userId});
   if (authorInfo) {
     res.send(authorInfo)
   }else{
     res.status(404).send("not found");
   }
  })
////////////////////////////////////////////////////////
route.get('/search/:title',async (req,res)=>{
  try{
      const q=req.params.title;
      const blog=await Blog.find({
          $or: [
              { title: { $regex: q, $options: 'i' } },
              { body: { $regex: q, $options: 'i' } },
              { tags: { $regex: q, $options: 'i' } }
            ]
      })
      if (blog.length > 0) {
          res.json(blog);
        } else {
          res.status(404).json({ message: 'Blog not found' });
        }
  }catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
})
/////////////////////////////////////////////
route.get("/userblog", async (req, res) => {
  let pathFile = path.join(__dirname,"..","public",'userblog.html')
  res.sendFile(pathFile) 
  // Get The Id From Cookie 
  const userId = req.cookies.autherId;

  console.log(userId+"Id In User Blog");
});
/////////////////////


// })

 module.exports=route;