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
  d4a4: string;
  loAnt: string;
  dist3a3Inf: string;
  dist6a6Inf: string;
  dist6a6Inf2?: string;
  dist6a6Sup: string;
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
