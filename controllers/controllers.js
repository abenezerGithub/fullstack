const path = require("path")
let {promisify} = require("util")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("./AppError")
const catchAsync = require("./catchAsync")
const db = require("../model/db")
const Admin = require("../model/Admin")
const Contact = require("../model/Contact")
const DailyUpdate = require("../model/DailyUpdate")
const Event = require("../model/Event")
const Blog = require("../model/Blog")
const Album = require("../model/Album")


//user interface controller
module.exports.rootController =  (req,res) => {
    res.status(200).sendFile(__dirname+"/../client/build/index.html")
}
//admin login




//contact post and api
module.exports.contactController = catchAsync(async(req,res,next)=> {
  const [data,_] = await Contact.findAll();
  res.status(200).json({
    status:"success",
    data
  })

})
module.exports.contactPostMessage = catchAsync(async(req,res,next)=> {
  const name = req.body.name || "No name";
  const email = req.body.email || "No Email";
  const subject = req.body.subject || "No Subject";
  const message = req.body.message || "No message";
 const newContact = new Contact(name,email,subject,message);
 const [data,_] = await newContact.save()
  res.status(201).json({
    status:"success",
    data
  })
})
module.exports.eachContactController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Contact.findById(id)
  res.status(200).json({
    status:"success",
    data
  })
})

module.exports.seenContactController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Contact.findByIdAndSeen(id);
   
  res.status(200).json({
    status:"success",
    data
  })
})
//dailyupdate post and api
module.exports.dailyUpdateController = catchAsync(async(req,res,next)=> {
  const [data,_] = await DailyUpdate.findAll();
  res.status(200).json({
    status:"success",
    data
  })
})
module.exports.dailyUpdatePostUser = catchAsync(async(req,res,next)=> {
 const name = req.body.name || "No name";
  const email = req.body.email || "No Email";
  
 const newDailyUpdate = new DailyUpdate(name,email);
 console.log(newDailyUpdate)
 const [data,_] = await newDailyUpdate.save()
  res.status(200).json({
    status:"success",
    data
  })
})
module.exports.dailyUpdatePostMessage = catchAsync(async(req,res,next)=> {
 const subject = req.body.subject;
  const text = req.body.text;
  
  console.log(subject,text)
  console.log("using nodemailer for next.. ")
  res.status(200).json({
    status:"success",
  })
})

//events api and post
module.exports.eventController = catchAsync(async(req,res,next)=> {
  let [data,_] = await Event.findAll();
 data = data.map(event => {
    event.links = JSON.parse(event.links)
    return event
  });
  res.status(200).json({
    status:"success",
    data
  })
})

//handling multer 
module.exports.eventPostController = catchAsync(async(req,res,next)=> {
  const file = req.file;
  const title = req.body.title ;
  const quote = req.body.quote;
  const text = req.body.text;
  const image =  file.destination.slice(file.destination.indexOf("/assets"),file.destination.length) + "/" + file.filename;
  const links = req.body.links;
 const newEvent = new Event(title,quote,text,image,links);
 const [data,_] = await newEvent.save()
  res.status(201).json({
    status:"success",
    message:"The message send"
  })
})

module.exports.eachEventController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Event.findById(id);
  res.status(200).json({
    status:"success",
    data
  })
})



module.exports.eachEventDeleteController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Event.findByIdAndDelete(id);
  res.status(200).json({
    status:"success",
    message:"Event successfully deleted."
  })
})

//blog api and post
module.exports.blogController = catchAsync(async(req,res,next)=> {
  const [data,_] = await Blog.findAll();
  res.status(200).json({
    status:"success",
    data
  })
})

//handling multer 
module.exports.blogPostController = catchAsync(async(req,res,next)=> {
  const file = req.file;
  const title = req.body.title ;
  const text = req.body.text;
  const image =  file.destination.slice(file.destination.indexOf("/assets"),file.destination.length) + "/" + file.filename;
  
 const newBlog = new Blog(title,text,image);
 const [data,_] = await newBlog.save()
  res.status(200).json({
    status:"success",
    data
  })
})

module.exports.eachBlogController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Blog.findById(id);
  if(!data.length) {
  return  res.status(404).json({
    status:"error",
    message:"blog not found"
  })
 }
  res.status(200).json({
    status:"success",
    data
  })
})
module.exports.eachBlogDeleteController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Blog.findByIdAndDelete(id);
  res.status(200).json({
    status:"success",
    message:"Blog successfully deleted."
  })
})

//album api post
module.exports.albumController = catchAsync(async(req,res,next)=> {
  let [data,_] = await Album.findAll();
  data = data.map(album => {
    album.images = JSON.parse(album.images)
    return album
  })
  res.status(200).json({
    status:"success",
    data,
  })
})

//handling multer 
module.exports.albumPostController = catchAsync(async(req,res,next)=> {
  //if(!req.files.length) next(new AppError("Faild to save",500))
   const files = req.files
   const title = req.body.title ;
  const albumPath = req.body.albumPath;
  const images = files.map(file => {
    let path = file.destination.slice(file.destination.indexOf("/assets"),file.destination.length) + "/" + file.filename;
    return {path}
  });
 const newAlbum = new Album(title,albumPath,images);
 const [data,_] = await newAlbum.save()
  res.status(200).json({
    status:"success",
    data
  })
})

module.exports.eachAlbumController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Album.findById(id);
 if(!data.length) {
  return  res.status(404).json({
    status:"error",
    message:"blog not found"
  })
 }
  res.status(200).json({
    status:"success",
    data
  })
})

module.exports.eachAlbumDeleteController = catchAsync(async(req,res,next)=> {
  const id = req.params.id;
   const [data,_] = await Album.findByIdAndDelete(id);
   
  res.status(200).json({
    status:"success",
    message:"Album successfully deleted."
  })
})