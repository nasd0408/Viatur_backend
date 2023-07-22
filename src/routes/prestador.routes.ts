import {Router} from 'express';
import {
  createPrestadorDeServicio,
  updatePrestadorDeServicio,
  findOnePrestadorDeServicio,
  findAllPrestadoresDeServicio,
  deletePrestadorDeServicio,
} from '../controllers/prestador.controller';

const router = Router();

// Route to create a new PrestadorDeServicio
router.post('/', createPrestadorDeServicio);

// Route to update an existing PrestadorDeServicio by ID
router.put('/:id', updatePrestadorDeServicio);

// Route to get a single PrestadorDeServicio by ID
router.get('/:id', findOnePrestadorDeServicio);

// Route to get all PrestadoresDeServicio
router.get('/', findAllPrestadoresDeServicio);

// Route to delete an existing PrestadorDeServicio by ID
router.delete('/:id', deletePrestadorDeServicio);

export default router;
