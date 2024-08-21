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
  drawRequest?: IDrawRequestPatient;
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
  followupList?: IFollowUp[];
  legacyTreatment?: {
    doctorPlan?: string;
    observations?: string;
    rehabilitationTreatment?: string;
    extractionsNow?: boolean;
    extractionsNowList?: string[];
    extractionsLater?: boolean;
    extractionsLaterList?: string[];
  };
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
  drawRequestId?: string;
  createdAt: string;
  updatedAt: string;
  doctorId: string;
  patientId: string;
  patientAvatar: string;
  patientName: string;
  patientRxImg: string;
  urlResultImage?: string;
  madeBy?: string;
  status: "pending" | "completed" | "canceled";
  isPaid: boolean;
  paidDate?: string;
  paidAmount?: number;
  paidNumber?: string;
}

export interface ICreateDrawRequest {
  doctorId: string;
  patientId: string;
  patientAvatar: string;
  patientName: string;
  patientRxImg: string;
}

export interface IDrawRequestPatient {
  drawRequestId?: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "completed" | "canceled";
  patientRxImg: string;
  urlResultImage?: string;
}

interface IPatientAssets {
  addedAt: string;
  urlImage: string;
  orderIndex: number;
}

export interface IFollowUp {
  createdAt: string;
  updatedAt: string;
  content: string;
  order: number;
}
