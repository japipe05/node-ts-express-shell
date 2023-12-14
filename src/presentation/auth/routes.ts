import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';




export class Authroutes {


  static get routes(): Router {

    const router = Router();
    const autService = new AuthService();
    
    const controller = new AuthController(autService);
    // Definir las rutas
     router.post('/login', controller.LoginUser );
     router.post('/register', controller.registerUser );
     router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}

