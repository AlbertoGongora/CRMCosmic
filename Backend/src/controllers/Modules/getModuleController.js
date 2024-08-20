import { selectModuleDetailService } from '../../services/Modules/selectModuleDetailService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getModuleController = async (req, res, next) => {
  try {
    // Obtengo el servicio de la base de datos
    const response = await selectModuleDetailService(req.params.moduleId);

    // Devolvemos el servicio
    res.send({
      status: 'ok',
      message: 'Detalle del modulo',
      data: { response },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_MODULE_CONTROLLER_ERROR',
      'Error en el controlador al obtener un detalle de un modulo'
    );
  }
};
