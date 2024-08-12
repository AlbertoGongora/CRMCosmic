export const internalServerError = (
  message = 'Ocurrió un error interno en el servidor', 
  code = 'INTERNAL_SERVER_ERROR'
) => {
  throw {
    statusCode: 500,
    code,
    message,
  };
};

export const controllerError = (
  code = 'CONTROLLER_ERROR', 
  message = 'Error en el controlador', 
  statusCode = 500
) => {
  throw {
    statusCode,
    code,
    message,
  };
};