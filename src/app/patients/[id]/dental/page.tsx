import { ButtonComponent } from "@/components";

type TDentalItems = {
  label: string;
  name: string;
  options: string[];
};

const dentalItems = [
  {
    label: "relación molar izquierda",
    name: "molarLeft",
    options: ["Clase I", "Clase II", "Clase III", "Ausente", "mesiorotación"],
  },
  {
    label: "relación molar derecha",
    name: "molarRight",
    options: ["Clase I", "Clase II", "Clase III", "Ausente", "mesiorotación"],
  },
  {
    label: "relación canina izquierda",
    name: "canineLeft",
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
    name: "canineLeft",
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
    name: "posteriorBiteLeft",
    options: ["normal", "cruzada", "telescópica"],
  },
  {
    label: "mordida posterior derecha",
    name: "posteriorBiteLeft",
    options: ["Clase I", "Clase II", "Clase III"],
  },
  {
    label: "mordida anterior",
    name: "anteriorBiteLeft",
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

const arcadasItems = [
  {
    label: "dentición",
    name: "dentition",
    options: ["infantil", "mixta", "permanente"],
  },
  {
    label: "tamaño arcada superior",
    name: "arcadaSizeUp",
    options: ["amplio", "normal", "estrecho"],
  },
  {
    label: "tamaño arcada inferior",
    name: "arcadaSizeDown",
    options: ["amplio", "normal", "estrecho"],
  },
  {
    label: "forma arcada superior",
    name: "arcadaShapeUp",
    options: ["redonda", "ovoide", "triangular", "cuadrada", "retroinclinado"],
  },
  {
    label: "forma arcada inferior",
    name: "arcadaShapeDown",
    options: ["redonda", "ovoide", "triangular", "cuadrada", "retroinclinado"],
  },
  {
    label: "apiñamiento superior",
    name: "crowdingUp",
    options: ["no tiene", "ligero", "moderado", "severo", "espacios"],
  },
  {
    label: "apiñamiento inferior",
    name: "crowdingDown",
    options: ["no tiene", "ligero", "moderado", "severo", "espacios"],
  },
];

function DentalFormItem({
  label,
  name,
  options = [],
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='' className='text-small text-ctaLight-090'>
        {label}
      </label>
      <select
        name={name}
        id=''
        className='px-3 py-2 rounded-bl-[12px] bg-bgDark-070 text-ctaLight-090 text-h5'>
        <option value=''>Seleccionar</option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default function DentalValoration() {
  return (
    <>
      <form action='' className='grid gap-6'>
        <section className='px-3 py-6 bg-bgDark-080 rounded-[12px] shadow'>
          <h3 className='mb-6 text-h3 text-txtBrand-secondary text-center capitalize'>
            Dental
          </h3>
          <div className='grid gap-3'>
            {dentalItems.map((item, index) => (
              <DentalFormItem key={index} {...item} />
            ))}
          </div>
        </section>
        <section className='px-3 py-6 bg-bgDark-080 rounded-[12px] shadow'>
          <h3 className='mb-6 text-h3 text-txtBrand-secondary text-center capitalize'>
            Arcadas
          </h3>
          <div className='grid gap-3'>
            {arcadasItems.map((item, index) => (
              <DentalFormItem key={index} {...item} />
            ))}
          </div>
        </section>
        <div className='mt-[48px] w-full flex flex-col gap-3'>
          <label
            className='w-full text-txtBrand-secondary text-center'
            htmlFor='observaciones'>
            Observaciones Oclusion Y Guias Funcionales
          </label>
          <textarea
            className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
            name='observaciones'
            id=''
            rows={6}></textarea>
        </div>
        {/* <div className='mt-[60px] h-[60px]'>
        <ButtonComponent label='Guardar' variant='primary' widthfull />
      </div> */}
        <div className='mt-[60px] h-[60px]'>
          <ButtonComponent
            label='Siguiente'
            variant='primary'
            widthfull
            anchor
            anchorUrl='/patients/2/arcadas'
          />
        </div>
      </form>
    </>
  );
}
