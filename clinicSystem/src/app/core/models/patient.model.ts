import { User } from "./user.model";

export interface Patient extends User {
  phone: any;
  gender: 'male' | 'female';
  dateOfBirth: string;
}
