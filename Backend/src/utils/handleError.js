import { controllerError, internalServerError } from '../services/error/errorServer.js';

// Función para manejar errores en los controladores
export const handleErrorController = (error, next, defaultCode, defaultMessage, defaultStatusCode = 500) => {
    if (error.code && error.statusCode) {
        next(error);
    } else {
        next(controllerError(
            defaultCode, 
            defaultMessage, 
            defaultStatusCode
          ));
    }
};

export const handleErrorService = (error, defaultCode, defaultMessage) => {
    if (error.statusCode) {
        throw error; // Mantén el error tal cual si ya tiene un statusCode
    } else {
        internalServerError({
          code: defaultCode, 
          message: defaultMessage
        });
    }
};
