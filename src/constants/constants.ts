import { TCephalometryItem } from "@/interfaces/valorations.interface";

export const BTN_STORE_TITLE = "store";
export const BTN_STORE_LABEL = "comprar";

export const DRAW_DESCRIPTION = "2 Creditos = Trazado Cefalometrico";
export const DX_DESCRIPTION = "1 Credito =  1 Nuevo Paciente";

export const CEPHALOMETRY_ITEMS: TCephalometryItem[] = [
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
    label: "Altura Facial Inferior (ENA-Me)",
    inputName: "alturaFacialInf",
  },
  {
    label: "Posición Maxilar(Na-A)",
    rangeLabel: "+/- 2mm",
    inputName: "na",
  },
  {
    label: "Plano Mandibular (FH / MP)",
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

export const PAGE_TITLES = {
  cephalometry: "Cefalometría",
  dentalSize: "Tamaño Dentario",
  diagnostic: "Diagnóstico",
  gallery: "Galería",
  arches: "Analísis Dental",
  dental: "Valoración Oclusal",
};

export const STORES_CATEGORIES = [
  {
    name: "Suscripción Basica",
    description: "Acceso a la plataforma con 3 creditos mensuales",
    buttonLabel: "comprar",
    category: "basic",
  },
  {
    name: "Suscripción Plus",
    description: "Acceso a la plataforma con 10 creditos mensuales",
    buttonLabel: "comprar",
    category: "plus",
  },
  {
    name: "Creditos Extras",
    description: "Creditos para realizar trazados cefalometricos",
    buttonLabel: "comprar",
    category: "credits",
  },
];

export const LOGO_ORTHODX_WHITE =
  "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Flogo-white.png?alt=media&token=8b917924-3f6f-434e-b178-a3b8e4b3457f";

export const NO_RESULTS_IMG =
  "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2FnoResults.png?alt=media&token=29959708-e18a-4c4f-b708-d133e2504a0c";

export const FAQ_TEXTS = [
  {
    question: "¿Puedo acceder con mi usuario a la nueva versión?",
    answer: "Sí, las credenciales se mantienen en la nueva versión.",
  },
  {
    question: "¿Cuáles son las novedades de la nueva versión?",
    answer:
      "Nuevo diseño, Posibilidad de realizar pagos en línea,  Almacenamiento de fotos de cada paciente,  Registro de avances,  Optimizado para dispositivos móviles,  Mejor experiencia de usuario.",
  },
  {
    question: "¿Cómo puedo acceder?",
    answer:
      "Cambia de compra de créditos a una suscripción mensual, en caso de que no haya expirado la suscripción actual.",
  },
  {
    question: "¿Hay días de prueba?",
    answer:
      "Sí, por ahora ofrecemos un mes de prueba con pago recurrente con tarjeta de crédito. En los próximos días se habilitará un código promocional para pago único (Oxxo o tarjeta de crédito).",
  },
  {
    question: "¿Podré acceder a mis pacientes de la versión anterior?",
    answer:
      "Sí, los pacientes se migrarán a la nueva versión solicitándolo al correo contact@denvelez.com",
  },
  {
    question:
      "Si aún tengo créditos en la versión anterior, ¿puedo usarlos en la nueva versión?",
    answer:
      "Sí, los créditos se mantienen en la nueva versión, pero requerirán una suscripción. Debe solicitar la migración al correo contact@denvelez.com",
  },
  {
    question: "¿Puedo seguir accediendo a la versión anterior?",
    answer: "Sí, la versión anterior estará vigente por algunos meses.",
  },
];
