import { IArches, IToothSize, IPatientRequired } from "@/interfaces";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import DxSection from "./DxSection";
import DxSectionDental from "./DxSectionDental";

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
  };

  const {
    valorationArches,
    valorationDental,
    toothSizeModifed,
    expansionDiagnostic,
    cephalometry,
    valorationCephalometry,
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

  console.log(dxResults);
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
    </div>
  );
}
