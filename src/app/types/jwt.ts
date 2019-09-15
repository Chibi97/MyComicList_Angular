export interface JWT {
  message: string;
  role: Role;
}

export enum Role {
  Admin = 'Admin',
  User = 'User'
}
