import { conmysql } from "../db.js";

export const getInventarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM inventario");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener inventarios", error });
  }
};

export const getInventario = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM inventario WHERE id = ?", [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: "Inventario no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el inventario", error });
  }
};

export const createInventario = async (req, res) => {
  try {
    const { id_producto, cantidad, ubicacion } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO inventario (id_producto, cantidad, ubicacion) VALUES (?, ?, ?)",
      [id_producto, cantidad, ubicacion]
    );
    res.json({ id: result.insertId, id_producto, cantidad, ubicacion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el inventario", error });
  }
};

export const updateInventario = async (req, res) => {
  try {
    const { id_producto, cantidad, ubicacion } = req.body;
    const [result] = await conmysql.query(
      "UPDATE inventario SET id_producto = ?, cantidad = ?, ubicacion = ? WHERE id = ?",
      [id_producto, cantidad, ubicacion, req.params.id]
    );
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Inventario no encontrado" });
    res.json({ message: "Inventario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el inventario", error });
  }
};

export const deleteInventario = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM inventario WHERE id = ?", [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Inventario no encontrado" });
    res.json({ message: "Inventario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el inventario", error });
  }
};
