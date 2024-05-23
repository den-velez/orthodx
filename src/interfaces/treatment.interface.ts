export interface IToothSize {
  createdAt?: string;
  updatedAt?: string;
  d11: string;
  d12: string;
  d13: string;
  d21: string;
  d22: string;
  d23: string;
  d31: string;
  d32: string;
  d33: string;
  d41: string;
  d42: string;
  d43: string;
  aboveSum: number;
  belowSum: number;
  discrepancy: boolean;
}

export interface ITreatment {
  createdAt?: string;
  updatedAt?: string;
  treatment: string;
  priority?: number;
  done?: boolean;
  finishedAt?: string;
}
