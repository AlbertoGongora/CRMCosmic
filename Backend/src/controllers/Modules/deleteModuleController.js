import { handleErrorController } from '../../utils/handleError.js';
import { success } from '../../utils/success.js';

export const deleteModuleController = async (req, res, next) => {
  try {
    // Eliminar el cliente de la base de datos.
    const response = await deleteModuleService(req.params.moduleId);

    // Respondemos al cliente.
    res.status(200).send(success(response));
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_MODULE_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un modulo'
    );
  }
};
