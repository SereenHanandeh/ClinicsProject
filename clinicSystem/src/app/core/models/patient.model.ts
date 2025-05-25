import { User } from "./user.model";

export interface Patient extends User {
  gender: 'male' | 'female';
  dateOfBirth: string;
}
