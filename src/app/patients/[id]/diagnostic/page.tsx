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
    title: "Diag. Cefalométrico",
    relEsqueletica: "Relación Esquelética",
    bioTipo: "Biotipo",
    planoOclusal: "Plano de Oclusión",
    comments: "Observacion De Radiografia Panoramica",
  },
  dental: {
    title: "Diag. Dental",
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
      korkhause:
        expansionDiagnostic.korkhauseTurns &&
        expansionDiagnostic.korkhauseTurns > 0
          ? `${expansionDiagnostic.korkhauseTurns} giros`
          : null,
      korkhauseFixed:
        expansionDiagnostic.korkhauseTurnsMod &&
        expansionDiagnostic.korkhauseTurnsMod > 0
          ? `${expansionDiagnostic.korkhauseTurnsMod} giros`
          : null,
      apinamiento:
        expansionDiagnostic.apinamientoTurns &&
        expansionDiagnostic.apinamientoTurns > 0
          ? `${expansionDiagnostic.apinamientoTurns} giros`
          : null,
      mordidaCruzada:
        expansionDiagnostic.mordidaCruzadaTurns &&
        expansionDiagnostic.mordidaCruzadaTurns > 0
          ? `${expansionDiagnostic.mordidaCruzadaTurns} giros`
          : null,
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
    "d11",
    "d12",
    "d13",
    "d21",
    "d22",
    "d23",
    "d31",
    "d32",
    "d33",
    "d41",
    "d42",
    "d43",
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

    if (diff === 0) return;

    if (diff < 0) {
      return {
        solution: "Aumentar",
        keyFinal,
        diff,
      };
    } else {
      return {
        solution: "Striping",
        keyFinal,
        diff,
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
          <div className='p-6 bg-bgDark-080 rounded-[12px] shadow'>
            {dxResults.korkhause && (
              <DxSectionDental
                label={dxLabels.expansion.korkhause}
                value={dxResults.korkhause ?? ""}
              />
            )}
            {dxResults.korkhauseFixed && (
              <DxSectionDental
                label={dxLabels.expansion.korkhauseFixed}
                value={dxResults.korkhauseFixed ?? ""}
              />
            )}
            {dxResults.apinamiento && (
              <DxSectionDental
                label={dxLabels.expansion.apinamiento}
                value={dxResults.apinamiento ?? ""}
              />
            )}
            {dxResults.mordidaCruzada && (
              <DxSectionDental
                label={dxLabels.expansion.mordidaCruzada}
                value={dxResults.mordidaCruzada ?? ""}
              />
            )}
          </div>
        </section>
      )}

      {cephalometry && toothSizeModifed && (
        <section className='mt-6 py-6 px-10 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
          <h5 className='text-h5 text-txtBrand-secondary text-center'>
            {dxLabels.dentalSize.title}
          </h5>
          <div className='p-6 flex flex-col gap-2 text-txtLight-100 text-h5 bg-bgDark-080 rounded-[12px] shadow'>
            {tamañoDental.map((item, index) => {
              if (!item) return;
              return (
                <p key={index} className='flex gap-2'>
                  <span>{item.keyFinal}</span>
                  <span className='min-w-[120px]'>{item.solution}</span>
                  <span className='font-bold min-w-20 text-right'>
                    {item.diff} mm
                  </span>
                </p>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
