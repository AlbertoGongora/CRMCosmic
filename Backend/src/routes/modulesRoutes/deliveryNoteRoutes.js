import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { 
    createDeliveryNoteController, 
    updateDeliveryNoteController, 
    deleteDeliveryNoteController, 
    getDeliveryNotesController, 
    getDeliveryNoteSearchController,
    getOpenSalesController,
    getDeliverersController
} from '../../controllers/modulesControllers.js';

// Crea una instancia del enrutador de Express
export const deliveryNoteRouter = express.Router();

// TODO: Todo corregido

// Ruta para obtener la lista de delivery Notes
deliveryNoteRouter.get('/deliveryNotes/list', authenticateUser, checkRoleDelivery, getDeliveryNotesController);

// Ruta para crear un delivery Notes
deliveryNoteRouter.post('/delivery-notes', authenticateUser, checkRoleDelivery, createDeliveryNoteController);

// Ruta para cerrar el reparto y autenticar los roles
deliveryNoteRouter.put('/deliveryNotes/close/:deliveryNote_id', authenticateUser, checkRoleDelivery, updateDeliveryNoteController);

// Ruta para eliminar un albarán
deliveryNoteRouter.delete('/deliveryNotes/delete/:deliveryNote_id', authenticateUser, adminAuthMiddleware, deleteDeliveryNoteController);

// Ruta para buscar notas de entrega por término de búsqueda
deliveryNoteRouter.get('/deliveryNotes/search', authenticateUser, adminAuthMiddleware, getDeliveryNoteSearchController);

// Ruta de extracción de estados de la tabla Sales
deliveryNoteRouter.get('/deliveryNotes/open-sales', authenticateUser, getOpenSalesController);

// Ruta para obtener los usuarios con el rol 'deliverer'
deliveryNoteRouter.get('/deliveryNotes/deliverers', authenticateUser, getDeliverersController);