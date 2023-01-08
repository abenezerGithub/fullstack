const pool = require("./db")
const {v4:uuidv4} = require("uuid")
class Contact{
  constructor(name,email,subject,message) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }
  save () {
  const sql = `INSERT INTO contact (id, name, email, subject,message, date, seen)
  VALUES ('${uuidv4()}', '${this.name}', '${this.email}', '${this.subject}','${this.message}', '${new Date()}', false)`;
  const data = pool.execute(sql);
  return data;
  }
  static findAll() {
    const sql = `SELECT * from contact`
    const data = pool.execute(sql)
    
    return data
  }
  static findById(id) {
    const sql = `SELECT * from contact WHERE id = '${id}'`;
    
    const data = pool.execute(sql)
    
    return data;
  }
  static findByIdAndSeen(id) {
    const sql = `UPDATE contact SET seen = true WHERE id = '${id}'`;
    const data = pool.execute(sql)
    
    return data;
  }
}


module.exports = Contact;
