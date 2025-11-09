import { conmysql } from "../db.js";

export const getAlimentos = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM alimento");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los alimentos", error });
  }
};

export const getAlimento = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM alimento WHERE id = ?", [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: "Alimento no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el alimento", error });
  }
};

export const createAlimento = async (req, res) => {
  try {
    const { nombre, tipo, descripcion } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO alimento (nombre, tipo, descripcion) VALUES (?, ?, ?)",
      [nombre, tipo, descripcion]
    );
    res.json({ id: result.insertId, nombre, tipo, descripcion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el alimento", error });
  }
};

export const updateAlimento = async (req, res) => {
  try {
    const { nombre, tipo, descripcion } = req.body;
    const [result] = await conmysql.query(
      "UPDATE alimento SET nombre = ?, tipo = ?, descripcion = ? WHERE id = ?",
      [nombre, tipo, descripcion, req.params.id]
    );
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Alimento no encontrado" });
    res.json({ message: "Alimento actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el alimento", error });
  }
};

export const deleteAlimento = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM alimento WHERE id = ?", [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Alimento no encontrado" });
    res.json({ message: "Alimento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el alimento", error });
  }
};
