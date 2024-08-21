import { NODE_ENV } from '../../../env.js';

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Siempre registrar el error para propósitos de depuración
  console.error(err.stack || err);

  // Preparar la respuesta de error
  const errorResponse = {
    status: 'error',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Ocurrió un error interno en el servidor',
    statusCode: err.statusCode || 500,
    details: NODE_ENV === 'development' ? err.details || null : null // Detalles solo en desarrollo
  };

  // Enviar la respuesta de error al cliente
  res.status(errorResponse.statusCode).json(errorResponse);
};
