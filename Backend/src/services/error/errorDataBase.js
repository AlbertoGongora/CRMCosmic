// src/errors/errorDatabase.js

export const databaseInsertError = (message = 'No se pudo insertar el registro en la base de datos') => ({
  statusCode: 400, // 400 Bad Request ya que es un error de solicitud inválida
  code: 'DATABASE_INSERT_ERROR',
  message,
});

export const databaseUpdateError = (message = 'No se pudo actualizar el registro en la base de datos') => ({
  statusCode: 400, // 400 Bad Request ya que es un error de solicitud inválida
  code: 'DATABASE_UPDATE_ERROR',
  message,
});

export const databaseDeleteError = (message = 'No se pudo eliminar el registro en la base de datos') => ({
  statusCode: 400, // 400 Bad Request ya que es un error de solicitud inválida
  code: 'DATABASE_DELETE_ERROR',
  message,
});

export const databaseQueryError = (message = 'No se pudo realizar la consulta en la base de datos') => ({
  statusCode: 400, // 400 Bad Request ya que es un error de solicitud inválida
  code: 'DATABASE_QUERY_ERROR',
  message,
});

export const databaseConnectionError = (message = 'Error al conectar con la base de datos') => ({
  statusCode: 500,
  code: 'DATABASE_CONNECTION_ERROR',
  message,
});
