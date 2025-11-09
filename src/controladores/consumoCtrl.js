import { conmysql } from "../db.js";

// Obtener todos los registros de consumo
export const getConsumos = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM consumo");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los consumos", error });
  }
};

// Obtener consumo por ID
export const getConsumo = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM consumo WHERE id_consumo = ?", [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Consumo no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el consumo", error });
  }
};

// Crear consumo
export const createConsumo = async (req, res) => {
  try {
    const { fecha, cantidad, id_estanque, id_alimento } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO consumo (fecha, cantidad, id_estanque, id_alimento) VALUES (?, ?, ?, ?)",
      [fecha, cantidad, id_estanque, id_alimento]
    );
    res.json({ id: result.insertId, fecha, cantidad, id_estanque, id_alimento });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el consumo", error });
  }
};

// Actualizar consumo
export const updateConsumo = async (req, res) => {
  try {
    const { fecha, cantidad, id_estanque, id_alimento } = req.body;
    await conmysql.query(
      "UPDATE consumo SET fecha=?, cantidad=?, id_estanque=?, id_alimento=? WHERE id_consumo=?",
      [fecha, cantidad, id_estanque, id_alimento, req.params.id]
    );
    res.json({ message: "Consumo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el consumo", error });
  }
};

// Eliminar consumo
export const deleteConsumo = async (req, res) => {
  try {
    await conmysql.query("DELETE FROM consumo WHERE id_consumo = ?", [req.params.id]);
    res.json({ message: "Consumo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el consumo", error });
  }
};
