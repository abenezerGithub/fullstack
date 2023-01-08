console.clear()
console.log("start")
let express = require("express")
let app = express()
const {uploadEvent,uploadBlog,uploadAlbumDir,uploadAlbum} = require("./model/multerSetup")
let cors = require("cors")
let controllers = require("./controllers/controllers")
const authControllers = require("./controllers/authControllers")
const errorHandler = require("./controllers/errorHandler")
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.static(__dirname+"/client/build"))
app.use(express.json())

//user interface setup
app.route("/")
.get(controllers.rootController)

/*contact api*/
app.route("/admin/contact-message")
.get(authControllers.adminProtectedController,controllers.contactController)
.post(controllers.contactPostMessage)
app.route("/admin/contact-message/:id")
.get(controllers.eachContactController)
.patch(controllers.seenContactController)
//daily update
/*
function check(req,res,next) {
  console.log(res.redirect("/#"))
  next({})
}*/
app.route("/admin/daily-update")
.get(/*check,*/controllers.dailyUpdateController)
.post(controllers.dailyUpdatePostUser)

app.route("/admin/send-daily-update")
.post(controllers.dailyUpdatePostMessage)

app.route("/admin/login")
.get(authControllers.adminProtectedController,authControllers.adminCredentialsControl)
.post(authControllers.adminLoginController)

app.route("/admin/all-registered-admin")
.get(authControllers.adminProtectedController,authControllers.allRegisteredAdminsController)
app.route("/admin/add-new-admin")
.post(authControllers.addNewAdminControllers)


//event 
app.route("/admin/event")
.get(controllers.eventController)
.post(authControllers.adminProtectedController,uploadEvent().single("event-img"),controllers.eventPostController)

app.route("/admin/event/:id")
.get(controllers.eachEventController)
.delete(authControllers.adminProtectedController,controllers.eachEventDeleteController)

//blog
app.route("/admin/blog")
.get(controllers.blogController)
.post(authControllers.adminProtectedController,uploadBlog().single("blog-img"),controllers.blogPostController)


 app.route("/admin/blog/:id")
.get(controllers.eachBlogController)
.delete(authControllers.adminProtectedController,controllers.eachBlogDeleteController)
//album
app.route("/admin/album")
.get(controllers.albumController)
.post(authControllers.adminProtectedController,uploadAlbumDir,uploadAlbum().array("album"),controllers.albumPostController)

app.route("/admin/album/:id")
.get(controllers.eachAlbumController)
.delete(authControllers.adminProtectedController,controllers.eachAlbumDeleteController)
//view engine 404 set up
app.get("*",(req,res) => res.sendFile(__dirname+"/client/build/index.html"))

//global error handle middleware
app.use(errorHandler)

//caught exception
process.on('uncaughtException', function (err) {
  console.log('uncaughtException', err);
})

app.listen(process.env.PORT || 8000) 
 
 
 
 