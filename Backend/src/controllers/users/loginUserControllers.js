import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/user/loginUserSchema.js';
import { loginUserService } from '../../services/user/loginUserService.js';
import { controllerError } from '../../services/error/errorServer.js';

export const loginUserController = async (req, res, next) => {
    try {
        // Validamos el body
        await validateSchemaUtil(loginUserSchema, req.body);

        const { token, user } = await loginUserService(req.body);

        // Responder al usuario
        res.status(200).send({
            status: 'ok',
            message: 'Sesión iniciada correctamente',
            token: token,
            user: user.name
        });

    } catch (error) {
        // Si el error ya tiene un código y mensaje, lo pasamos tal cual
        if (error.code && error.statusCode) {
            next(error);
        } else {
            // De lo contrario, lo envolvemos en un error del controlador
            next(controllerError(
                error.code || 'LOGIN_USER_CONTROLLER_ERROR',
                error.message || 'Error en el controlador al hacer login',
                error.statusCode || 500
            ));
        }
    }
};
