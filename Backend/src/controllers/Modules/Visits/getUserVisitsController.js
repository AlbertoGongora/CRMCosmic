import { selectUserVisitsByIdService } from '../../../services/Modules/visits/selectUserVisitsByIdService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getUserVisitsController = async (req, res, next) => {
  try {
    const visitList = await selectUserVisitsByIdService();

    res.status(200).send({
      status: 'ok',
      data: visitList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_VISIT_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de clientes'
    );
  }
};
