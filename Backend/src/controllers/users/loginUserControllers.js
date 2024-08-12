import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/user/loginUserSchema.js';
import { loginUserService } from '../../services/user/loginUserService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const loginUserController = async (req, res, next) => {
    try {
        // Validamos el body
        await validateSchemaUtil(loginUserSchema, req.body);

        // Pasamos al servicio la informacion recibida y obtenemos de vuelta el nuevo token y los datos del usuario.
        const { token, user } = await loginUserService(req.body);

        // Responder al usuario
        res.status(200).send({
            status: 'ok',
            message: 'Sesión iniciada correctamente',
            token: token,
            user: user.name
        });

    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
        error,
        next,
        'LOGIN_USER_CONTROLLER_ERROR',
        'Error en el controlador al hacer login'
      );
    }
};
