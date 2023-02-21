import { Router } from 'express';

import { IBaseModule } from '../shared/interfaces/baseModule';
import { login } from './controllers';

export class AuthModule implements IBaseModule {
  router: Router;

  constructor() {
    this.router = Router();
    this.assignRoutes();
  }

  getModule() {
    return this.router;
  }

  assignRoutes() {
    this.router.post('/getAccessToken', login);
  }
}
