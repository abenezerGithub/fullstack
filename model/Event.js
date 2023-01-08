const pool = require("./db")
const {v4:uuidv4} = require("uuid")
class Event{
  constructor(title,quote,text,image,links) {
    this.title = title || "No title";
    this.quote = quote || "No quote";
    this.text = text || "No text";
    this.image = image || "No image";
    this.links = [JSON.parse(links[0])] || [{}];
  }
  save () {
  const sql = `INSERT INTO events (id, title, quote,text,image,links,date)
   VALUES ('${uuidv4()}', '${this.title}', '${this.quote}','${this.text}','${this.image}','${JSON.stringify(this.links)}', '${new Date()}')`;
  const data = pool.execute(sql);
  
  return data;
  }
  static findAll() {
    const sql = "SELECT * from events"
    const data = pool.execute(sql)
    
    return data
  }
  static findById(id) {
    const sql = `SELECT * from events WHERE id = '${id}'`;
    const data = pool.execute(sql)
    return data;
  }
 static findByIdAndDelete(id) {
    const sql = `DELETE FROM events WHERE id = '${id}'`;
    const data = pool.execute(sql)
    return data;
  }
}


module.exports = Event;