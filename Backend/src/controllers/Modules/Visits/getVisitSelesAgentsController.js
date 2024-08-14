import { getselesAgentsService } from '../../../services/Modules/visits/getselesAgentsService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getVisitSaleAgetsController = async (req, res, next) => {
  try {
    const selesAgents = await getselesAgentsService();

    res.status(200).send({
      status: 'ok',
      data: selesAgents,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_AGENT_VISIT_CONTROLLER_ERROR',
      'Error en el controlador al obtener el comercial de la visita'
    );
  }
};
