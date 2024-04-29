import {
  ArchesModel,
  CephalometryModel,
  DentalModel,
  DiagnosticModel,
  OdontogramModel,
  ToothSizeModel,
  TreatmentModel,
} from "./index";

export interface PatientModel {
  createdAt: string;
  updatedAt: string;
  avatar: string;
  name: string;
  age: number;
  doctorOffice: string;
  doctorId: string;
  drawRequest: DrawRequestModel;
  valorationRx: CephalometryModel;
  valorationDental: DentalModel;
  valorationArches: ArchesModel;
  valorationOdotontogram: OdontogramModel;
  resultDiagnostic: DiagnosticModel;
  toothSizeTreatment: ToothSizeModel;
  treatment: TreatmentModel;
  assets: PatientAssetsModel[];
}

interface DrawRequestModel {
  createdAt: string;
  status: string;
  urlRxImage: string;
  urlResultImage: string;
}

interface PatientAssetsModel {
  addedAt: string;
  urlImage: string;
  orderIndex: number;
}
