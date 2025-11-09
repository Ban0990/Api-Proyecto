import { Router } from 'express';
import { getConsumos, getConsumo, createConsumo, updateConsumo, deleteConsumo } from '../controladores/consumoCtrl.js';

const router = Router();

router.get('/', getConsumos);
router.get('/:id', getConsumo);
router.post('/', createConsumo);
router.put('/:id', updateConsumo);
router.delete('/:id', deleteConsumo);

export default router;
