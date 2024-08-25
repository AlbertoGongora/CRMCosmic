import { selectShipmentsByUserIdService } from ('../../../services/Modules/shipment/selectShipmentsByUserIdService.js');


// Controlador para obtener envíos por repartidor
 export const shipmentListByUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const shipments = await selectShipmentsByUserIdService(userId);
    res.status(200).send({
      status: 'ok',
      message:"Lista de envios con exito",
      data: shipments,
    });
  } catch (error) {
    next(error);
  }
};



