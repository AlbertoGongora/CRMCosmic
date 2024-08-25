import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import {
  closeShipmentStatusController,
  updateShipmentController,
  deleteShipmentController,
  getShipmentSearchController,
  getPendingDeliveryNotesController,
  shipmentByDelivererController,
  shipmentFeedbackController,
  checkFeedbackController,
  getShipmentListController,
  newShipmentController,
} from '../../controllers/modulesControllers.js';

export const shipmentRouter = express.Router();

// TODO - Todo corregido.

// Crear un envio
shipmentRouter.post('/shipment/create', authenticateUser, checkRoleDelivery, newShipmentController);

// Modificar un envio
shipmentRouter.put('/shipment/update/:shipmentId', authenticateUser, checkRoleDelivery, updateShipmentController);

// Obtener lista de envios
shipmentRouter.get('/shipment/list', authenticateUser, checkRoleDelivery, getShipmentListController);

// Borrado de un envio
shipmentRouter.delete('/shipment/delete/:shipmentId', authenticateUser, adminAuthMiddleware, deleteShipmentController);

// Ruta para buscar envíos por término de búsqueda
shipmentRouter.get('/shipment/search', authenticateUser, checkRoleDelivery, getShipmentSearchController);

//Completar un envio
shipmentRouter.put('/shipment/closed/:shipmentId', authenticateUser, checkRoleDelivery, closeShipmentStatusController);

// Nueva ruta para obtener las notas de entrega pendientes
shipmentRouter.get('/shipment/pending-delivery-notes', authenticateUser, getPendingDeliveryNotesController);

// Ruta para obtener los envios asociados a los repartidores
shipmentRouter.get('/shipment/deliverer', shipmentByDelivererController);

//! Revisar cuando nos pongamos en el frontend para modificar y separar y elimniar las rutas de los repartidores

// Ruta recibir valoración del cliente
shipmentRouter.put('/shipment/feedback/:ref_SH', shipmentFeedbackController);

// Ruta si la valoración ya fue valorada
shipmentRouter.get('/shipment/check-feedback/:ref_SH', checkFeedbackController);
