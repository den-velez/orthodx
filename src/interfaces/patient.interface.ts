import {
  IArches,
  ICephalometry,
  IDental,
  IDiagnostic,
  IOdontogram,
  IToothSize,
  ITreatment,
} from "./index";

export interface IPatientCard {
  id: string;
  avatar: string;
  name: string;
  favorite: boolean;
}

export interface IPatient extends IPatientCard {
  createdAt?: string;
  updatedAt?: string;
  age: number;
  doctorOffice: string;
  doctor: string;
  drawRequest?: IDrawRequest;
  valorationCephalometry?: ICephalometry;
  valorationDental?: IDental;
  valorationArches?: IArches;
  valorationOdotontogram?: IOdontogram;
  resultDiagnostic?: IDiagnostic;
  toothSizeModifed?: IToothSize;
  toothSizeTreatment?: IToothSize;
  treatmentList?: ITreatment[];
  discrepancyDiagnostic?: IDiscrepancyDiagnostic;
  assets?: IPatientAssets[];
  expansionDiagnostic?: IExpansion;
}

export interface IExpansion {
  apinamientoTurns: number;
  korkhauseTurns: number;
  korkhauseTurnsMod: number;
  mordidaCruzadaTurns: number;
}

export interface IDiscrepancyDiagnostic {
  discrepancy: boolean;
  suggestions?: string[];
  sumAboveRounded: number;
  sumBelow: number;
}

interface IDrawRequest {
  createdAt: string;
  status: string;
  urlRxImage: string;
  urlResultImage: string;
}

interface IPatientAssets {
  addedAt: string;
  urlImage: string;
  orderIndex: number;
}
