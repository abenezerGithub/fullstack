const multer  = require('multer')
const {v4:uuidv4} = require("uuid")
const fs = require("fs")
module.exports.uploadEvent  = () => {
  let path = "";
  if(process.env.NODE_ENV === "development") {
    path = "./client/public/assets/img/events"
  }
  else if(process.env.NODE_ENV === "production") {
    path = "./client/build/assets/img/events"
  }
  const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=> {
    cb(null,path)
  },
  filename:(req,file,cb) => {
    cb(null,"holistic--events-createdAt--" + Date.now() + "--" + file.originalname)
  }
});
const upload = multer({storage:fileStorageEngine})
 
 return upload
}

module.exports.uploadBlog  = () => {
  let path = "";
  if(process.env.NODE_ENV === "development") {
    path = "./client/public/assets/img/blogs"
  }
  else if(process.env.NODE_ENV === "production") {
    path = "./client/build/assets/img/blogs"
  }
  const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=> {
    cb(null,path)
  },
  filename:(req,file,cb) => {
    cb(null,"holistic--blogs-createdAt--" + Date.now() + "--" + file.originalname)
  }
});
const upload = multer({storage:fileStorageEngine})
 
 return upload
}
module.exports.uploadAlbumDir = (req,res,next) => {
 let path = "";
  if(process.env.NODE_ENV === "development") {
    path = "./client/public/assets/img/gallery"
  }
  else if(process.env.NODE_ENV === "production") {
    path = "./client/build/assets/img/gallery"
  }
  const newDirName = "/album" + "--"  + uuidv4() + "--createdAt--" + Date.now();
   const fullPath = path + newDirName;
   fs.mkdirSync(fullPath,{recursive:true});
    req.params.albumPath = "/assets/img/gallery" + newDirName;
    req.params.fullPath = fullPath;
  next()
}
module.exports.uploadAlbum  = () => {
  const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=> {
    const fullPath = req.params.fullPath;
    req.body.albumPath = req.params.albumPath
    cb(null,fullPath)
  },
  filename:(req,file,cb) => {
    cb(null,"holistic--album-createdAt--" + Date.now() + "--" + file.originalname)
  }
});
const upload = multer({storage:fileStorageEngine})
 
 return upload
}