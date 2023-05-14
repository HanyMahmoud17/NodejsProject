const express = require('express');
const Blog = require('../Models/BlogM')
const Author=require('../Models/Author')
const route = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const { title } = require("process");
const { appendFile } = require("fs");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
route.use(cookieParser())


//////////////////////////
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


/////////////////////Home Page
route.get('/PageHome', ((req, res,next) => {
    res.sendFile(path.join(__dirname, '../Front', 'home.html'))
}))

/////////////////////author add Post Page
route.get('/PageBlogs', ((req, res,next) => {
    res.sendFile(path.join(__dirname, '../Front', 'post.html'))
}))

/////////////////////author Page
route.get('/authorPage', ((req, res,next) => {
    res.sendFile(path.join(__dirname, '../Front', 'author.html'))
}))


///////////////////////////get all plogs
route.get('/getblogs', async function (req, res) {
    let blogs = await Blog.find();
    if (blogs) {
        res.send(blogs);
    }
    else {
        res.status(404).send('not found');
    }
})
// //////////////////me
// route.post('/addBlog',upload.single('image'),bodyParser.urlencoded({ extended: false }), (req, res) => {
//     Blog.create({
//         title: req.body.title,
//         body: req.body.body,
//         tags: req.body.tags,
//         image: req.file.filename
//     });
//     // res.send(Blog)
//     res.redirect("/blog/authorPage")
// });
// ///////////////////////////////////////hos two
route.post('/addblog',upload.single("image"),bodyParser.urlencoded({ extended: false }),async function(req,res)
{
    let decoded = jwt.verify(req.cookies.token, "key");
    // console.log(decoded.userId);
    let uses = await Author.findOne({_id:decoded.userId})
    
    let us= await Blog.create({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        image: req.file.filename,
        publisher:uses,
    })
    res.redirect("/blog/authorPage")
 
})
// //////////////////////////////////// last code 

// route.post("/addBlog", async (req, res) => {
//     try {
//       const userId = req.cookies.autherId;
//       if (!userId) {
//         throw new Error("User is not authenticated.");
//       }
//       let decoded = jwt.verify(userId, "shhhhh");
  
//       let author = await Author.findById(decoded.iti);
//       if (!author) {
//         throw new Error("Author not found.");
//       }
  
//       let blog = new Blog({
//         title: req.body.title,
//         body: req.body.body,
//         tags: req.body.tags,
//         image: req.file.filename,
//         author: decoded.iti,
//       });
  
//       await blog.save();
//       res.redirect("/blog/authorPage");
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });
///////////////////////////////////////////////////

// get user blog
route.get('/getauthorBlogs', async function (req, res) {
    
    let decoded = jwt.verify(req.cookies.token, "key");
    let us = await Author.findById(decoded.userId)
    let blogs = await Blog.find({"publisher._id":us._id});
    // if (blogs) {
        // console.log(blogs);
        res.send(blogs);
    // }
    // else {
    //     res.status(404).send('not found');
    // }
})


route.get('/:id',async function(req,res)
{
    let blogofthisuser= await Blog.findOne({_id:req.params.id})
    if(blogofthisuser){

        res.send(blogofthisuser);
        // res.redirect('/blog/PageBlogs');
    }
    else{
        res.status(404).send('not found');
    }

    // console.log(blogofthisuser);
})

route.get('/getblogData/:id',async(req,res)=>{
    
    let blogData=await Blog.findOne({_id:req.params.id})
    if(blogData){
        res.send(blogData)
    }
})

route.put('/updateBlog/:id',async function(req,res)
{
  let update= await Blog.findByIdAndUpdate(req.params.id,req.body);
//   res.redirect('/createPost')
//   res.send(update);
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
        // console.error(err);
        // res.status(500).json({ message: 'Internal server error' });
      }
})
/////////////////////////////////////////////
route.delete('/del/:id',async function(req,res){
    let deleteData= await Blog.deleteOne({_id:req.params.id})
    res.send(deleteData);
  })


module.exports = route