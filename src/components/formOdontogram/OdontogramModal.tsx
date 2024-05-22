import Image from "next/image";

const toothStatus = [
  { label: "ausente", value: "ausente" },
  { label: "corona", value: "corona" },
  { label: "obturación", value: "obturación" },
  { label: "caries mesial", value: "cariesMesial" },
  { label: "caries distal", value: "cariesDistal" },
  { label: "caries vestibular", value: "cariesVestibular" },
  { label: "caries lingual", value: "cariesLingual" },
  { label: "caries oclusal", value: "cariesOclusal" },
];

const toothSuffering = [
  "incluido",
  "erupción",
  "no erupcionado",
  "extruido",
  "ectópico",
  "mesiorotado",
  "mesioangulado",
  "distalrotado",
  "telescópico",
  "cruzado",
  "movilidad",
];

export default function OdontogramModal({
  label,
  image,
  onClose,
  setInputValue,
  getInputsValue,
  register,
}: {
  label: string;
  image: string;
  onClose: () => void;
  setInputValue: (field: any, value: string) => void;
  getInputsValue: (field: string) => string;
  register?: any;
}) {
  const nameAdded = "d" + label;

  if (getInputsValue(nameAdded) !== nameAdded) {
    setInputValue(`${nameAdded}.name`, nameAdded);
  }

  return (
    <div className='p-6 flex flex-col items-center gap-6 bg-bgDark-080 rounded-[12px]'>
      <div className='w-full flex justify-end'>
        <button
          className='w-12 h-12 text-h3 border rounded-full text-light-090'
          onClick={onClose}>
          X
        </button>
      </div>
      <div className='w-20 h-20 flex justify-center items-center'>
        <Image
          src={image}
          alt={label}
          width={44}
          height={44}
          className='w-full h-full'
        />
      </div>
      <p className='text-h3 text-light-090'>
        <span>{label.at(0)}</span>
        <span>{` - `}</span>
        <span>{label.at(1)}</span>
      </p>
      <select
        {...register(`${nameAdded}.state`)}
        id=''
        className='w-full px-3 py-2 rounded-[12px] bg-bgDark-070 text-ctaLight-090 text-h5'>
        <option value='' className='capitalize'>
          Estatus Actual
        </option>
        {toothStatus.map((status, key) => (
          <option className='capitalize' key={key} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      <select
        {...register(`${nameAdded}.pathology`)}
        id=''
        className='w-full px-3 py-2 rounded-[12px] bg-bgDark-070 text-ctaLight-090 text-h5'>
        <option className='capitalize' value=''>
          Patologias
        </option>
        {toothSuffering.map((status, key) => (
          <option className='capitalize' key={key} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
