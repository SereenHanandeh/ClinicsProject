export type UserType = 'admin' | 'doctor' | 'patient';

export interface User {
  name: any;
  id: number;
  email: string;
  password: string;
  userType: UserType;
}
