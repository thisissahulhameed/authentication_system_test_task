import mysql from "mysql2/promise";

//Mysql Db connection and query connection
export default async function dbQueryHandler(query, values = []) {
  const dbConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  try {
    const [resData] = await dbConnection.execute(query, values);
    dbConnection.end();
    return resData;
  } catch (err) {
    return err;
  }
}
