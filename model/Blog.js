const pool = require("./db")
const {v4:uuidv4} = require("uuid")
class Event{
  constructor(title,text,image) {
    this.title = title || "No title";
    this.text = text || "No text";
    this.image = image || "No image";
  }
  save () {
  const sql = `INSERT INTO blogs (id, title,text,image,date) VALUES ('${uuidv4()}', '${this.title}','${this.text}','${this.image}', '${new Date()}')`;
  const data = pool.execute(sql);
  
  return data;
  }
  static findAll() {
    const sql = "SELECT * from blogs"
    const data = pool.execute(sql)
    
    return data
  }
  static findById(id) {
    const sql = `SELECT * from blogs WHERE id = '${id}'`;
    const data = pool.execute(sql)
    return data;
  }
   static findByIdAndDelete(id) {
    const sql = `DELETE FROM blogs WHERE id = '${id}'`;
    const data = pool.execute(sql)
    return data;
  }
}


module.exports = Event;