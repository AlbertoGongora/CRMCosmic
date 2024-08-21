import joi from 'joi';
import { joiErrorMessages } from '../../error/joiErrorMessage.js';

export const updateDeliveryNoteSchema = joi.object({
  delivery_status: joi.string().valid(
    'pending',
    'readyToShipment', 
    'incidence', 
    'cancelled', 
    'delivering', 
    'delivered'
  ).required().messages(joiErrorMessages),
});
