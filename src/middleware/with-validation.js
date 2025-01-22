// middleware/with-validation.js
import { validateEventData } from '../utils/validate-event';

export function withEventValidation(handler) {
  return async (req, res) => {
    if (['POST', 'PUT'].includes(req.method)) {
      const { isValid, errors } = validateEventData(req.body);
      
      if (!isValid) {
        return res.status(400).json({ 
          error: 'Invalid event data', 
          details: errors 
        });
      }
    }
    
    return handler(req, res);
  };
}