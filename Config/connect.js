const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Story').then(function(data)
{
    console.log('server is connected');

    
}).catch(err=>{
    console.log(err);
})