import { conmysql } from "../db.js";

// Obtener todos los estanques
export const getEstanques = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM estanque");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estanques", error });
  }
};

// Obtener un estanque por ID
export const getEstanque = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM estanque WHERE id_estanque = ?", [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Estanque no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el estanque", error });
  }
};

// Crear un nuevo estanque
export const createEstanque = async (req, res) => {
  try {
    const { nombre, capacidad, id_especie } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO estanque (nombre, capacidad, id_especie) VALUES (?, ?, ?)",
      [nombre, capacidad, id_especie]
    );
    res.json({ id: result.insertId, nombre, capacidad, id_especie });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el estanque", error });
  }
};

// Actualizar estanque
export const updateEstanque = async (req, res) => {
  try {
    const { nombre, capacidad, id_especie } = req.body;
    await conmysql.query(
      "UPDATE estanque SET nombre=?, capacidad=?, id_especie=? WHERE id_estanque=?",
      [nombre, capacidad, id_especie, req.params.id]
    );
    res.json({ message: "Estanque actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estanque", error });
  }
};

// Eliminar estanque
export const deleteEstanque = async (req, res) => {
  try {
    await conmysql.query("DELETE FROM estanque WHERE id_estanque = ?", [req.params.id]);
    res.json({ message: "Estanque eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el estanque", error });
  }
};
