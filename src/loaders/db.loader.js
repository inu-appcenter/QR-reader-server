const db = require("mysql2/promise");
const config = require("../configs");

async function dbLoader() {
  const connDB = await db.createConnection(config.db);
  await connDB.execute(`CREATE DATABASE IF NOT EXISTS ${config.dbSchema}`);
  await connDB.end();
  console.dir("create database if not ...");
  const connTABLE = await db.createConnection({ ...config.db, database: config.dbSchema });
  const tables = [
    `CREATE TABLE IF NOT EXISTS qr_record (
          id int(11) NOT NULL AUTO_INCREMENT,
          studentId varchar(100) NOT NULL,
          buildingId varchar(100) NOT NULL,
          entryDate varchar(100) NOT NULL,
          entryTime varchar(100) NOT NULL,
          createdAt timestamp NOT NULL DEFAULT current_timestamp(),
          PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  ];
  await Promise.all(tables.map(e => connTABLE.execute(e)));
  await connTABLE.end();
  console.dir("create table if not ...");
}

module.exports = dbLoader;
