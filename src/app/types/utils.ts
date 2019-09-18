import { ErrorResponse } from './error-response';

export const isErrorResponse = (val: any): val is ErrorResponse => {
  if (!val.status) { return false; }
  if (!val.errors) { return false; }
  return true;
};