import { conmysql } from "../db.js";

// ==========================================
// Obtener registros de auditoría
// ==========================================
export const getAuditorias = async (req, res) => {
  try {
    const [rows] = await conmysql.query(
      "SELECT * FROM AUDITORIA_GENERAL ORDER BY fecha DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros de auditoría", error });
  }
};

// ==========================================
// Registrar una acción en auditoría
// ==========================================
export const createAuditoria = async (req, res) => {
  try {
    const { id_usuario, tabla_afectada, accion, descripcion } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO AUDITORIA_GENERAL 
        (id_usuario, tabla_afectada, accion, descripcion)
        VALUES (?, ?, ?, ?)`,
      [id_usuario, tabla_afectada, accion, descripcion]
    );

    res.json({
      id: result.insertId,
      id_usuario,
      tabla_afectada,
      accion,
      descripcion,
    });

  } catch (error) {
    res.status(500).json({ message: "Error al registrar la auditoría", error });
  }
};

// ==========================================
// Eliminar registro de auditoría
// ==========================================
export const deleteAuditoria = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM AUDITORIA_GENERAL WHERE id_auditoria = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Registro de auditoría no encontrado" });

    res.json({ message: "Registro de auditoría eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la auditoría", error });
  }
};
