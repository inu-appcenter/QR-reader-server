const { format } = require("mysql2/promise");
const db = require("mysql2/promise");
const config = require("..");

const pool = db.createPool({
  ...config.db,
  database: config.dbSchema,
  connectionLimit: 50,
  waitForConnections: true,
  dateStrings: "date",
});

const executeQuery = (query, values = []) =>
  new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = format(query, values);
      const [result] = await conn.execute(sql);
      conn.release();
      resolve(result);
    } catch (err) {
      if (conn) conn.release();
      reject(err);
    }
  });

module.exports = {
  executeQuery,
};
