import { Router } from 'express';
import { getAuditorias, createAuditoria, deleteAuditoria } from '../controladores/auditoriaCtrl.js';

const router = Router();

router.get('/', getAuditorias);
router.get('/:id', getAuditorias);
router.post('/', createAuditoria);
router.delete('/:id', deleteAuditoria);

export default router;
  
