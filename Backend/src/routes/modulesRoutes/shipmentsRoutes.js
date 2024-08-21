import express from 'express';
import { shipmentExist } from '../../middlewares/shipmentExist.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import {
  closeShipmentStatusController,
  deleteShipmentController,
  shipmentCreateController,
  shipmentUpdateController,
  shipmentRouteController,
  getShipmentSearchController,
  getPendingDeliveryNotesController,
  shipmentByDelivererController,
  shipmentFeedbackController,
  checkFeedbackController,
} from '../../controllers/modulesControllers.js';

export const shipmentRouter = express.Router();

// TODO - Todo corregido.

// Creacion de un envio
shipmentRouter.post('/shipment/create', authenticateUser, shipmentCreateController);

// Modificacion de un envio
shipmentRouter.put('/shipment/update/:shipmentId', authenticateUser, shipmentExist, shipmentUpdateController);

// Borrado de un envio
shipmentRouter.delete('/shipment/delete/:shipmentId', authenticateUser, adminAuthMiddleware, shipmentExist, deleteShipmentController);

//Completar un envio
shipmentRouter.put('/shipment/closed/:shipmentId', authenticateUser, shipmentExist, closeShipmentStatusController);

// Ruta para obtener la hoja de ruta de los repartidores
shipmentRouter.get('/shipment/list', authenticateUser, checkRoleDelivery, shipmentRouteController);

// Ruta para buscar envíos por término de búsqueda
shipmentRouter.get('/shipment/search', authenticateUser, adminAuthMiddleware, getShipmentSearchController);

// Nueva ruta para obtener las notas de entrega pendientes
shipmentRouter.get('/shipment/pending-delivery-notes', authenticateUser, getPendingDeliveryNotesController);

// Ruta para obtener los envios asociados a los repartidores
shipmentRouter.get('/shipment/deliverer', shipmentByDelivererController);

// Ruta recibir valoración del cliente
shipmentRouter.put('/shipment/feedback/:ref_SH', shipmentFeedbackController);

// Ruta si la valoración ya fue valorada
shipmentRouter.get('/shipment/check-feedback/:ref_SH', checkFeedbackController);
