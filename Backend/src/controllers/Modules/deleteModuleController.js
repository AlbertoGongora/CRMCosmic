import { handleErrorController } from '../../utils/handleError.js';

export const deleteModuleController = async (req, res, next) => {
  try {
    // Eliminar el cliente de la base de datos.
    const response = await deleteModuleService(req.params.moduleId);

    // Respondemos al cliente.
    res.status(200).send({
      status: 'ok',
      message: 'Modulo eliminado con exito',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_MODULE_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un modulo'
    );
  }
};
