export const errorHandlerMiddleware = (err, req, res, next) => {
  // Siempre registrar el error para propósitos de depuración
  console.error(err.stack || err);

  // Preparar la respuesta de error
  const errorResponse = {
    status: 'error',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Ocurrió un error interno en el servidor',
    statusCode: err.statusCode || 500,
    details: err.details || null // Agregar detalles adicionales si existen
  };

  // Enviar la respuesta de error al cliente
  res.status(errorResponse.statusCode).json(errorResponse);
};
