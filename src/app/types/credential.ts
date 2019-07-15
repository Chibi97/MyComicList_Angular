export interface Credential {
  username: string;
  password: string;
}

export interface RegisterCredential extends Credential {
  firstName: string;
  lastName: string;
  email: string;
}
