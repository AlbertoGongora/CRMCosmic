import { moduleListDetailService } from '../../services/Modules/moduleListDetailService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getModuleListController = async (req, res, next) => {
  try {
    // Obtengo los modulos de la base de datos
    const services = await moduleListDetailService();

    // Devolvemos los modulos
    res.send({
      status: 'ok',
      message: 'Lista del modulo',
      data: services,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_PRODUCT_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de modulos'
    );
  }
};
