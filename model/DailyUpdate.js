const pool = require("./db")
const {v4:uuidv4} = require("uuid")
class DailyUpdate{
  constructor(name,email) {
    this.name = name;
    this.email = email;
    
  }
  save () {
  const sql = `INSERT INTO dailyupdate (id, name, email,createdAt)
  VALUES ('${uuidv4()}', '${this.name}', '${this.email}', '${new Date()}')`;
  const data = pool.execute(sql);
  return data;
  }
  static findAll() {
    const sql = `SELECT * from dailyupdate`
    const data = pool.execute(sql)
    
    return data
  }
}


module.exports = DailyUpdate;