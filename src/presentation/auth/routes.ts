import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from '../services';
import { envs } from '../../config/envs';

export class Authroutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL,
    );
    const autService = new AuthService(emailService);
    
    const controller = new AuthController(autService);
    // Definir las rutas
     router.post('/login', controller.LoginUser );
     router.post('/register', controller.registerUser );
     router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}

