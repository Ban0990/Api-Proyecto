import { conmysql } from "../db.js";

// =====================================
// Obtener todos los detalles de compra
// =====================================
export const getDetalleCompras = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM DETALLE_COMPRA");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los detalles de compra",
      error: error.message
    });
  }
};

// =====================================
// Obtener detalle de compra por ID
// =====================================
export const getDetalleCompra = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM DETALLE_COMPRA WHERE id_detalle_compra = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Detalle de compra no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el detalle de compra",
      error: error.message
    });
  }
};

// =====================================
// Crear detalle de compra
// =====================================
export const createDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;

    // Validación básica
    if (!id_compra || !id_producto || !cantidad || !precio_unitario) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const [result] = await conmysql.query(
      "INSERT INTO DETALLE_COMPRA (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
      [id_compra, id_producto, cantidad, precio_unitario]
    );

    const newId = result.insertId;

    // Obtener el registro completo (con subtotal generado automáticamente)
    const [nuevoRegistro] = await conmysql.query(
      "SELECT * FROM DETALLE_COMPRA WHERE id_detalle_compra = ?",
      [newId]
    );

    res.json(nuevoRegistro[0]);

  } catch (error) {
    res.status(500).json({
      message: "Error al crear el detalle de compra",
      error: error.message
    });
  }
};

// =====================================
// Actualizar detalle de compra
// =====================================
export const updateDetalleCompra = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;

    const [result] = await conmysql.query(
      "UPDATE DETALLE_COMPRA SET id_compra=?, id_producto=?, cantidad=?, precio_unitario=? WHERE id_detalle_compra = ?",
      [id_compra, id_producto, cantidad, precio_unitario, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Detalle de compra no encontrado" });
    }

    const [registroActualizado] = await conmysql.query(
      "SELECT * FROM DETALLE_COMPRA WHERE id_detalle_compra = ?",
      [req.params.id]
    );

    res.json(registroActualizado[0]);

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el detalle de compra",
      error: error.message
    });
  }
};

// =====================================
// Eliminar detalle de compra
// =====================================
export const deleteDetalleCompra = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM DETALLE_COMPRA WHERE id_detalle_compra = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Detalle de compra no encontrado" });
    }

    res.json({ message: "Detalle de compra eliminado correctamente" });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el detalle de compra",
      error: error.message
    });
  }
};
