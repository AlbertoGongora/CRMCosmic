import { NODE_ENV } from '../../../env.js';

// Manejo de errores específicos para eliminaciones que incluyen violaciones de clave foránea
const handleForeignKeyConstraintError = (message, customMessage) => {
  // Capturar la tabla después del punto en `crm_cosmic`.`visits`
  const tableMatch = message.match(/`crm_cosmic`\.`(.+?)`/);
  const columnMatch = message.match(/FOREIGN KEY \(`(.+?)`\)/);
  const tableName = tableMatch ? tableMatch[1] : 'desconocido';
  const columnName = columnMatch ? columnMatch[1] : 'desconocido';

  return {
    statusCode: 400,
    code: 'DATABASE_FOREIGN_KEY_CONSTRAINT_ERROR',
    message: customMessage,
    details: NODE_ENV === 'development' 
      ? `El registro está asociado a la columna '${columnName}' en la tabla '${tableName}'. No se puede eliminar hasta que se eliminen o modifiquen las referencias asociadas.` 
      : null
  };
};

// Error específico para eliminaciones en la base de datos
export const databaseDeleteError = (message = 'No se pudo eliminar el registro en la base de datos', customMessage = 'Error en la operación de eliminación') => {
  if (message.includes('foreign key constraint fails')) {
    throw handleForeignKeyConstraintError(message, customMessage);
  }

  throw {
    statusCode: 400,
    code: 'DATABASE_DELETE_ERROR',
    message: customMessage,
  };
};

// Errores generales para inserciones, actualizaciones y consultas
export const databaseInsertError = (message = 'No se pudo insertar el registro en la base de datos') => {
  throw {
    statusCode: 400,
    code: 'DATABASE_INSERT_ERROR',
    message: message
  };
};

export const databaseUpdateError = (message = 'No se pudo actualizar el registro en la base de datos') => {
  throw {
    statusCode: 400,
    code: 'DATABASE_UPDATE_ERROR',
    message: message
  };
};

export const databaseQueryError = (message = 'No se pudo realizar la consulta en la base de datos') => {
  throw {
    statusCode: 400,
    code: 'DATABASE_QUERY_ERROR',
    message: message
  };
};

// Error para conexiones en la base de datos
export const databaseConnectionError = (message = 'Error al conectar con la base de datos') => {
  throw {
    statusCode: 500,
    code: 'DATABASE_CONNECTION_ERROR',
    message
  };
};
