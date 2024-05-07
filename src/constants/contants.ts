import { IPatient } from "@/interfaces/patient.interface";

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
    name: "Jhon",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 2,
    name: "Maria",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 3,
    name: "Admin",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T22:44:03.000Z",
    updatedAt: "2024-05-06T22:44:03.000Z",
  },
  {
    id: 4,
    name: "sitt",
    age: 25,
    doctorOffice: "Ortho & lab",
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    createdAt: "2024-05-06T23:14:20.000Z",
    updatedAt: "2024-05-06T23:14:20.000Z",
  },
];
