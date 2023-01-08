const pool = require("./db")
const {v4:uuidv4} = require("uuid")
class Album{
  constructor(title,albumPath,images) {
    this.title = title || "No title";
    this.albumPath = albumPath || "No text";
    this.images = images || [{}];
  }
  save () {
  const sql = `INSERT INTO album (id, title,albumPath,date,images)
   VALUES ('${uuidv4()}', '${this.title}','${this.albumPath}','${new Date()}','${JSON.stringify(this.images)}')`;
  const data = pool.execute(sql);
  
  return data;
  }
  static findAll() {
    const sql = "SELECT * from album"
    const data = pool.execute(sql)
    
    return data
  }
  static findById(id) {
    const sql = `SELECT * from album WHERE id = '${id}'`;
    const data = pool.execute(sql)
    return data;
  }
  static findByIdAndDelete(id) {
    const sql = `DELETE FROM album WHERE id = '${id}'`;
    const data = pool.execute(sql)
    return data;
  }
}


module.exports = Album;