import path from 'path';
import sharp from 'sharp';
import { UPLOADS_DIR } from '../../../env.js';
import { createPathIfNotExistsUtil } from '../../utils/createPathUtil.js';
import { updateUserAvatarModel } from '../../models/user/updateUserAvatarModel.js';
import { saveFileError } from '../error/errorService.js';
import { handleErrorService } from '../../utils/handleError.js';

export const updateAvatarUserService = async (userId, img, width) => {
  try {
    // Ruta donde se guardará el archivo.
    const uploadsDir = path.join(
      process.cwd(),
      UPLOADS_DIR,
      'image',
      userId.toString(),
      ''
    );

    // Creamos el directorio si no existe.
    await createPathIfNotExistsUtil(uploadsDir);

    // Crear un objeto Sharp con la imagen recibida.
    const imgSharp = sharp(img.data);

    // Redimensionar la imagen.
    imgSharp.resize(width);

    // Nombrede la imagen como uuid.
    const imgName = `${crypto.randomUUID()}.jpg`;

    // Actualizamos el avatar del usuario.
    await updateUserAvatarModel(userId, imgName);

    //  Ruta de la imagen.
    const imgPath = path.join(uploadsDir, imgName);

    // Guardar la imagen.
    try {
      await imgSharp.toFile(imgPath);
    } catch (error) {
      saveFileError();
    }

    // Devolver el nombre de la imagen.
    return imgName;
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
      error,
      'UPDATE_AVATAR_USER_SERVICE_ERROR',
      'Error en el servicio al cambiar el avatar de un usuario'
    );
  }
};
