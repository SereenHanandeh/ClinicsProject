import { User } from "./user.model";

export interface Patient extends Partial<User>{
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  dateOfBirth: string; 
}
