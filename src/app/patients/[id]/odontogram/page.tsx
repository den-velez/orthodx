"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ButtonComponent,
  ModalComponent,
  TreatmentPendingComponent,
} from "@/components";
import { TREATMENT_MOCK } from "@/constants/contants";

const STATUS_STYLES = {
  ausente: "absolute w-full h-full top-0 rounded-full bg-dark-100",
  corona:
    "absolute w-full h-full top-0 rounded-full border-[6px] border-blue-600",
  obturacion:
    "absolute w-[10px] h-[10px] top-[calc(50%-5px)]  left-[calc(50%-5px)] rounded-full bg-blue-600",
  cariesOclusal:
    "absolute w-[10px] h-[10px] top-[calc(50%-5px)]  left-[calc(50%-5px)] rounded-full bg-red-600",
  cariesMesial: {
    upper:
      "absolute w-[10px] h-[10px] top-0  left-[calc(50%-5px)] rounded-full bg-red-600",
    lower:
      "absolute w-[10px] h-[10px] bottom-0  left-[calc(50%-5px)] rounded-full bg-red-600",
  },
  cariesDistal: {
    upper:
      "absolute w-[10px] h-[10px] bottom-0  left-[calc(50%-5px)] rounded-full bg-red-600",
    lower:
      "absolute w-[10px] h-[10px] top-0  left-[calc(50%-5px)] rounded-full bg-red-600",
  },
  cariesVestibular: {
    upper:
      "absolute w-[10px] h-[10px] top-[calc(50%-5px)]  left-0 rounded-full bg-red-600",
    lower:
      "absolute w-[10px] h-[10px] top-[calc(50%-5px)]  left-0 rounded-full bg-red-600",
  },

  cariesLingual: {
    upper:
      "absolute w-[10px] h-[10px] top-[calc(50%-5px)] right-0 rounded-full bg-red-600",
    lower:
      "absolute w-[10px] h-[10px] top-[calc(50%-5px)] right-0 rounded-full bg-red-600",
  },
};

const odontogramUpItems = [
  {
    label: "18",
    image: "/images/odontogram/s8.png",
    statusStyles: STATUS_STYLES.ausente,
    styles:
      "absolute w-12 h-10 right-[calc(50%+110px)] top-[210px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "17",
    image: "/images/odontogram/s7.png",
    statusStyles: STATUS_STYLES.corona,
    styles:
      "absolute w-12 h-10 right-[calc(50%+105px)] top-[170px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "16",
    image: "/images/odontogram/s6.png",
    statusStyles: STATUS_STYLES.obturacion,
    styles:
      "absolute w-12 h-10 right-[calc(50%+100px)] top-[130px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "15",
    image: "/images/odontogram/s5.png",
    statusStyles: STATUS_STYLES.cariesOclusal,
    styles:
      "absolute w-11 h-10 right-[calc(50%+95px)] top-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "14",
    image: "/images/odontogram/s4.png",
    statusStyles: STATUS_STYLES.cariesMesial.upper,
    styles:
      "absolute w-11 h-10 right-[calc(50%+85px)] top-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "13",
    image: "/images/odontogram/s3.png",
    statusStyles: STATUS_STYLES.cariesDistal.upper,
    styles:
      "absolute w-10 h-10 right-[calc(50%+65px)] top-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "12",
    image: "/images/odontogram/s2.png",
    statusStyles: STATUS_STYLES.cariesLingual.upper,
    styles:
      "absolute w-10 h-10  right-[calc(50%+35px)] top-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "11",
    image: "/images/odontogram/s1.png",
    statusStyles: STATUS_STYLES.cariesVestibular.upper,
    styles:
      "absolute w-10 h-10 right-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "21",
    image: "/images/odontogram/s1.png",
    statusStyles: STATUS_STYLES.cariesVestibular.upper,
    styles:
      "absolute -scale-x-[1] w-10 h-10 left-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "22",
    image: "/images/odontogram/s2.png",
    statusStyles: STATUS_STYLES.cariesLingual.upper,
    styles:
      "absolute -scale-x-[1] w-10 h-10  left-[calc(50%+35px)] top-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "23",
    image: "/images/odontogram/s3.png",
    statusStyles: STATUS_STYLES.cariesDistal.upper,
    styles:
      "absolute -scale-x-[1] w-10 h-10 left-[calc(50%+65px)] top-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "24",
    image: "/images/odontogram/s4.png",
    statusStyles: STATUS_STYLES.cariesMesial.upper,
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+85px)] top-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "25",
    image: "/images/odontogram/s5.png",
    statusStyles: STATUS_STYLES.cariesOclusal,
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+95px)] top-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "26",
    image: "/images/odontogram/s6.png",
    statusStyles: STATUS_STYLES.obturacion,
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+100px)] top-[130px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "27",
    image: "/images/odontogram/s7.png",
    statusStyles: STATUS_STYLES.corona,
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+105px)] top-[170px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "28",
    image: "/images/odontogram/s8.png",
    statusStyles: STATUS_STYLES.ausente,
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+110px)] top-[210px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
];

const odontogramDownItems = [
  {
    label: "48",
    image: "/images/odontogram/i8.png",
    statusStyles: STATUS_STYLES.ausente,
    styles:
      "absolute w-12 h-10 right-[calc(50%+105px)] bottom-[230px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "47",
    image: "/images/odontogram/i7.png",
    statusStyles: STATUS_STYLES.corona,
    styles:
      "absolute w-12 h-10 right-[calc(50%+100px)] bottom-[185px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "46",
    image: "/images/odontogram/i6.png",
    statusStyles: STATUS_STYLES.obturacion,
    styles:
      "absolute w-12 h-10 right-[calc(50%+95px)] bottom-[140px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "45",
    image: "/images/odontogram/i5.png",
    statusStyles: STATUS_STYLES.cariesOclusal,
    styles:
      "absolute w-11 h-10 right-[calc(50%+90px)] bottom-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "44",
    image: "/images/odontogram/i4.png",
    statusStyles: STATUS_STYLES.cariesMesial.lower,
    styles:
      "absolute w-11 h-10 right-[calc(50%+75px)] bottom-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "43",
    image: "/images/odontogram/i3.png",
    statusStyles: STATUS_STYLES.cariesDistal.lower,
    styles:
      "absolute w-9 h-10 right-[calc(50%+60px)] bottom-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "42",
    image: "/images/odontogram/i2.png",
    statusStyles: STATUS_STYLES.cariesLingual.lower,
    styles:
      "absolute w-9 h-10 right-[calc(50%+35px)] bottom-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "41",
    image: "/images/odontogram/i1.png",
    statusStyles: STATUS_STYLES.cariesVestibular.lower,
    styles:
      "absolute w-8 h-10 right-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "31",
    image: "/images/odontogram/i1.png",
    statusStyles: STATUS_STYLES.cariesVestibular.lower,
    styles:
      "absolute -scale-x-[1] w-8 h-10 left-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "32",
    image: "/images/odontogram/i2.png",
    statusStyles: STATUS_STYLES.cariesLingual.lower,
    styles:
      "absolute -scale-x-[1] w-9 h-10  left-[calc(50%+40px)] bottom-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "33",
    image: "/images/odontogram/i3.png",
    statusStyles: STATUS_STYLES.cariesDistal.lower,
    styles:
      "absolute -scale-x-[1] w-9 h-10 left-[calc(50%+65px)] bottom-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "34",
    image: "/images/odontogram/i4.png",
    statusStyles: STATUS_STYLES.cariesMesial.lower,
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+86px)] bottom-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "35",
    image: "/images/odontogram/i5.png",
    statusStyles: STATUS_STYLES.cariesOclusal,
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+90px)] bottom-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "36",
    image: "/images/odontogram/i6.png",
    statusStyles: STATUS_STYLES.obturacion,
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+95px)] bottom-[140px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "37",
    image: "/images/odontogram/i7.png",
    statusStyles: STATUS_STYLES.corona,
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+100px)] bottom-[185px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "38",
    image: "/images/odontogram/i8.png",
    statusStyles: STATUS_STYLES.ausente,
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+105px)] bottom-[230px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
];

const toothStatus = [
  "Ausente",
  "Corona",
  "Obturación",
  "Caries Mesial",
  "Caries Distal",
  "Caries Vestibular",
  "Caries Lingual",
  "Caries Oclusal",
];

const toothCondition = [
  "Incluido",
  "Erupción",
  "No erupcionado",
  "Extruido",
  "Ectópico",
  "Mesiorotado",
  "mesioangulado",
  "Distalrotado",
  "Telescópico",
  "cruzado",
  "Movilidad",
];

function OdontogramModal({
  label,
  image,
  onClose,
}: {
  label: string;
  image: string;
  onClose: () => void;
}) {
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
        name=''
        id=''
        className='w-full px-3 py-2 rounded-[12px] bg-bgDark-070 text-ctaLight-090 text-h5'>
        <option value=''>Estatus Actual</option>
        {toothStatus.map((status) => (
          <option value={status}>{status}</option>
        ))}
      </select>
      <select
        name=''
        id=''
        className='w-full px-3 py-2 rounded-[12px] bg-bgDark-070 text-ctaLight-090 text-h5'>
        <option value=''>Patologias</option>
        {toothCondition.map((status) => (
          <option value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
}

export default function Odontogram() {
  const [tooth, setTooth] = useState({ label: "", image: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (label: string, image: string) => {
    setTooth({ label, image });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalComponent isOpen={isModalOpen}>
        <OdontogramModal
          label={tooth.label}
          image={tooth.image}
          onClose={closeModal}
        />
      </ModalComponent>
      <section className='pt-6 pb-20 bg-bgDark-080 rounded-[12px]'>
        <h3 className='mb-20 text-h3 text-light-090 text-center capitalize'>
          Odontograma
        </h3>
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
            return (
              <button
                key={item.label + index}
                className={item.styles ?? ""}
                onClick={() => handleOpenModal(item.label, item.image)}>
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
                  />
                  <div className={item.statusStyles ?? "hidden"} />
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
            return (
              <button
                key={item.label + index}
                className={item.styles ?? ""}
                onClick={() => handleOpenModal(item.label, item.image)}>
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
                  />
                  <div className={item.statusStyles ?? "hidden"} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <section className='mt-6 p-6 bg-bgDark-080 rounded-[12px]'>
        <div className='w-full grid gap-[60px]'>
          <TreatmentPendingComponent
            treatments={TREATMENT_MOCK}
            title='Padecimientos'
          />
        </div>
      </section>
      <div className='mt-[60px] h-[60px]'>
        <ButtonComponent
          label='Siguiente'
          variant='primary'
          widthfull
          anchor
          anchorUrl='/patients/2/diagnostic'
        />
      </div>
    </>
  );
}
