import { conmysql } from "../db.js";

// ==========================================
// Obtener todas las compras
// ==========================================
export const getCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM COMPRA");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las compras", error });
  }
};

// ==========================================
// Obtener una compra por ID
// ==========================================
export const getCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM COMPRA WHERE id_compra = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la compra", error });
  }
};

// ==========================================
// Crear una compra
// ==========================================
export const createCompra = async (req, res) => {
  try {
    const { id_usuario, id_proveedor, fecha_compra, total } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO COMPRA (id_usuario, id_proveedor, fecha_compra, total)
       VALUES (?, ?, ?, ?)`,
      [id_usuario, id_proveedor, fecha_compra, total]
    );

    res.json({
      id_compra: result.insertId,
      id_usuario,
      id_proveedor,
      fecha_compra,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la compra", error });
  }
};

// ==========================================
// Actualizar una compra
// ==========================================
export const updateCompra = async (req, res) => {
  try {
    const { id_usuario, id_proveedor, fecha_compra, total } = req.body;

    const [result] = await conmysql.query(
      `UPDATE COMPRA 
       SET id_usuario = ?, id_proveedor = ?, fecha_compra = ?, total = ?
       WHERE id_compra = ?`,
      [id_usuario, id_proveedor, fecha_compra, total, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    res.json({ message: "Compra actualizada correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la compra", error });
  }
};

// ==========================================
// Eliminar una compra
// ==========================================
export const deleteCompra = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM COMPRA WHERE id_compra = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Compra no encontrada" });

    res.json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la compra", error });
  }
};
