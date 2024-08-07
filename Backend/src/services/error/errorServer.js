export const internalServerError = (message = 'Ocurrió un error interno en el servidor') => ({
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message,
  });
  
  export const controllerError = (code = 'CONTROLLER_ERROR', message = 'Error en el controlador', statusCode = 500) => ({
    statusCode,
    code,
    message,
  });
  