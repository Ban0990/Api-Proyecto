import { conmysql } from "../db.js";
import bcrypt from "bcryptjs";

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM USUARIO");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM USUARIO WHERE id_usuario = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre_usuario, contrasena, id_rol, estado } = req.body;
    const hash = await bcrypt.hash(contrasena, 10);
    const [result] = await conmysql.query(
      "INSERT INTO USUARIO (nombre_usuario, contrasena, id_rol, estado) VALUES (?, ?, ?, ?)",
      [nombre_usuario, hash, id_rol, estado ?? 1]
    );
    res.json({ id: result.insertId, nombre_usuario, id_rol, estado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { nombre_usuario, contrasena, id_rol, estado } = req.body;
    const hash = contrasena ? await bcrypt.hash(contrasena, 10) : null;
    const query = hash
      ? "UPDATE USUARIO SET nombre_usuario=?, contrasena=?, id_rol=?, estado=? WHERE id_usuario=?"
      : "UPDATE USUARIO SET nombre_usuario=?, id_rol=?, estado=? WHERE id_usuario=?";
    const values = hash
      ? [nombre_usuario, hash, id_rol, estado, req.params.id]
      : [nombre_usuario, id_rol, estado, req.params.id];
    const [result] = await conmysql.query(query, values);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM USUARIO WHERE id_usuario=?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
