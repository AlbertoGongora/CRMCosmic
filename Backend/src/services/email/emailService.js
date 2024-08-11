import nodemailer from 'nodemailer';
import {
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
  MAIL_TRAP_AUTH_USER,
  MAIL_TRAP_AUTH_PASS,
} from '../../../env.js';
import { emailSendError } from '../error/errorEmail.js';

const transporter = nodemailer.createTransport({
  host: MAIL_TRAP_HOST,
  port: MAIL_TRAP_PORT,
  auth: {
    user: MAIL_TRAP_AUTH_USER,
    pass: MAIL_TRAP_AUTH_PASS,
  },
});

export async function sendWelcomeEmail(
  name,
  last_name,
  random_password,
  email,
  registration_code
) {
  try {
    const validateURL = `http://localhost:5173/validation/${registration_code}`;
    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: '¡Bienvenido a COSMIC CRM!',
      html: `<p>Bienvenido/a a nuestra plataforma, ${name} ${last_name}.</p>
               <p>Tu datos de usuario son:</p>
               <p><span>Usuario:</span> ${email}</p>
               <p><span>Contraseña provisional:</span> ${random_password}</p>
               <p>Para validar tu cuenta, por favor haz clic en el siguiente enlace:</p>
               <a href="${validateURL}">Validar Cuenta</a>

               <p>Te recomiendo que cambies tu contraseña al iniciar sesión.</p>
               
               <p>Si tiene alguna duda, por favor no dude en contactarnos.</p>
               
               <p>Bienvenido/a a COSMIC CRM.</p>`,
    };
    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    emailSendError('Error al enviar el correo electrónico de bienvenida');
  }
}

export async function sendRecoveryPasswordEmail(email, registration_code) {
  try {
    // Construir la URL de restablecimiento de contraseña con el código de registro como parámetro de consulta
    const resetPasswordURL = `http://localhost:5173/user/reset-password/${registration_code}`;

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Cambio de contraseña',
      html: `<p>Tu cuenta ha sido verificada.</p>
             <p>Procede a cambiar tu contraseña, por favor haz clic en el siguiente enlace:</p>
             <a href="${resetPasswordURL}">Cambio de contraseña</a>`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    emailSendError('Error al enviar el correo electrónico de recuperación de contraseña');
  }
}

export async function sendConfirmationVisitEmail(name, email, visit_date) {
  try {
    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Visita programada',
      html: `<p>Estimado ${name},</p>
             <p>Como hemos confirmado nuestra visita programada el día ${visit_date}.</p>
             <p>Si tiene alguna duda, por favor no dude en contactarnos.</p>`,
    };
    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    emailSendError('Error al enviar el correo electrónico de visita');
  }
}

export const sendEmailForVisitFeedback = async (ref_VT, email) => {
  console.log('sendEmail', ref_VT);
  try {
    // Construir la URL de valoración con el ID de la visita
    const feedbackUrl = `http://localhost:5173/visit/rating-valoration/${ref_VT}`;

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Solicitud de valoración de la visita',
      html: `¡Hola! Nos encantaría saber tu opinión sobre tu reciente visita. Por favor, <a href="${feedbackUrl}">haz clic aquí</a> para dejar tus comentarios. ¡Gracias!`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    emailSendError('Error al enviar el correo electrónico de solicitud de valoración');
  }
};

export const sendEmailForShipmentDelivery = async (ref_SH, email) => {
  try {
    // Construir la URL de seguimiento con el número de seguimiento
    const refShUrl = `http://localhost:5173/shipment/feedback/${ref_SH}`;

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: 'Su envío ha sido entregado',
      html: `¡Hola! Nos complace informarle que su envío ha sido entregado. Puede valorar los detalles de su envío <a href="${refShUrl}">aquí</a>. ¡Gracias por confiar en nosotros!`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    emailSendError('Error al enviar el correo electrónico de entrega');
  }
};








