import { closeVisitService } from '../../../services/Modules/visits/closeVisitService.js';
import { selectRefVisitService } from '../../../services/Modules/visits/selectRefVisitService.js';
import { sendEmailForVisitFeedback } from '../../../services/email/emailService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const closeVisitController = async (req, res, next) => {
  try {
    // Obtenemos el id_user y el rol del token
    const { id_user, role } = req.user;
    const { id: visitId, newStatus } = req.body;

    // Cerramos la visita y obtenemos el email del cliente si es necesario
    const email = await closeVisitService(visitId, id_user, role, newStatus);

    // Obtengo la referencia de la visita
    const referecia = await selectRefVisitService(visitId);

    // Enviar email al cliente si la visita se completa
    if (newStatus === 'completed' && email) {
      await sendEmailForVisitFeedback(referecia.ref_VT, email);
    }

    res.status(200).send({
      status: 'ok',
      message: `Visita ${newStatus === 'completed' ? 'completada y email enviado' : 'cancelada'} con éxito`,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'UPDATE_STATUS_VISIT_CONTROLLER_ERROR',
      'Error en el controlador al cambiar el estado de una visita'
    );
  }
};
