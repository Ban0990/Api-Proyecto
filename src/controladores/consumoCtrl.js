import { conmysql } from "../db.js";

// ==========================================
// Obtener todos los consumos
// ==========================================
export const getConsumos = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM CONSUMO");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los consumos", error });
  }
};

// ==========================================
// Obtener un consumo por ID
// ==========================================
export const getConsumo = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM CONSUMO WHERE id_consumo = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Consumo no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el consumo", error });
  }
};

// ==========================================
// Crear consumo
// ==========================================
export const createConsumo = async (req, res) => {
  try {
    const {
      id_estanque,
      id_producto,
      id_usuario,
      fecha_consumo,
      cantidad_consumida,
      observacion,
    } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO CONSUMO 
       (id_estanque, id_producto, id_usuario, fecha_consumo, cantidad_consumida, observacion)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_estanque, id_producto, id_usuario, fecha_consumo, cantidad_consumida, observacion]
    );

    res.json({
      id_consumo: result.insertId,
      id_estanque,
      id_producto,
      id_usuario,
      fecha_consumo,
      cantidad_consumida,
      observacion,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el consumo", error });
  }
};

// ==========================================
// Actualizar consumo
// ==========================================
export const updateConsumo = async (req, res) => {
  try {
    const {
      id_estanque,
      id_producto,
      id_usuario,
      fecha_consumo,
      cantidad_consumida,
      observacion,
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE CONSUMO SET 
        id_estanque = ?, 
        id_producto = ?, 
        id_usuario = ?, 
        fecha_consumo = ?, 
        cantidad_consumida = ?, 
        observacion = ?
       WHERE id_consumo = ?`,
      [
        id_estanque,
        id_producto,
        id_usuario,
        fecha_consumo,
        cantidad_consumida,
        observacion,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Consumo no encontrado" });

    res.json({ message: "Consumo actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el consumo", error });
  }
};

// ==========================================
// Eliminar consumo
// ==========================================
export const deleteConsumo = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM CONSUMO WHERE id_consumo = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Consumo no encontrado" });

    res.json({ message: "Consumo eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el consumo", error });
  }
};
