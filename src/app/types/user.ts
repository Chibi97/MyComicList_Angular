import { Role } from './jwt';

export interface User {
  token: string;
  username: string;
  role: Role;
}
