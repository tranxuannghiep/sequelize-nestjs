import { User } from 'src/modules/users/user.modal';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: User;
  }
}
