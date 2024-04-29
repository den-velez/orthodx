export interface ToothSizeModel {
  d11: number;
  d12: number;
  d13: number;
  d21: number;
  d22: number;
  d23: number;
  d31: number;
  d32: number;
  d33: number;
  d41: number;
  d42: number;
  d43: number;
  aboveSum: number;
  belowSum: number;
  discrepancy: string;
}

export interface TreatmentModel {
  createdAt: string;
  updatedAt: string;
  treatment: string;
  priority: number;
  done: boolean;
  finishedAt: string;
}
