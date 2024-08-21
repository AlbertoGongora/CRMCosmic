import { newVisitSchema } from '../../../schemas/Modules/visits/visitSchema.js';
import { sendConfirmationVisitEmail } from '../../../services/email/emailService.js';
import { insertNewVisitService } from '../../../services/Modules/visits/insertNewVisitService.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const newVisitController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newVisitSchema, req.body);

    const { customer, Address, visit_date } = await insertNewVisitService(
      req.user.id_user,
      req.body
    );

    //Extraer los datos del cliente
    const { name, email } = customer;

    // Enviar correo electrónico de bienvenida
    await sendConfirmationVisitEmail(name, email, visit_date);

    // Devolvemos el usuario actualizado.
    res.send({
      status: 'ok',
      message: 'Visita creada exitosamente',
      data: { customer, Address },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'NEW_VISIT_CONTROLLER_ERROR',
      'Error en el controlador al crear una visita'
    );
  }
};
