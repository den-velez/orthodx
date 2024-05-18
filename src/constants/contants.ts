import { IPatient } from "@/interfaces/patient.interface";
import { ITreatment } from "@/interfaces/treatment.interface";
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
    rangeMin: 123,
    rangeMax: 123,
    inputName: "longMandibular",
  },
  {
    label: "Altura Facial Inf",
    rangeMin: 123,
    rangeMax: 123,
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

export const PRODUCT_MOCK = [
  { id: 1, title: "3 creditos", price: 200 },
  { id: 2, title: "9 creditos", price: 400 },
];

export const DOCTOR_MOCK_VALUE = {
  avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
  name: "Dr. John Doe",
  credits: 100,
};

export const PATIENT_MOCK_VALUE = {
  avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
  patientName: "Dr. John Doe",
  patientAge: 100,
  doctorOffice: "Ortho & lab",
};
