import {
  IArches,
  ICephalometry,
  ICephalometryResult,
  IDental,
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
  cephalometry?: ICephalometryResult;
  valorationCephalometry?: ICephalometry;
  valorationDental?: IDental;
  valorationArches?: IArches;
  valorationOdotontogram?: IOdontogram;
  toothSizeModifed?: IToothSize;
  toothSizeTreatment?: IToothSize;
  treatmentList?: ITreatment[];
  discrepancyDiagnostic?: IDiscrepancyDiagnostic;
  assets?: IPatientAssets[];
  expansionDiagnostic?: IExpansion;
  expansionTreatment?: TExpansionTreatment;
}

export interface IPatientRequired extends Required<IPatient> {}

export interface IExpansion {
  apinamientoTurns: number;
  korkhauseTurns: number;
  korkhauseTurnsMod: number;
  mordidaCruzadaTurns: number;
}

export type TExpansionTreatment =
  | ""
  | "apinamiento"
  | "korkhause"
  | "korkhause mod"
  | "mordida cruzada";

export interface IDiscrepancyDiagnostic {
  discrepancy: boolean;
  suggestions?: string[];
  sumAboveRounded: number;
  sumBelow: number;
}

export interface IDrawRequest {
  createdAt: string;
  status: "pending" | "done";
  urlRxImage: string;
  urlResultImage: string;
}

interface IPatientAssets {
  addedAt: string;
  urlImage: string;
  orderIndex: number;
}
