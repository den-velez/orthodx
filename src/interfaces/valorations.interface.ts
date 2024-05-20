export type TCephalometryItem = {
  label: string;
  inputName: string;
  rangeLabel?: string;
  rangeMin?: number;
  rangeMax?: number;
  register?: any;
  errors?: any;
};

export interface ICephalometry {
  createdAt: string;
  updatedAt: string;
  na: string;
  longMaxilar: string;
  longMandibular: string;
  alturaFacialInf: string;
  planoMandibular: string;
  witts: string;
  ejeFacial: string;
  locPorion: string;
  mm: string;
  bimler: string;
  ejeIncisivoSuperior: string;
  ejeIncisivoInferior: string;
  molarInferior: string;
  comments?: string;
}

export interface IDental {
  createdAt: string;
  updatedAt: string;
  relacionMolarDer: string;
  relacionMolarIzq: string;
  relacionCaninaDer: string;
  relacionCaninaIzq: string;
  mordidaPosteriorDer: string;
  mordidaPosteriorIzq: string;
  denticion: string;
  tamanoArcadaSup: string;
  tamanoArcadaInf: string;
  formaArcadaInf: string;
  formaArcadaSup: string;
  apinamientoSup: string;
  apinamientoInf: string;
  mordidaAnterior: string;
  mordidaAnteriorMM: string;
  comments?: string;
}

export interface IArches {
  createdAt: string;
  updatedAt: string;
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
  d4a4: number;
  loAnt: number;
  dist3a3Inf: number;
  dist6a6Inf: number;
  dist6a6Inf2: number;
  dist6a6Sup: number;
}

export interface IOdontogram {
  createdAt: string;
  updatedAt: string;
  teeth: ITooth[];
  generalPathology: string[];
  observations: string;
}

export interface ITooth {
  tooth: string;
  toothState: string;
  toothPathology: string;
}
