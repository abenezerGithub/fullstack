const production = (err,req,res) => {
    if(err.isOperational) {
    let {statusCode,message,status} = err;
    res.status(statusCode).json({
        statusCode,
        status,
        message,
    })
    }else {
     res.status(500).json({
        message:"Something went very Wrong",
    }) 
    }
}
const development = (err,req,res) => {
  console.log(err)
   let {statusCode,message,status} = err;
    res.status(statusCode).json({
        status,
        message,
        err
    })
}

module.exports = function(err,req,res,next){
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error"
  if(process.env.NODE_ENV === "production") {
   //    error = JSON.parse(JSON.stringify(err))
     production(err,req,res) 
  }
  else if(process.env.NODE_ENV === "development") {
      development(err,req,res)
  }
} 