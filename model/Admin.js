const bcrypt = require("bcryptjs")
const {v4:uuidv4} = require("uuid")
const jwt = require("jsonwebtoken")
const AppError = require("../controllers/AppError")
const pool = require("./db")
const JWT_SECRET = "bebde5e9-77ef-4858-8a04-7461a8f16afa"
const JWT_TIME = "10hr";

class Admin{
  constructor(email,password = "",secret,next) {
    this.email = email;
    this.password = password;
    this.secret = secret;
    this.next = next;
    
  }
  async login() {
    const sql = `SELECT * FROM admin WHERE email = '${this.email}'`;
    const [data,_] = await pool.execute(sql)
    
    const admin = data[0];
  if(!admin) {
   return this.next(new AppError("User Not Found.",404))
  }
  const isCorrectPassword = await bcrypt.compare(this.password,admin.password)
 if(!isCorrectPassword) {
  return this.next(new AppError("User password not correct.",404))
 }
    return {
      status:"success",
      token:this.signJWT({id:admin.id})
    }
  }
  
  signJWT(data) {
   const token = jwt.sign(data,JWT_SECRET,{
    expiresIn:JWT_TIME
    })
    return token
  }
async  newAdmin() {
 this.password = await bcrypt.hash(this.password,10);
 this.secret = await bcrypt.hash(this.secret,10);
 const sql = `INSERT INTO admin (id, email, password,secretWord) VALUES ('${uuidv4()}','${this.email}','${this.password}','${this.secret}')`;
  
  const data = pool.execute(sql);
  return data;
 }
 
 
  
  static findById(id) {
    const sql = `SELECT * from admin WHERE id = '${id}'`
    const data =  pool.execute(sql)
    return data
  }
  
  static findAll() {
    const sql = `SELECT * from admin`
    const data =  pool.execute(sql)
    return data
  }
  

}


module.exports = Admin;
