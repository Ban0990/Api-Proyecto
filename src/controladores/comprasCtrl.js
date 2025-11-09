import { conmysql } from "../db.js";

export const getCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM compra");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las compras", error });
  }
};

export const getCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM compra WHERE id = ?", [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: "Compra no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la compra", error });
  }
};

export const createCompra = async (req, res) => {
  try {
    const { id_proveedor, fecha, total } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO compra (id_proveedor, fecha, total) VALUES (?, ?, ?)",
      [id_proveedor, fecha, total]
    );
    res.json({ id: result.insertId, id_proveedor, fecha, total });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la compra", error });
  }
};

export const updateCompra = async (req, res) => {
  try {
    const { id_proveedor, fecha, total } = req.body;
    const [result] = await conmysql.query(
      "UPDATE compra SET id_proveedor = ?, fecha = ?, total = ? WHERE id = ?",
      [id_proveedor, fecha, total, req.params.id]
    );
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Compra no encontrada" });
    res.json({ message: "Compra actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la compra", error });
  }
};

export const deleteCompra = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM compra WHERE id = ?", [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Compra no encontrada" });
    res.json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la compra", error });
  }
};
