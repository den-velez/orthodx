import { IconsComponent } from "@/components";

const dxLabels = {
  cephalometry: {
    title: "Diag. Cefalométrico",
    relEsqueletica: "Relación Esquelética",
    bioTipo: "Biotipo",
    planoOclusal: "Plano de Oclusión",
  },
  dental: {
    title: "Diag. Dental",
    obsPanoramica: "Observacion De Radiografia Panoramica",
    expansion: "Expansión",
  },
};

const dxResults = {
  relEsqueletica: [
    "Clase III Esquelética Real 4 mm",
    "Altura facial interior aumentado 5 Mm",
  ],
  biotipo: ["Mesofacial", "Crecimiento braquifacial"],
  planoOclusion: [
    "Plano de oclusión en clase III",
    "Caja dental normal en 28 grados",
    "2 ° molar inferior sobre el plano de oclusión 2 Mm",
  ],
  dental: [
    "Relacion Esqueletica",
    "Biotipo",
    "Plano de Oclusion",
    "Inclinacion Anterior",
  ],
  observationRx: [
    "This is an observacion This is an observacion This is an observacion",
  ],
  giros: [
    {
      label: "Korkhause",
      turns: "10 giros",
    },
  ],
};

function DxItem({ label, iconShowen }: { label: string; iconShowen: boolean }) {
  return (
    <div className='flex items-center gap-3 '>
      {iconShowen && (
        <div className='h-6 w-5 flex items-center'>
          <IconsComponent icon='list' />
        </div>
      )}
      <p className='flex-grow text-txtLight-100'>{label}</p>
    </div>
  );
}

function DxSection({
  title,
  items,
  iconShowen = true,
}: {
  title?: string;
  items: string[];
  iconShowen?: boolean;
}) {
  return (
    <section className='p-6 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
      {title && (
        <h5 className='text-h5 text-txtBrand-secondary text-center'>{title}</h5>
      )}

      {items.map((item, index) => (
        <DxItem key={index} label={item} iconShowen={iconShowen} />
      ))}
    </section>
  );
}

export default function Diagnostic() {
  return (
    <>
      <div className='py-6 grid gap-6 '>
        <h3 className='text-h3 text-txtLight-100 text-center'>
          {dxLabels.cephalometry.title}
        </h3>
        <DxSection
          title={dxLabels.cephalometry.relEsqueletica}
          items={dxResults.relEsqueletica}
        />
        <DxSection
          title={dxLabels.cephalometry.bioTipo}
          items={dxResults.biotipo}
        />
        <DxSection
          title={dxLabels.cephalometry.planoOclusal}
          items={dxResults.planoOclusion}
        />
        <DxSection
          title={dxLabels.dental.obsPanoramica}
          items={dxResults.observationRx}
          iconShowen={false}
        />
        <section className='py-6 px-10 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
          <h5 className='text-h5 text-txtBrand-secondary text-center'>
            {dxLabels.dental.expansion}
          </h5>
          {dxResults.giros.map((giro, index) => (
            <div key={index} className='flex items-center gap-3 '>
              <span className='text-txtBrand-secondary'>
                {giro.label}
                {":"}
              </span>
              <span className='text-txtLight-100'>{giro.turns}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
