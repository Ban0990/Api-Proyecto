import { conmysql } from "../db.js";

export const getProveedores = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM proveedor");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proveedores", error });
  }
};

export const getProveedor = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM proveedor WHERE id = ?", [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proveedor", error });
  }
};

export const createProveedor = async (req, res) => {
  try {
    const { nombre, direccion, telefono } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO proveedor (nombre, direccion, telefono) VALUES (?, ?, ?)",
      [nombre, direccion, telefono]
    );
    res.json({ id: result.insertId, nombre, direccion, telefono });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proveedor", error });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const { nombre, direccion, telefono } = req.body;
    const [result] = await conmysql.query(
      "UPDATE proveedor SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?",
      [nombre, direccion, telefono, req.params.id]
    );
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ message: "Proveedor actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el proveedor", error });
  }
};

export const deleteProveedor = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM proveedor WHERE id = ?", [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proveedor", error });
  }
};
