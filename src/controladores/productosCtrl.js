import { conmysql } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM producto");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getProducto = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM producto WHERE id = ?", [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO producto (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
      [nombre, descripcion, precio, stock]
    );
    res.json({ id: result.insertId, nombre, descripcion, precio, stock });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const [result] = await conmysql.query(
      "UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
      [nombre, descripcion, precio, stock, req.params.id]
    );
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM producto WHERE id = ?", [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
