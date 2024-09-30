export type TCephalometryItem = {
  label: string;
  inputName: string;
  rangeLabel?: string;
  longR1?: number | string;
  longR4?: number | string;
  alturaR1?: number | string;
  alturaR5?: number | string;
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
  d11?: ITooth;
  d12?: ITooth;
  d13?: ITooth;
  d14?: ITooth;
  d15?: ITooth;
  d16?: ITooth;
  d17?: ITooth;
  d18?: ITooth;
  d21?: ITooth;
  d22?: ITooth;
  d23?: ITooth;
  d24?: ITooth;
  d25?: ITooth;
  d26?: ITooth;
  d27?: ITooth;
  d28?: ITooth;
  d31?: ITooth;
  d32?: ITooth;
  d33?: ITooth;
  d34?: ITooth;
  d35?: ITooth;
  d36?: ITooth;
  d37?: ITooth;
  d38?: ITooth;
  d41?: ITooth;
  d42?: ITooth;
  d43?: ITooth;
  d44?: ITooth;
  d45?: ITooth;
  d46?: ITooth;
  d47?: ITooth;
  d48?: ITooth;
  generalPathology: {
    pathology?: string;
  }[];
  comments?: string;
}

export type ToothState =
  | "ausente"
  | "corona"
  | "obturación"
  | "cariesMesial"
  | "cariesDistal"
  | "cariesVestibular"
  | "cariesLingual"
  | "cariesOclusal"
  | "";

export type ToothPathology =
  | "incluido"
  | "erupción"
  | "no erupcionado"
  | "extruido"
  | "ectópico"
  | "mesiorotado"
  | "mesioangulado"
  | "distalrotado"
  | "telescópico"
  | "cruzado"
  | "movilidad"
  | "";

export type ToothName =
  | "d11"
  | "d12"
  | "d13"
  | "d14"
  | "d15"
  | "d16"
  | "d17"
  | "d18"
  | "d21"
  | "d22"
  | "d23"
  | "d24"
  | "d25"
  | "d26"
  | "d27"
  | "d28"
  | "d31"
  | "d32"
  | "d33"
  | "d34"
  | "d35"
  | "d36"
  | "d37"
  | "d38"
  | "d41"
  | "d42"
  | "d43"
  | "d44"
  | "d45"
  | "d46"
  | "d47"
  | "d48"
  | "";

export interface ITooth {
  name?: ToothName;
  state?: ToothState;
  pathology?: ToothPathology;
}

export type ToothLabel = Exclude<ToothName, "">;
