import { User } from '../../src/shared/entities';

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
