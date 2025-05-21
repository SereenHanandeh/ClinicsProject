export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Appointment {
  id: number;
  date: string; // ISO format e.g. "2025-05-18T14:00"
  doctorId: number;
  patientId: number;
  status: ApprovalStatus;
  details: {
    drugs: string[];
    diagnosis: string;
    payment: number;
  };
}
