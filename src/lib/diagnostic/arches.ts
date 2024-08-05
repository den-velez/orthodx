"use server";

import * as constants from "@/constants/diagnostic.constants";

export interface KorkhauseModTurns {
  d12: number;
  d11: number;
  d21: number;
  d22: number;
  dist6a6Sup: number;
}

export interface UpdateArchesDto {
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

interface BaseValue {
  [key: string]: number | string | undefined;
}

function findValue(array: BaseValue[], number: number | string | undefined) {
  if (!number) return undefined;
  const value = array.find((object) => object[number]);
  if (!value) return undefined;
  return value[number] as number;
}

function getTeethSum(
  valuesArray: number[],
  factor?: number,
  factorRounded?: boolean
) {
  if (!factor && !factorRounded) {
    return valuesArray.reduce((a, b) => a + b, 0);
  }
  if (factor) {
    if (factorRounded) {
      return Math.round(valuesArray.reduce((a, b) => a + b, 0) * factor);
    }
    return valuesArray.reduce((a, b) => a + b, 0) * factor;
  }
}

function getDifferences(dentalValue: number, distance: number) {
  if (dentalValue > 0 && dentalValue < distance) {
    return dentalValue - distance;
  }
  return false;
}

// function getApinamientoTurns(
//   teethBelowMeasuresArray: number[],
//   distance3_3: number
// ) {
//   const teethSum = teethBelowMeasuresArray.reduce((a, b) => a + b, 0);
//   if (distance3_3 > 0 && teethSum > distance3_3) {
//     return Math.round((teethSum - distance3_3) / 0.7) * 4;
//   } else {
//     return 0;
//   }
// }

function getKorkhauseTurns(distanceAbove6_6: number, dist6a6Sup: number) {
  if (dist6a6Sup > 1 && distanceAbove6_6 > dist6a6Sup) {
    return (distanceAbove6_6 - dist6a6Sup) * 4;
  } else {
    return 0;
  }
}

function getMordidaCruzadaTurns(
  distanceAbove6_6: number,
  distanceBelow6_6: number
) {
  if (distanceAbove6_6 > 1 && distanceAbove6_6 < distanceBelow6_6) {
    return Math.round((distanceBelow6_6 - distanceAbove6_6 + 2) * 4);
  } else {
    return 0;
  }
}

function getDiscrepancia(sumBelow: number, sumAboveRounded: number) {
  let discrepancy = false;
  if (sumBelow && sumAboveRounded) {
    if (sumBelow === sumAboveRounded) {
      discrepancy = false;
    } else {
      discrepancy = true;
    }
    return {
      discrepancy,
      sumAboveRounded,
      sumBelow,
    };
  }
}

function getSuggestionsList(
  d11: number,
  d12: number,
  d13: number,
  d21: number,
  d22: number,
  d23: number,
  d31: number,
  d32: number,
  d33: number,
  d41: number,
  d42: number,
  d43: number,
  sumTeethAbove: number,
  sumTeethAboveFactorRounded: number,
  sumTeethBelow: number
) {
  let suggestionsList = [];

  if (d11 != d21) {
    suggestionsList.push("Igualar tamaño de centrales superiores");
  }
  if (d31 != d41) {
    suggestionsList.push("Igualar tamaño de centrales inferiores");
  }
  if (d13 != d23 || d33 != d43) {
    suggestionsList.push("Igualar tamaño de caninos");
  }
  if (
    sumTeethAboveFactorRounded > sumTeethAbove &&
    d11 + d21 >= d12 + d22 + 4
  ) {
    suggestionsList.push("Stripping centrales superiores");
  }
  if (
    sumTeethAboveFactorRounded < sumTeethBelow &&
    d11 + d21 >= d12 + d22 + 4
  ) {
    suggestionsList.push("Aumentar tamaño a laterales superiores");
  }
  if (
    sumTeethAboveFactorRounded > sumTeethBelow &&
    d11 + d21 <= d12 + d22 + 3.5
  ) {
    suggestionsList.push("Stripping a laterales superiores");
  }
  if (
    sumTeethAboveFactorRounded < sumTeethBelow &&
    d31 + d41 <= d32 + d42 + 1.5
  ) {
    suggestionsList.push("Stripping a laterales inferiores");
  }
  if (
    sumTeethAboveFactorRounded > sumTeethBelow &&
    d31 + d41 <= d32 + d42 - 2
  ) {
    suggestionsList.push("Aumentar a Centrales Inferiores");
  }
  if (
    sumTeethAboveFactorRounded < sumTeethBelow &&
    d31 + d41 <= d32 + d42 - 1
  ) {
    suggestionsList.push("Stripping incisivos inferiores Cuidar Proporcion");
  }

  return suggestionsList;
}

export async function getExpansionDiagnostic(ArchesValues: UpdateArchesDto) {
  const {
    d11,
    d12,
    d13,
    d21,
    d22,
    d23,
    d31,
    d32,
    d33,
    d41,
    d42,
    d43,
    d4a4,
    dist6a6Sup,
    loAnt,
    dist3a3Inf,
    dist6a6Inf,
    dist6a6Inf2,
  } = ArchesValues;

  const archesSumValues = {
    sumTeethAbove: getTeethSum([d11, d12, d13, d21, d22, d23]),
    sumTeethBelow: getTeethSum([d31, d32, d33, d41, d42, d43]),
    sumTeethKorkhauseAbove: getTeethSum([d11, d12, d21, d22]),
    sumTeethAboveFactor: getTeethSum([d11, d12, d13, d21, d22, d23], 0.75),
    sumTeethAboveFactorRounded: getTeethSum(
      [d11, d12, d13, d21, d22, d23],
      0.75,
      true
    ),
  };

  const archesDistancesValues = {
    distanceAbove4_4: findValue(
      constants.DISTANCIA_4_4_KORKHAUSE,
      archesSumValues.sumTeethKorkhauseAbove
    ),
    distanceAbove6_6: findValue(
      constants.DISTANCIA_6_6_KORKHAUSE,
      archesSumValues.sumTeethKorkhauseAbove
    ),
    distanceLongAnt: findValue(
      constants.DISTANCIA_LONG_ANT_KORKHAUSE,
      archesSumValues.sumTeethKorkhauseAbove
    ),
  };
  const archesDiffValues = {
    diff4_4: getDifferences(
      d4a4,
      archesDistancesValues.distanceAbove4_4 as number
    ),
    diff6_6: getDifferences(
      dist6a6Sup,
      archesDistancesValues.distanceAbove6_6 as number
    ),
    diffLongAnt: getDifferences(
      loAnt,
      archesDistancesValues.distanceLongAnt as number
    ),
  };

  const korkhauseTurnsCalculated = getKorkhauseTurns(
    archesDistancesValues.distanceAbove6_6 as number,
    dist6a6Sup
  );

  const mordidaCruzadaTurns = getMordidaCruzadaTurns(dist6a6Sup, dist6a6Inf2);

  const archesCalculatedValues = {
    apinamientoTurns: 0,
    korkhauseTurns: korkhauseTurnsCalculated > 0 ? korkhauseTurnsCalculated : 0,
    mordidaCruzadaTurns: mordidaCruzadaTurns > 0 ? mordidaCruzadaTurns : 0,
  };

  return {
    ...archesCalculatedValues,
  };
}

export async function getDiscrepancyDiagnostic(ArchesValues: UpdateArchesDto) {
  const { d11, d12, d13, d21, d22, d23, d31, d32, d33, d41, d42, d43 } =
    ArchesValues;

  const archesSumValues = {
    sumTeethAbove: getTeethSum([d11, d12, d13, d21, d22, d23]),
    sumTeethBelow: getTeethSum([d31, d32, d33, d41, d42, d43]),
    sumTeethAboveFactor: getTeethSum([d11, d12, d13, d21, d22, d23], 0.75),
    sumTeethAboveFactorRounded: getTeethSum(
      [d11, d12, d13, d21, d22, d23],
      0.75,
      true
    ),
  };

  const archesCalculatedValues = getDiscrepancia(
    archesSumValues.sumTeethBelow as number,
    archesSumValues.sumTeethAboveFactorRounded as number
  );

  const suggestions = getSuggestionsList(
    d11,
    d12,
    d13,
    d21,
    d22,
    d23,
    d31,
    d32,
    d33,
    d41,
    d42,
    d43,
    archesSumValues.sumTeethAbove as number,
    archesSumValues.sumTeethAboveFactorRounded as number,
    archesSumValues.sumTeethBelow as number
  );

  return {
    ...archesCalculatedValues,
    suggestions,
  };
}

export async function getKorkhauseTurnsModified({
  d12,
  d11,
  d21,
  d22,
  dist6a6Sup,
}: KorkhauseModTurns) {
  const sumTeethKorkhauseModAbove = getTeethSum([d11, d12, d21, d22]);

  const archesModDistancesValues = {
    distanceAbove6_6: findValue(
      constants.DISTANCIA_6_6_KORKHAUSE,
      sumTeethKorkhauseModAbove
    ),
  };

  const korkhauseModTurns = getKorkhauseTurns(
    archesModDistancesValues.distanceAbove6_6 as number,
    dist6a6Sup
  );

  return { korkhauseModTurns: korkhauseModTurns > 0 ? korkhauseModTurns : 0 };
}
