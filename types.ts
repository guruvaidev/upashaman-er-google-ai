
export interface TriageInput {
  chiefComplaint: string;
  patientAge: number;
  assignedGender: 'Female' | 'Male' | 'Other';
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
}

export interface TriageResponse {
  triage_input: TriageInput;
  score: number;
  summary: string;
  echartsOption: any;
  expert_guidance: string;
}

export interface PatientSearchInput {
  patientId: string;
}

export interface PatientSearchResponse {
  patient_id: string;
  summary: string; // HTML content
}

export interface EquityProfile {
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  race: string;
  zip_code: string;
}

export interface EquityInput {
  profileA: EquityProfile;
  profileB: EquityProfile;
}

export interface EquityResponse {
  equity_input: EquityInput;
  summary: string;
  echartsOption: any;
}

export type ApiError = {
    message: string;
};
