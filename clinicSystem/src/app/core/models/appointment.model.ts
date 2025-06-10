export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Appointment {
id: number;
  date: string; 
  doctorId: number;
  patientId: number;
  status: ApprovalStatus;
  patientName: string;
  details: {
    drugs: string[];
    diagnosis: string;
    payment: number;
  };
}
