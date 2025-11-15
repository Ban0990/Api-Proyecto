import { conmysql } from "../db.js";

// ======================================
// Obtener todos los inventarios
// ======================================
export const getInventarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT i.*, p.id_alimento
      FROM INVENTARIO i
      INNER JOIN PRODUCTO p ON i.id_producto = p.id_producto
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener inventarios", error });
  }
};

// ======================================
// Obtener un inventario por ID
// ======================================
export const getInventario = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM INVENTARIO WHERE id_inventario = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Inventario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el inventario", error });
  }
};

// ======================================
// Crear registro de inventario
// ======================================
export const createInventario = async (req, res) => {
  try {
    const { id_producto, stock_actual, stock_minimo, usuario_actualizacion } =
      req.body;

    if (!id_producto || stock_actual == null)
      return res.status(400).json({
        message: "id_producto y stock_actual son obligatorios",
      });

    const [result] = await conmysql.query(
      `INSERT INTO INVENTARIO 
      (id_producto, stock_actual, stock_minimo, usuario_actualizacion)
      VALUES (?, ?, ?, ?)`,
      [id_producto, stock_actual, stock_minimo, usuario_actualizacion]
    );

    res.json({
      id: result.insertId,
      id_producto,
      stock_actual,
      stock_minimo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear inventario", error });
  }
};

// ======================================
// Actualizar inventario
// ======================================
export const updateInventario = async (req, res) => {
  try {
    const { stock_actual, stock_minimo, usuario_actualizacion } = req.body;

    const [result] = await conmysql.query(
      `UPDATE INVENTARIO 
       SET stock_actual = ?, stock_minimo = ?, usuario_actualizacion = ?
       WHERE id_inventario = ?`,
      [stock_actual, stock_minimo, usuario_actualizacion, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Inventario no encontrado" });

    res.json({ message: "Inventario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar inventario", error });
  }
};

// ======================================
// Eliminar inventario
// ======================================
export const deleteInventario = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM INVENTARIO WHERE id_inventario = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Inventario no encontrado" });

    res.json({ message: "Inventario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar inventario", error });
  }
};
