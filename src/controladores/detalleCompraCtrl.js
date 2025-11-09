import { conmysql } from "../db.js";

export const getDetalleCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM detalle_compra");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los detalles de compra", error });
  }
};

export const getDetalleCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM detalle_compra WHERE id = ?", [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: "Detalle de compra no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el detalle de compra", error });
  }
};

export const createDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
      [id_compra, id_producto, cantidad, precio_unitario]
    );
    res.json({ id: result.insertId, id_compra, id_producto, cantidad, precio_unitario });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el detalle de compra", error });
  }
};

export const updateDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await conmysql.query(
      "UPDATE detalle_compra SET id_compra = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id = ?",
      [id_compra, id_producto, cantidad, precio_unitario, req.params.id]
    );
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Detalle de compra no encontrado" });
    res.json({ message: "Detalle de compra actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el detalle de compra", error });
  }
};

export const deleteDetalleCompra = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM detalle_compra WHERE id = ?", [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Detalle de compra no encontrado" });
    res.json({ message: "Detalle de compra eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el detalle de compra", error });
  }
};
