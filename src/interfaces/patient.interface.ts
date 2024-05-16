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
  id: string | number;
  avatar: string;
  name: string;
}

export interface IPatient extends IPatientCard {
  fav?: boolean;
  createdAt?: string;
  updatedAt?: string;
  age?: number;
  doctorOffice?: string;
  doctorId?: string;
  drawRequest?: IDrawRequest;
  valorationRx?: ICephalometry;
  valorationDental?: IDental;
  valorationArches?: IArches;
  valorationOdotontogram?: IOdontogram;
  resultDiagnostic?: IDiagnostic;
  toothSizeTreatment?: IToothSize;
  treatment?: ITreatment;
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
