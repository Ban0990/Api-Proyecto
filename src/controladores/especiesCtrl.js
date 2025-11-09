import { conmysql } from "../db.js";

// Obtener todas las especies
export const getEspecies = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM especie");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las especies", error });
  }
};

// Obtener una especie por ID
export const getEspecie = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM especie WHERE id_especie = ?", [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Especie no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la especie", error });
  }
};

// Crear una nueva especie
export const createEspecie = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO especie (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );
    res.json({ id: result.insertId, nombre, descripcion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la especie", error });
  }
};

// Actualizar especie
export const updateEspecie = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    await conmysql.query(
      "UPDATE especie SET nombre=?, descripcion=? WHERE id_especie=?",
      [nombre, descripcion, req.params.id]
    );
    res.json({ message: "Especie actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la especie", error });
  }
};

// Eliminar especie
export const deleteEspecie = async (req, res) => {
  try {
    await conmysql.query("DELETE FROM especie WHERE id_especie = ?", [req.params.id]);
    res.json({ message: "Especie eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la especie", error });
  }
};
