import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { CategoryRoutes } from './categories/routes';
import { ProductRoutes } from './products/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
     router.use('/api/auth', Authroutes.routes );
     router.use('/api/categories', CategoryRoutes.routes );
     router.use('/api/producs', ProductRoutes.routes );
     
     


    return router;
  }


}

