import { conmysql } from "../db.js";

// Obtener registros de auditoría
export const getAuditorias = async (req, res) => {
  try {
    const [rows] = await conmysql.query("SELECT * FROM auditoria ORDER BY fecha DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros de auditoría", error });
  }
};

// Registrar una nueva acción
export const createAuditoria = async (req, res) => {
  try {
    const { accion, usuario, descripcion } = req.body;
    const [result] = await conmysql.query(
      "INSERT INTO auditoria (accion, usuario, descripcion, fecha) VALUES (?, ?, ?, NOW())",
      [accion, usuario, descripcion]
    );
    res.json({ id: result.insertId, accion, usuario, descripcion });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar la auditoría", error });
  }
};

// Eliminar registro de auditoría
export const deleteAuditoria = async (req, res) => {
  try {
    await conmysql.query("DELETE FROM auditoria WHERE id_auditoria = ?", [req.params.id]);
    res.json({ message: "Registro de auditoría eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la auditoría", error });
  }
};
