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
  valorationRx?: ICephalometry;
  valorationDental?: IDental;
  valorationArches?: IArches;
  valorationOdotontogram?: IOdontogram;
  resultDiagnostic?: IDiagnostic;
  toothSizeTreatment?: IToothSize;
  treatmentList?: ITreatment[];
  assets?: IPatientAssets[];
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
