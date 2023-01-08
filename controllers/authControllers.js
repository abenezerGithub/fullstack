let {promisify} = require("util")
const jwt = require("jsonwebtoken")
const AppError = require("./AppError")
const catchAsync = require("./catchAsync")
const Admin = require("../model/Admin")
const JWT_SECRET = "bebde5e9-77ef-4858-8a04-7461a8f16afa"

module.exports.adminLoginController = catchAsync(async (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  console.log(req.body)
  const adminUser = new Admin(email,password,"",next);
  const token = await adminUser.login()
  res.json(token)
})

module.exports.adminCredentialsControl = catchAsync(async (req,res,next) => {
  res.json(req.body.admin)
})

module.exports.allRegisteredAdminsController = catchAsync(async (req,res,next) => {
  const [data,_] = await Admin.findAll()
  console.log(data,req.body.admin)
  const admins = data.filter(admin => admin.id !== req.body.admin.id)
  const inChargeAdmin = data.filter(admin => admin.id === req.body.admin.id)[0]
  res.status(200).json({
    status:"success",
    inChargeAdmin,
    admins
  })
})
module.exports.adminProtectedController = catchAsync(async (req,res,next) => {
   if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return next(new AppError("Please Login First!",401))
    }
   const token = req.headers.authorization.split(" ")[1]
    if(!token) {
        return next(new AppError("Please provide Token!",401))
    }
  let decoded = await promisify(jwt.verify)(token,JWT_SECRET);
  
  const [data,_] = await Admin.findById(decoded.id)
 const admin = data[0]
   if(!admin) next(new AppError("The User is Not exist!",403))
   req.body.admin = {id:admin.id,email:admin.email}
  next()
}) 

module.exports.addNewAdminControllers = catchAsync(async (req,res,next) => {
    const email = req.body.email;
    const secret = req.body.email;
    const password = req.body.password;
    
    const newAdmin = new Admin(email,password,secret);
    
    const [data,_] = await newAdmin.newAdmin();
    res.status(201).json({
      status:"success",
      message:"Admin Added Successfully."
    })
})
