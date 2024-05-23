"use server";

import * as constants from "@/constants/diagnostic.constants";

export interface UpdateCephalometryDto {
  na: number;
  longitudMaxilar: number;
  longitudMandibular: number;
  alturaFacialInf: number;
  planoMandibular: number;
  witts: number;
  ejeFacial: number;
  locDePorion: number;
  mm: number;
  bimler: number;
  ejeIncisivoSuperior: number;
  ejeIncisivoInferior: number;
  segundoMolarInferior: number;
  comments?: string;
}

interface BaseValue {
  [key: string]: number | string | undefined;
}

type RelacionEsqueletica =
  | "Clase I esquelética"
  | "Clase II esquelética"
  | "Clase III esquelética";

function findValue(arrayBase: BaseValue[], valueToFind: number | string) {
  const value = arrayBase.find((object) => object[valueToFind]);
  if (!value) return null;

  return value[valueToFind] as string | number;
}

function findValueWithRange(
  arrayBase: BaseValue[],
  valueToFind: number,
  valueMin: number,
  valueMax: number
) {
  const keyValidation = () => {
    if (valueToFind < valueMin) {
      return valueMin;
    } else if (valueToFind > valueMax) {
      return valueMax;
    } else {
      return valueToFind;
    }
  };

  const keyInRange = keyValidation().toString();

  return findValue(arrayBase, keyInRange);
}

function getRelacionEsqueletica(
  longMandValue: number,
  longMandR1: number | string,
  longMandR2: number | string,
  longMandR3: number | string,
  longMandR4: number | string
) {
  const longMandR1Number = Number(longMandR1);
  const longMandR2Number = Number(longMandR2);
  const longMandR3Number = Number(longMandR3);
  const longMandR4Number = Number(longMandR4);

  if (longMandValue == longMandR1Number) {
    return "Clase I esquelética";
  } else if (longMandValue == longMandR2Number) {
    return "Clase I esquelética";
  } else if (longMandValue == longMandR3Number) {
    return "Clase I esquelética";
  } else if (longMandValue == longMandR4Number) {
    return "Clase I esquelética";
  } else if (longMandValue < longMandR1Number) {
    return "Clase II esquelética";
  } else if (longMandValue > longMandR4Number) {
    return "Clase III esquelética";
  }
}

function getRelacionEsqueleticaMm(
  longMandValue: number,
  longMandR1: number | string | undefined,
  longMandR4: number | string | undefined
) {
  const longMandR1Number = Number(longMandR1);
  const longMandR4Number = Number(longMandR4);

  if (longMandValue < longMandR1Number) {
    return longMandR1Number - longMandValue;
  } else if (longMandValue > longMandR4Number) {
    return longMandValue - longMandR4Number;
  }
}

function getAlturaInferior(
  alturaFacialInfValue: number,
  alturaFInfR1: number | string,
  alturaFInfR2: number | string,
  alturaFInfR3: number | string,
  alturaFInfR4: number | string,
  alturaFInfR5: number | string
) {
  const alturaFIntR1Number = Number(alturaFInfR1);
  const alturaFIntR2Number = Number(alturaFInfR2);
  const alturaFIntR3Number = Number(alturaFInfR3);
  const alturaFIntR4Number = Number(alturaFInfR4);
  const alturaFIntR5Number = Number(alturaFInfR5);

  if (alturaFacialInfValue == alturaFIntR1Number) {
    return "Altura Facial Inferior Normal";
  } else if (alturaFacialInfValue == alturaFIntR2Number) {
    return "Altura Facial Inferior Normal";
  } else if (alturaFacialInfValue == alturaFIntR3Number) {
    return "Altura Facial Inferior Normal";
  } else if (alturaFacialInfValue == alturaFIntR4Number) {
    return "Altura Facial Inferior Normal";
  } else if (alturaFacialInfValue == alturaFIntR5Number) {
    return "Altura Facial Inferior Normal";
  } else if (alturaFacialInfValue < alturaFIntR1Number) {
    return "Altura Facial Inferior Disminuida";
  } else if (alturaFacialInfValue > alturaFIntR4Number) {
    return "Altura Facial Inferior Aumentado";
  }
}

function getAlturaInferiorMm(
  alturaFacialInfValue: number,
  alturaFInfR1: number | string,
  alturaFInfR5: number | string
) {
  const alturaFInfR1Number = Number(alturaFInfR1);
  const alturaFInfR5Number = Number(alturaFInfR5);

  if (
    !alturaFInfR1Number ||
    (alturaFacialInfValue < alturaFInfR1Number &&
      alturaFacialInfValue > alturaFInfR5Number)
  ) {
    return undefined;
  }
  if (alturaFacialInfValue < alturaFInfR1Number) {
    return alturaFInfR1Number - alturaFacialInfValue;
  } else if (alturaFacialInfValue > alturaFInfR5Number) {
    return alturaFacialInfValue - alturaFInfR5Number;
  }
}

function getDxIIoIII(
  relacionEsqueletica: RelacionEsqueletica,
  naValue: number,
  locPorionValue: number
) {
  if (relacionEsqueletica == "Clase I esquelética") {
    if (naValue < -2) {
      return "Bi-retrusivo";
    } else if (naValue > 2) {
      return "Bi-protusivo";
    }
  } else if (relacionEsqueletica == "Clase II esquelética") {
    if (naValue < -2) {
      return "Deficiencia mandibular y retrusivo maxilar";
    } else if (naValue > 2) {
      return "Protusión Maxilar";
    } else {
      return "Deficiencia mandibular";
    }
  } else if (relacionEsqueletica == "Clase III esquelética") {
    if (locPorionValue <= 36) {
      return "real";
    } else if (naValue >= 40) {
      return "Deficiencia Maxilar";
    } else {
      return "Mixto";
    }
  } else {
    return null;
  }
}

function calculateCephalometryValues(
  cephalometryValues: UpdateCephalometryDto
) {
  const {
    longitudMaxilar,
    longitudMandibular,
    planoMandibular,
    witts,
    ejeFacial,
    mm,
    ejeIncisivoSuperior,
    ejeIncisivoInferior,
    segundoMolarInferior,
  } = cephalometryValues;

  const cephalometryResults = {
    segundoMolarInferior: findValueWithRange(
      constants.SEG_MOLAR_INF,
      segundoMolarInferior,
      constants.SEG_MOLAR_INF_MIN,
      constants.SEG_MOLAR_INF_MAX
    ),
    alturaFacialInfR1: findValue(
      constants.ALTURA_FACIAL_INF_R1,
      longitudMaxilar
    ),
    alturaFacialInfR2: findValue(
      constants.ALTURA_FACIAL_INF_R2,
      longitudMaxilar
    ),
    alturaFacialInfR3: findValue(
      constants.ALTURA_FACIAL_INF_R3,
      longitudMaxilar
    ),
    alturaFacialInfR4: findValue(
      constants.ALTURA_FACIAL_INF_R4,
      longitudMaxilar
    ),
    alturaFacialInfR5: findValue(
      constants.ALTURA_FACIAL_INF_R5,
      longitudMaxilar
    ),
    biotipo: findValueWithRange(
      constants.BIOTIPO,
      planoMandibular,
      constants.BIOTIPO_MIN,
      constants.BIOTIPO_MAX
    ),
    cajaDental: findValueWithRange(
      constants.CAJA_DENTAL,
      mm,
      constants.CAJA_DENTAL_MIN,
      constants.CAJA_DENTAL_MAX
    ),
    longMandR1: findValue(constants.LONG_MAND_R1, longitudMaxilar),
    longMandR2: findValue(constants.LONG_MAND_R2, longitudMaxilar),
    longMandR3: findValue(constants.LONG_MAND_R3, longitudMaxilar),
    longMandR4: findValue(constants.LONG_MAND_R4, longitudMaxilar),
    ejeIncisivoInferior: findValueWithRange(
      constants.EJE_INCISIVO_INF,
      ejeIncisivoInferior,
      constants.EJE_INCISIVO_INF_MIN,
      constants.EJE_INCISIVO_INF_MAX
    ),
    ejeIncisivoSuperior: findValueWithRange(
      constants.EJE_INCISIVO_SUP,
      ejeIncisivoSuperior,
      constants.EJE_INCISIVO_SUP_MIN,
      constants.EJE_INCISIVO_SUP_MAX
    ),

    planoDeOclusion: findValueWithRange(
      constants.PLANO_DE_OCLUSION,
      witts,
      constants.PLANO_DE_OCLUSION_MIN,
      constants.PLANO_DE_OCLUSION_MAX
    ),
    tendenciaVertical: findValueWithRange(
      constants.TENDENCIA_VERTICAL,
      ejeFacial,
      constants.TENDENCIA_VERTICAL_MIN,
      constants.TENDENCIA_VERTICAL_MAX
    ),
  };

  return {
    ...cephalometryResults,
  };
}

export async function cephalometryDiagnostic(
  cephalometryValues: UpdateCephalometryDto
) {
  const cephalometryCalculatedValues =
    calculateCephalometryValues(cephalometryValues);

  const { longitudMandibular, alturaFacialInf, na, locDePorion } =
    cephalometryValues;

  const {
    longMandR1,
    longMandR2,
    longMandR3,
    longMandR4,
    alturaFacialInfR1,
    alturaFacialInfR2,
    alturaFacialInfR3,
    alturaFacialInfR4,
    alturaFacialInfR5,
  } = cephalometryCalculatedValues;

  const cephalometryResults = {
    relacionEsqueletica: getRelacionEsqueletica(
      longitudMandibular,
      longMandR1 as number,
      longMandR2 as number,
      longMandR3 as number,
      longMandR4 as number
    ),
    relacionEsqueleticaMm: getRelacionEsqueleticaMm(
      longitudMandibular,
      longMandR1 as number,
      longMandR4 as number
    ),
    alturaInferior: getAlturaInferior(
      alturaFacialInf as number,
      alturaFacialInfR1 as number,
      alturaFacialInfR2 as number,
      alturaFacialInfR3 as number,
      alturaFacialInfR4 as number,
      alturaFacialInfR5 as number
    ),
    alturaInferiorMm: getAlturaInferiorMm(
      alturaFacialInf as number,
      alturaFacialInfR1 as number,
      alturaFacialInfR5 as number
    ),
  };

  const dxIIoIII = getDxIIoIII(
    cephalometryResults.relacionEsqueletica as RelacionEsqueletica,
    na,
    locDePorion
  );

  return {
    ...cephalometryResults,
    dxIIoIII,
  };
}
