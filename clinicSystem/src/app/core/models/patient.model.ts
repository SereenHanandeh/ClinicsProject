export interface Patient {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  phone?: string;
  userType: 'patient';
  password: string;
}
