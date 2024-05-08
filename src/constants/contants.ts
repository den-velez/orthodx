import { IPatient } from "@/interfaces/patient.interface";
import { ITreatment } from "@/interfaces/treatment.interface";

export const BTN_STORE_TITLE = "store";
export const BTN_STORE_LABEL = "comprar";

export const DRAW_DESCRIPTION = "3 Creditos =  1 Trazado + Diagnostico";
export const DX_DESCRIPTION = "1 Creditos =  1 Diagnostico";

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

export const PATIENTLIST_MOCK: IPatient[] = [
  {
    id: 1,
    fav: true,
    name: "Carlos Medina",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 2,
    fav: true,
    name: "Veron y Cacastro",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 3,
    fav: true,
    name: "Erika Galindo",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 4,
    fav: true,
    name: "Claudia Martinez",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T23:14:20.000Z",
    updatedAt: "2024-05-06T23:14:20.000Z",
  },
  {
    id: 5,
    fav: false,
    name: "Claudio Valentino",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 6,
    fav: false,
    name: "Je Zuz De Nazaret",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 7,
    fav: false,
    name: "Edgar Pilin",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 8,
    fav: false,
    name: "Chavo del Eight",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T23:14:20.000Z",
    updatedAt: "2024-05-06T23:14:20.000Z",
  },
];

export const TREATMENT_MOCK: ITreatment[] = [
  {
    treatment: "Trazado",
    done: false,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Diagnostico",
    done: false,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Tamaño Dental",
    done: false,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Diagnostico",
    done: false,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Trazado",
    done: false,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Diagnostico",
    done: false,
    finishedAt: "12 Dic 2024",
  },
];

export const TREATMENT_DONE_MOCK: ITreatment[] = [
  {
    treatment: "Trazado",
    done: true,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Diagnostico",
    done: true,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Tamaño Dental",
    done: true,
    finishedAt: "12 Dic 2024",
  },
  {
    treatment: "Diagnostico",
    done: true,
    finishedAt: "12 Dic 2024",
  },
];
