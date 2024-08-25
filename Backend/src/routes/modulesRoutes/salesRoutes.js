import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';
import {
  closeSalesController,
  deleteSalesController,
  getSalesController,
  getSalesSearchController,
  insertSalesController,
  updateSalesController,
} from '../../controllers/modulesControllers.js';

export const salesRouter = express.Router();

// TODO - Todo corregido.

// Crear venta
salesRouter.post('/sales/create', authenticateUser, checkRoleAgent, insertSalesController);

// Busqueda de la venta
salesRouter.get('/sales/search', authenticateUser, checkRoleAgent, getSalesSearchController);

// Modificar venta
salesRouter.put('/sales/update/:id_sale', authenticateUser, checkRoleAgent, updateSalesController);

// Eliminar venta
salesRouter.delete('/sales/delete/:id_sale', authenticateUser, checkRoleAgent, deleteSalesController);

// Cerrar venta
salesRouter.put('/sales/updateStatus', authenticateUser, checkRoleAgent, closeSalesController);

// obtener todas las ventas
salesRouter.get('/sales/list', authenticateUser, checkRoleAgent, getSalesController);