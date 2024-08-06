export const emailSendError = (message = 'Error al enviar el correo electrónico') => ({
    statusCode: 500,
    code: 'EMAIL_SEND_ERROR',
    message,
  });
  