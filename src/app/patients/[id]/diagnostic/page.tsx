import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import DxSection from "./DxSection";
import {
  IArches,
  IToothSize,
  IPatientRequired,
  ToothLabel,
  ITooth,
  ToothName,
} from "@/interfaces";
import DxSectionDental from "./DxSectionDental";
import {
  odontogramUpItems,
  odontogramDownItems,
  STATUS_STYLES_ODONTOGRAM,
} from "@/constants/odontogram.constants";

const patientData = async (id: string) => {
  const docRef = doc(db, "patients", id);
  const docSnap = await getDoc(docRef);
  let patientData = undefined;
  if (docSnap.exists()) {
    patientData = {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
  return patientData;
};

const dxLabels = {
  cephalometry: {
    title: "Dx Cefalométrico",
    relEsqueletica: "Relación Esquelética",
    bioTipo: "Biotipo",
    planoOclusal: "Plano de Oclusión",
    inclinacionAnterior: "Inclinación Anterior",
    comments: "Observacion De Radiografia Panoramica",
  },
  dental: {
    title: "Dx Dental",
    relMolarRight: "Relación Molar Derecha",
    relMolarLeft: "Relación Molar Izquierda",
    archeUpper: "Arcada Superior",
    archeLower: "Arcada Inferior",
    posteriorBitRight: "Mordida Posterior Derecha",
    posteriorBitLeft: "Mordida Posterior Izquierda",
    anteriorBit: "Mordida Anterior",
    comments: "Observaciones Oclusión y Guías Funcionales",
  },
  expansion: {
    title: "Expansión",
    korkhause: "Korkhause",
    korkhauseFixed: "Korkhause Modificado",
    apinamiento: "Apinamiento Inferior",
    mordidaCruzada: "Mordida Cruzada",
  },
  dentalSize: {
    title: "Ajustes Tamaño Dentario",
  },
  odontogram: {
    title: "Odontograma",
  },
};

export default async function Diagnostic({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const patient = (await patientData(id)) ?? {
    valorationArches: {
      d11: "",
      d12: "",
      d13: "",
      d21: "",
      d22: "",
      d23: "",
      d31: "",
      d32: "",
      d33: "",
      d41: "",
      d42: "",
      d43: "",
      aboveSum: 0,
      belowSum: 0,
      discrepancy: false,
    },
    valorationDental: {
      relacionMolarDer: "",
      relacionMolarIzq: "",
      tamanoArcadaSup: "",
      formaArcadaSup: "",
      tamanoArcadaInf: "",
      formaArcadaInf: "",
      apinamientoSup: "",
      apinamientoInf: "",
      mordidaPosteriorDer: "",
      mordidaPosteriorIzq: "",
      mordidaAnterior: "",
      mordidaAnteriorMM: "",
    },
    toothSizeModifed: {
      d11: "",
      d12: "",
      d13: "",
      d21: "",
      d22: "",
      d23: "",
      d31: "",
      d32: "",
      d33: "",
      d41: "",
      d42: "",
      d43: "",
      aboveSum: 0,
      belowSum: 0,
      discrepancy: false,
    },
    expansionDiagnostic: {
      apinamientoTurns: 0,
      korkhauseTurns: 0,
      korkhauseTurnsMod: 0,
      mordidaCruzadaTurns: 0,
    },
    cephalometry: {
      relacionEsqueletica: "",
      dxIIoIII: "",
      relacionEsqueleticaMm: "",
      alturaInferior: "",
      alturaInferiorMm: "",
      biotipo: "",
      tendenciaVertical: "",
      planoDeOclusion: "",
      cajaDental: "",
      segundoMolarInferior: "",
      ejeIncisivoSuperior: "",
      ejeIncisivoInferior: "",
    },
    valorationCephalometry: {
      mm: "",
      molarInferior: "",
      comments: "",
    },
    valorationOdotontogram: {
      createdAt: "",
      updatedAt: "",
      d11: "",
      d12: "",
      d13: "",
      d14: "",
      d15: "",
      d16: "",
      d17: "",
      d18: "",
      d21: "",
      d22: "",
      d23: "",
      d24: "",
      d25: "",
      d26: "",
      d27: "",
      d28: "",
      d31: "",
      d32: "",
      d33: "",
      d34: "",
      d35: "",
      d36: "",
      d37: "",
      d38: "",
      d41: "",
      d42: "",
      d43: "",
      d44: "",
      d45: "",
      d46: "",
      d47: "",
      d48: "",
      generalPathology: [],
      comments: "",
    },
  };

  const {
    valorationArches,
    valorationDental,
    toothSizeModifed,
    expansionDiagnostic,
    cephalometry,
    valorationCephalometry,
    valorationOdotontogram,
  } = patient as IPatientRequired;

  const getCephalometryData = () => {
    if (!cephalometry) return;

    const relEsqueleticaMM = cephalometry.relacionEsqueleticaMm
      ? `${cephalometry.relacionEsqueleticaMm} mm`
      : "";

    const dxIIoIII = cephalometry.dxIIoIII ?? "";

    const valorationMM = valorationCephalometry.mm
      ? `${valorationCephalometry.mm} mm`
      : "";
    const valMolarInf = valorationCephalometry.molarInferior
      ? `${valorationCephalometry.molarInferior} mm`
      : "";
    return {
      relEsqueletica: [
        `${cephalometry.relacionEsqueletica} ${dxIIoIII} ${relEsqueleticaMM}`,
        `${cephalometry.alturaInferior} ${cephalometry.alturaInferiorMm} mm`,
      ],
      biotipo: [`${cephalometry.biotipo}`, `${cephalometry.tendenciaVertical}`],
      planoOclusion: [
        `${cephalometry.planoDeOclusion}`,
        `${cephalometry.cajaDental} ${valorationMM}`,
        `${cephalometry.segundoMolarInferior} ${valMolarInf}`,
      ],
      inclinacionAnterior: [
        `${cephalometry.ejeIncisivoSuperior}`,
        `${cephalometry.ejeIncisivoInferior}`,
      ],
      cephalometryComments: valorationCephalometry.comments ?? "",
    };
  };

  const getDentalData = () => {
    if (!cephalometry || !valorationDental) return;

    const apinaminetoSup = valorationDental.apinamientoSup
      ? `Apiñamiento ${valorationDental.apinamientoSup}`
      : "";
    const apinaminetoInf = valorationDental.apinamientoInf
      ? `Apiñamiento ${valorationDental.apinamientoInf}`
      : "";
    return {
      relMolarRight: valorationDental.relacionMolarDer,
      relMolarLeft: valorationDental.relacionMolarIzq,
      archeUpper: `${valorationDental.tamanoArcadaSup} ${valorationDental.formaArcadaSup} ${apinaminetoSup}`,
      archeLower: `${valorationDental.tamanoArcadaInf} ${valorationDental.formaArcadaInf} ${apinaminetoInf}`,
      posteriorBitRight: valorationDental.mordidaPosteriorDer,
      posteriorBitLeft: valorationDental.mordidaPosteriorIzq,
      anteriorBit: `${valorationDental.mordidaAnterior} ${valorationDental.mordidaAnteriorMM} mm`,
      dentalObservation: valorationDental.comments,
    };
  };

  const getExpansionData = () => {
    if (!expansionDiagnostic) return;
    return {
      korkhause: expansionDiagnostic.korkhauseTurns
        ? `${expansionDiagnostic.korkhauseTurns} giros`
        : "no requerido",
      korkhauseFixed: expansionDiagnostic.korkhauseTurnsMod
        ? `${expansionDiagnostic.korkhauseTurnsMod} giros`
        : "no requerido",
      apinamiento: null,
      mordidaCruzada: expansionDiagnostic.mordidaCruzadaTurns
        ? `${expansionDiagnostic.mordidaCruzadaTurns} giros`
        : "no requerido",
    };
  };

  const cephalometryData = getCephalometryData();
  const dentalData = getDentalData();
  const expansionData = getExpansionData();

  const dxResults = {
    ...cephalometryData,
    ...dentalData,
    ...expansionData,
  };

  const toothSizeDentalKeys = [
    "d13",
    "d12",
    "d11",
    "d21",
    "d22",
    "d23",
    "d43",
    "d42",
    "d41",
    "d31",
    "d32",
    "d33",
  ];

  const tamañoDental = toothSizeDentalKeys.map((key) => {
    // this need to be enhanced
    if (!valorationArches || !toothSizeModifed) return;

    const keyArches = key as keyof IArches;
    const keyToothSize = key as keyof IToothSize;

    const patient = valorationArches[keyArches] ?? 0;
    const modifided = toothSizeModifed[keyToothSize] ?? 0;

    const diff = Number(patient) - Number(modifided);
    const keyName = key.slice(1, 3);
    const [quadrant, piece] = keyName.split("");
    const keyFinal = `${quadrant}.${piece}`;

    if (diff === 0) {
      return {
        styles: "bg-bgDark-070",
        keyFinal,
        diff,
      };
    }

    if (diff > 0) {
      return {
        styles: "bg-red-500 text-white font-bold",
        keyFinal,
        diff: Math.abs(diff),
      };
    } else {
      return {
        styles: "bg-green-500 text-dark-100 font-bold",
        keyFinal,
        diff: Math.abs(diff),
      };
    }
  });

  return (
    <div>
      {cephalometry && (
        <section className='py-6 grid gap-6'>
          <h3 className='text-h3 text-txtLight-100 text-center'>
            {dxLabels.cephalometry.title}
          </h3>
          <DxSection
            title={dxLabels.cephalometry.relEsqueletica}
            items={dxResults.relEsqueletica ?? ""}
          />
          <DxSection
            title={dxLabels.cephalometry.bioTipo}
            items={dxResults.biotipo ?? ""}
          />
          <DxSection
            title={dxLabels.cephalometry.planoOclusal}
            items={dxResults.planoOclusion ?? ""}
          />
          <DxSection
            title={dxLabels.cephalometry.inclinacionAnterior}
            items={dxResults.inclinacionAnterior ?? ""}
          />
          {dxResults.cephalometryComments &&
            dxResults.cephalometryComments !== "" && (
              <DxSection
                title={dxLabels.cephalometry.comments}
                items={dxResults.cephalometryComments}
                iconShowen={false}
              />
            )}
        </section>
      )}
      {cephalometry && valorationDental && (
        <section className='py-6 grid gap-6'>
          <h3 className='text-h3 text-txtLight-100 text-center'>
            {dxLabels.dental.title}
          </h3>
          <div className='p-6 flex flex-col gap-3 bg-bgDark-080 rounded-[12px] shadow'>
            <DxSectionDental
              label={dxLabels.dental.relMolarRight}
              value={valorationDental.relacionMolarDer}
            />
            <DxSectionDental
              label={dxLabels.dental.relMolarLeft}
              value={valorationDental.relacionMolarIzq}
            />
            <DxSectionDental
              label={dxLabels.dental.archeUpper}
              value={dxResults.archeUpper ?? ""}
            />
            <DxSectionDental
              label={dxLabels.dental.archeLower}
              value={dxResults.archeLower ?? ""}
            />
            <DxSectionDental
              label={dxLabels.dental.posteriorBitRight}
              value={dxResults.posteriorBitRight ?? ""}
            />
            <DxSectionDental
              label={dxLabels.dental.posteriorBitLeft}
              value={dxResults.posteriorBitLeft ?? ""}
            />
            <DxSectionDental
              label={dxLabels.dental.anteriorBit}
              value={dxResults.anteriorBit ?? ""}
            />
          </div>
          {dxResults.dentalObservation != "" && (
            <DxSection
              title={dxLabels.dental.comments}
              items={dxResults.dentalObservation ?? ""}
              iconShowen={false}
            />
          )}
        </section>
      )}

      {cephalometry && expansionDiagnostic && (
        <section className='py-6 px-10 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
          <h5 className='text-h5 text-txtBrand-secondary text-center'>
            {dxLabels.expansion.title}
          </h5>
          <div className='p-6 flex flex-col gap-4 bg-bgDark-080 rounded-[12px] shadow'>
            <DxSectionDental
              label={dxLabels.expansion.korkhause}
              value={dxResults.korkhause ?? ""}
            />

            <DxSectionDental
              label={dxLabels.expansion.korkhauseFixed}
              value={dxResults.korkhauseFixed ?? "Pendiente Tamaño dentario"}
            />

            <DxSectionDental
              label={dxLabels.expansion.mordidaCruzada}
              value={dxResults.mordidaCruzada ?? ""}
            />
          </div>
        </section>
      )}

      {cephalometry && toothSizeModifed && (
        <section className='mt-6 py-6 px-10 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
          <h5 className='text-h5 text-txtBrand-secondary text-center'>
            {dxLabels.dentalSize.title}
          </h5>
          <div className='p-6 flex flex-col gap-2 text-txtLight-100 text-h5 bg-bgDark-080 rounded-[12px] shadow'>
            <div className='grid grid-cols-6 gap-2 '>
              {tamañoDental.map((tooth, key: number) => (
                <span
                  key={key}
                  className={`p-2  text-center text-h5 ${tooth?.styles}`}>
                  {tooth?.diff}
                </span>
              ))}
            </div>
            <div className='py-6 text-small flex justify-center gap-2'>
              <span className='py-2 px-4 bg-green-500 text-dark-100 rounded-[12px] first-letter:uppercase'>
                aumentar (mm)
              </span>
              <span className='py-2 px-4 bg-red-500 text-dark-100 rounded-[12px] first-letter:uppercase'>
                stripping (mm)
              </span>
            </div>
          </div>
        </section>
      )}

      {valorationOdotontogram && (
        <section className='mt-6 py-6 px-10 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
          <h5 className='text-h5 text-txtBrand-secondary text-center'>
            {dxLabels.odontogram.title}
          </h5>
          <div className='p-6 flex flex-col gap-2 text-txtLight-100 text-h5 bg-bgDark-080 rounded-[12px] shadow'>
            <div className='h-[300px] flex relative items-start justify-center'>
              {odontogramUpItems.map((item, index) => {
                const quadrant = item.label.at(0);
                const tooth = Number(item.label.at(1));

                const labelStyle = quadrant === "2" ? "-scale-x-[1]" : "";
                const toothStyle =
                  tooth >= 4
                    ? "bottom-0 left-[55px] "
                    : tooth >= 2
                    ? "top-[-25px] left-[-5px]"
                    : "top-[-30px] left-[calc(50%-10px)]";

                const piecelabel: ToothName = `d${item.label}` as ToothLabel;
                const piece = valorationOdotontogram[piecelabel] as ITooth;
                let statusStyle = "";
                if (piece) {
                  const cariesIncluded = piece.state?.includes("caries");
                  const cariesOclusal = piece.state?.includes("cariesOclusal");

                  if (cariesIncluded && !cariesOclusal) {
                    const position =
                      Number(quadrant) === 1 || Number(quadrant) === 2
                        ? "upper"
                        : "lower";
                    const style =
                      STATUS_STYLES_ODONTOGRAM[piece.state as string];
                    if (typeof style === "object") {
                      statusStyle = style[position] || "";
                    }
                  } else {
                    statusStyle = piece.state
                      ? (STATUS_STYLES_ODONTOGRAM[piece.state] as string)
                      : "";
                  }
                }
                return (
                  <button
                    disabled
                    type='button'
                    key={item.label + index}
                    className={item.styles ?? ""}>
                    <div className='relative rounded-full'>
                      <p
                        className={`absolute text-light-090 ${labelStyle} ${toothStyle}`}>
                        {item.label}
                      </p>
                      <Image
                        className='w-full h-full'
                        src={item.image}
                        alt={item.label}
                        width={44}
                        height={40}
                        unoptimized
                      />
                      <div className={statusStyle ?? "hidden"} />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className='h-[300px] flex relative items-end justify-center '>
              {odontogramDownItems.map((item, index) => {
                const quadrant = item.label.at(0);
                const tooth = Number(item.label.at(1));

                const labelStyle = quadrant === "3" ? "-scale-x-[1]" : "";
                const toothStyle =
                  tooth >= 4
                    ? "top-[10%] left-[65px] "
                    : tooth >= 2
                    ? "bottom-[-25px] left-[-5px]"
                    : "bottom-[-30px] left-[calc(50%-10px)]";
                const piecelabel: ToothName = `d${item.label}` as ToothLabel;
                const piece = valorationOdotontogram[piecelabel] as ITooth;
                let statusStyle = "";
                if (piece) {
                  const cariesIncluded = piece.state?.includes("caries");
                  const cariesOclusal = piece.state?.includes("cariesOclusal");

                  if (cariesIncluded && !cariesOclusal) {
                    const position =
                      Number(quadrant) === 1 || Number(quadrant) === 2
                        ? "upper"
                        : "lower";
                    const style =
                      STATUS_STYLES_ODONTOGRAM[piece.state as string];
                    if (typeof style === "object") {
                      statusStyle = style[position] || "";
                    }
                  } else {
                    statusStyle = piece.state
                      ? (STATUS_STYLES_ODONTOGRAM[piece.state] as string)
                      : "";
                  }
                }

                return (
                  <button
                    disabled
                    type='button'
                    key={item.label + index}
                    className={item.styles ?? ""}>
                    <div className='relative rounded-full'>
                      <p
                        className={`absolute text-light-090 ${labelStyle} ${toothStyle} `}>
                        {item.label}
                      </p>
                      <Image
                        className='w-full h-full'
                        src={item.image}
                        alt={item.label}
                        width={44}
                        height={40}
                        unoptimized
                      />
                      <div className={statusStyle ?? "hidden"} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className='w-full px-[10%] mt-20 text-txtBrand-alternative '>
            <h4 className='text-h4 mb-4'>Patologias</h4>
            <ul className='flex flex-col gap-2 text-small'>
              {Object.entries(valorationOdotontogram).map(([key, value]) => {
                if (key.startsWith("d")) {
                  const piece = value as ITooth;
                  if (piece.pathology && piece.pathology.length > 0) {
                    return <li key={key}>{`${key}: ${piece.pathology}`}</li>;
                  }
                }
              })}
            </ul>
          </div>
          <div className='mt-[60px] w-full flex flex-col gap-3'>
            <label
              className='w-full text-txtBrand-secondary text-center'
              htmlFor='observaciones'>
              Observaciones Generales
            </label>
            <p className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5 bg-light-090 min-h-10'></p>
          </div>
        </section>
      )}
    </div>
  );
}
