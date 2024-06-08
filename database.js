import mysql from "mysql2/promise";
import config from "./dbConfig.js";

const pool = mysql.createPool(config);

export const getMember = async (niss) => {
  const memberFields = ["id", "naam", "voornaam", "rijksregisternummer", ]
  const [rows] = await pool.query(`SELECT ${memberFields.join(',')} from ledenlijst where rijksregisternummer like ?`, [niss]);
  return rows[0];
}

