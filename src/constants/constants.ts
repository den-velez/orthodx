import { TCephalometryItem } from "@/interfaces/valorations.interface";

export const BTN_STORE_TITLE = "store";
export const BTN_STORE_LABEL = "comprar";

export const DRAW_DESCRIPTION = "3 Creditos =  1 Trazado + Diagnostico";
export const DX_DESCRIPTION = "1 Creditos =  1 Diagnostico";

export const CEPHALOMETRY_ITEMS: TCephalometryItem[] = [
  {
    label: "NA",
    rangeLabel: "+/- 2mm",
    inputName: "na",
  },
  {
    label: "Long. Maxilar",
    rangeLabel: "+/- 2mm",
    inputName: "longMaxilar",
  },
  {
    label: "Long. Mandibular",
    inputName: "longMandibular",
  },
  {
    label: "Altura Facial Inf",
    inputName: "alturaFacialInf",
  },
  {
    label: "Plano Mandibular",
    rangeLabel: "26°",
    inputName: "planoMandibular",
  },
  {
    label: "Witts",
    rangeLabel: "+/- 2mm",
    inputName: "witts",
  },
  {
    label: "Eje Facial",
    rangeLabel: "90°",
    inputName: "ejeFacial",
  },
  {
    label: "Loc. de porion",
    rangeLabel: "40 mm",
    inputName: "locPorion",
  },
  {
    label: "MM",
    rangeLabel: "28°",
    inputName: "mm",
  },
  {
    label: "Bimler",
    rangeLabel: "+/- 2mm",
    inputName: "bimler",
  },
  {
    label: "Eje Incisivo Superior",
    rangeLabel: "+/-2°",
    inputName: "ejeIncisivoSuperior",
  },
  {
    label: "Eje Incisivo Inferior",
    rangeLabel: "+/-2°",
    inputName: "ejeIncisivoInferior",
  },
  {
    label: "2° Molar Inferior",
    rangeLabel: "0 mm",
    inputName: "molarInferior",
  },
];

type TDentalItems = {
  label: string;
  name:
    | "relacionMolarDer"
    | "relacionMolarIzq"
    | "relacionCaninaDer"
    | "relacionCaninaIzq"
    | "mordidaPosteriorDer"
    | "mordidaPosteriorIzq"
    | "denticion"
    | "tamanoArcadaSup"
    | "tamanoArcadaInf"
    | "formaArcadaInf"
    | "formaArcadaSup"
    | "apinamientoSup"
    | "apinamientoInf"
    | "mordidaAnterior"
    | "mordidaAnteriorMM";
  options: string[];
};

export const DENTAL_ITEMS: TDentalItems[] = [
  {
    label: "relación molar izquierda",
    name: "relacionMolarIzq",
    options: ["Clase I", "Clase II", "Clase III", "Ausente", "mesiorotación"],
  },
  {
    label: "relación molar derecha",
    name: "relacionMolarDer",
    options: ["Clase I", "Clase II", "Clase III", "Ausente", "mesiorotación"],
  },
  {
    label: "relación canina izquierda",
    name: "relacionCaninaIzq",
    options: [
      "Clase I",
      "Clase II",
      "Clase III",
      "Ausente",
      "extópico",
      "retenido",
    ],
  },
  {
    label: "relación canina derecha",
    name: "relacionCaninaDer",
    options: [
      "Clase I",
      "Clase II",
      "Clase III",
      "Ausente",
      "extópico",
      "retenido",
    ],
  },
  {
    label: "mordida posterior izquierda",
    name: "mordidaPosteriorIzq",
    options: ["normal", "cruzada", "telescópica"],
  },
  {
    label: "mordida posterior derecha",
    name: "mordidaPosteriorDer",
    options: ["normal", "cruzada", "telescópica"],
  },
  {
    label: "mordida anterior",
    name: "mordidaAnterior",
    options: [
      "normal",
      "cruzada",
      "borde a borde",
      "overjet",
      "overbite",
      "abierta",
    ],
  },
];

export const ARCADAS_ITEMS: TDentalItems[] = [
  {
    label: "dentición",
    name: "denticion",
    options: ["infantil", "mixta", "permanente"],
  },
  {
    label: "tamaño arcada superior",
    name: "tamanoArcadaSup",
    options: ["amplia", "normal", "estrecho"],
  },
  {
    label: "tamaño arcada inferior",
    name: "tamanoArcadaInf",
    options: ["amplia", "normal", "estrecho"],
  },
  {
    label: "forma arcada superior",
    name: "formaArcadaSup",
    options: ["redonda", "ovoide", "triangular", "cuadrada", "retroinclinado"],
  },
  {
    label: "forma arcada inferior",
    name: "formaArcadaInf",
    options: ["redonda", "ovoide", "triangular", "cuadrada", "retroinclinado"],
  },
  {
    label: "apiñamiento superior",
    name: "apinamientoSup",
    options: ["no tiene", "ligero", "moderado", "severo", "espacios"],
  },
  {
    label: "apiñamiento inferior",
    name: "apinamientoInf",
    options: ["no tiene", "ligero", "moderado", "severo", "espacios"],
  },
];

export const PRODUCT_MOCK = [
  {
    id: 3,
    title: "Trazado Cefalometrico",
    name: "Trazado Cefalometrico",
    price: 3,
    description: "Trazado Cefalometrico + Diagnostico",
    image: "/images/cephalometry.png",
  },
];
