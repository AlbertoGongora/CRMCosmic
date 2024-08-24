// Imports Modulos generales
import { getModuleController } from './Modules/getModuleController.js';
import { searchModulesController } from './Modules/searchModulesController.js';
import { deleteModuleController } from './Modules/deleteModuleController.js';
import { getModuleListController } from './Modules/getModuleListController.js';

// Imports visitas
import { closeVisitController } from './Modules/Visits/closeVisitController.js';
import { deleteVisitController } from './Modules/Visits/deleteVisitController.js';
import { feedbackVisitController } from './Modules/Visits/feedbackVisitController.js';
import { getUserVisitsController } from './Modules/Visits/getUserVisitsController.js';
import { newVisitController } from './Modules/Visits/newVisitController.js';
import { updateVisitController } from './Modules/Visits/updateVisitController.js';
import { getVisitSearchController } from './Modules/Visits/getVisitSearchController.js';
import { getVisitSaleAgetsController } from './Modules/Visits/getVisitSelesAgentsController.js'; 

// Imports ventas
import { insertSalesController } from './Modules/sales/insertSalesController.js';
import { updateSalesController } from './Modules/sales/updateSalesController.js';
import { deleteSalesController } from './Modules/sales/deleteSalesController.js';
import { getSalesController } from './Modules/sales/getSalesController.js';
import { getSalesSearchController } from './Modules/sales/getSalesSearchController.js';
import { closeSalesController } from './Modules/sales/closeSalesController.js';

// Imports Facturas
import { newInvoiceController } from './Modules/invoices/newInvoiceController.js';
import { deleteInvoiceController } from './Modules/invoices/deleteInvoiceController.js';
import { statusUpdateInvoiceController } from './Modules/invoices/statusUpdateInvoiceController.js';
import { getInvoiceController } from './Modules/invoices/getInvoiceController.js';
import { getInvoiceSearchController } from './Modules/invoices/getInvoiceSearchController.js';
import { getUnasignedSalesController } from './Modules/invoices/salesInvoiceController.js';

// Imports Pagos
import { newPaymentController } from './Modules/payments/newPaymentController.js';
import { cancelPaymentController } from './Modules/payments/cancelPaymentController.js';
import { deletePaymentController } from './Modules/payments/deletePaymentController.js';
import { getPaymentsController } from './Modules/payments/getPaymentsController.js';
import { getPaymentSearchController } from './Modules/payments/getPaymentSearchController.js';

// Imports Albarán
import { createDeliveryNoteController } from './Modules/deliveryNote/createDeliveryNoteController.js';
import { updateDeliveryNoteController } from './Modules/deliveryNote/updateDeliveryNoteController.js';
import { deleteDeliveryNoteController } from './Modules/deliveryNote/deleteDeliveryNoteController.js';
import { getDeliveryNotesController } from './Modules/deliveryNote/getDeliveryNoteController.js';
import { getDeliveryNoteSearchController } from './Modules/deliveryNote/getDeliveryNoteSearchController.js';
import { getOpenSalesController } from './Modules/deliveryNote/salesDeliveryController.js';
import { getDeliverersController } from './Modules/deliveryNote/getDeliverersController.js';

// Imports envios
import { getShipmentListController } from './Modules/shipment/getShipmentListController.js';
import { shipmentCreateController } from './Modules/shipment/shipmentCreateController.js';
import { shipmentUpdateController } from './Modules/shipment/shipmentUpdateController.js';
import { deleteShipmentController } from './Modules/shipment/deleteShipmentController.js';
import { closeShipmentController } from './Modules/shipment/closeShipmentController.js';
import { shipmentRouteController } from './Modules/shipment/shipmentRouteController.js';
import { closeShipmentStatusController } from './Modules/shipment/closeShipmentStatusController.js'
import { getUnasignedInvoicesController } from './Modules/payments/getUnasignedInvoicesController.js';
import { getShipmentSearchController } from './Modules/shipment/getShipmentSearchController.js';
import { getPendingDeliveryNotesController } from './Modules/shipment/getPendingDeliveryNotesController.js';
import { shipmentByDelivererController } from './Modules/shipment/shipmentByDelivererController.js'
import { shipmentFeedbackController } from './Modules/shipment/shipmentFeedbackController.js'
import { checkFeedbackController } from './Modules/shipment/checkFeedbackController.js'


// Exportar todos los controladores
export {
  getModuleController,
  searchModulesController,
  deleteModuleController,
  getModuleListController,

  closeVisitController,
  deleteVisitController,
  feedbackVisitController,
  getUserVisitsController,
  newVisitController,
  updateVisitController,
  getVisitSearchController,
  getVisitSaleAgetsController,

  insertSalesController,
  updateSalesController,
  deleteSalesController,
  getSalesController,
  getSalesSearchController,
  closeSalesController,

  newInvoiceController,
  deleteInvoiceController,
  getInvoiceController,
  statusUpdateInvoiceController,
  getInvoiceSearchController,
  getUnasignedSalesController,

  newPaymentController,
  cancelPaymentController,
  deletePaymentController,
  getPaymentsController,
  getPaymentSearchController,

  createDeliveryNoteController,
  updateDeliveryNoteController,
  deleteDeliveryNoteController,
  getDeliveryNotesController,
  getDeliveryNoteSearchController,
  getOpenSalesController,
  getDeliverersController,
  
  getShipmentListController,
  shipmentCreateController,
  shipmentUpdateController,
  shipmentRouteController,
  deleteShipmentController,
  closeShipmentController,
  closeShipmentStatusController,
  getUnasignedInvoicesController,
  getShipmentSearchController,
  getPendingDeliveryNotesController,
  shipmentByDelivererController,
  shipmentFeedbackController,
  checkFeedbackController
};
