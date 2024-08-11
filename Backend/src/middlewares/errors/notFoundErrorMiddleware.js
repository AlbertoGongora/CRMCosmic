export const notFoundErrorMiddleware = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 'NOT_FOUND',
    message: 'Recurso no encontrado',
  });
};
