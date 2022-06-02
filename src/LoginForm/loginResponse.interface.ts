export interface LoginResponse {
  status: LoginResponseStatus;
  error: string;
  redirect: string;
}

export enum LoginResponseStatus {
  OKAY='OKAY',
  ERROR='ERROR',
}