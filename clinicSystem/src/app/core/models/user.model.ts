export type UserType = 'admin' | 'doctor' | 'patient';

export interface User {
  id: number;
  email: string;
  password: string;
  userType: UserType;
}
