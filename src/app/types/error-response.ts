export interface ErrorResponse {
  status: number;
  errors: Error;
}

export interface Error {
  [key: string]: string[];
}
