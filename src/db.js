import mysql from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from "./config.js";

export const conmysql = mysql.createPool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Verificar conexión
(async () => {
  try {
    const connection = await conmysql.getConnection();
    console.log("✅ Conectado exitosamente a la base de datos:", DB_NAME);
    connection.release();
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  }
})();
