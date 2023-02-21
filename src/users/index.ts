import { Router } from 'express';

import { getUser } from './controllers';
import { IBaseModule } from '../shared/interfaces/baseModule';
import { verifyAccessToken } from '../middlewares/verifyAccessToken';

export class UserModule implements IBaseModule {
  router: Router;

  constructor() {
    this.router = Router();
    this.assignRoutes();
  }

  getModule() {
    return this.router;
  }

  assignRoutes() {
    this.router.get('/getUser', verifyAccessToken, getUser);
  }
}
