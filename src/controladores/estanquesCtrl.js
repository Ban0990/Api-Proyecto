import { conmysql } from "../db.js";

// ===============================
// Obtener todos los estanques
// ===============================
export const getEstanques = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM ESTANQUE");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los estanques",
      error: error.message,
    });
  }
};

// ===============================
// Obtener un estanque por ID
// ===============================
export const getEstanque = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM ESTANQUE WHERE id_estanque = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estanque no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el estanque",
      error: error.message,
    });
  }
};

// ===============================
// Crear un nuevo estanque
// ===============================
export const createEstanque = async (req, res) => {
  try {
    const { nombre_estanque, capacidad_kg, id_especie } = req.body;

    // Validación
    if (!nombre_estanque || !capacidad_kg || !id_especie) {
      return res.status(400).json({
        message:
          "Faltan datos: nombre_estanque, capacidad_kg o id_especie",
      });
    }

    const [result] = await conmysql.query(
      "INSERT INTO ESTANQUE (nombre_estanque, capacidad_kg, id_especie) VALUES (?, ?, ?)",
      [nombre_estanque, capacidad_kg, id_especie]
    );

    // Obtener el registro recién creado
    const [nuevo] = await conmysql.query(
      "SELECT * FROM ESTANQUE WHERE id_estanque = ?",
      [result.insertId]
    );

    res.json(nuevo[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el estanque",
      error: error.message,
    });
  }
};

// ===============================
// Actualizar un estanque
// ===============================
export const updateEstanque = async (req, res) => {
  try {
    const { nombre_estanque, capacidad_kg, id_especie } = req.body;

    const [result] = await conmysql.query(
      "UPDATE ESTANQUE SET nombre_estanque=?, capacidad_kg=?, id_especie=? WHERE id_estanque=?",
      [nombre_estanque, capacidad_kg, id_especie, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Estanque no encontrado" });
    }

    // Obtener registro actualizado
    const [actualizado] = await conmysql.query(
      "SELECT * FROM ESTANQUE WHERE id_estanque = ?",
      [req.params.id]
    );

    res.json(actualizado[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el estanque",
      error: error.message,
    });
  }
};

// ===============================
// Eliminar un estanque
// ===============================
export const deleteEstanque = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM ESTANQUE WHERE id_estanque = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Estanque no encontrado" });
    }

    res.json({ message: "Estanque eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el estanque",
      error: error.message,
    });
  }
};
