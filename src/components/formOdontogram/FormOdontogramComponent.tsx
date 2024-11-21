"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { string, z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonComponent, IconsComponent, ModalComponent } from "@/components";
import {
  IOdontogram,
  ToothState,
  ToothName,
  ITooth,
  ToothPathology,
  ToothLabel,
} from "@/interfaces";
import OdontogramModal from "./OdontogramModal";
import { STATUS_STYLES_ODONTOGRAM } from "@/constants/odontogram.constants";

import { updatePatient } from "@/lib/actions/actions";

const ToothStateEnum = z.enum([
  "ausente",
  "corona",
  "obturación",
  "cariesMesial",
  "cariesDistal",
  "cariesVestibular",
  "cariesLingual",
  "cariesOclusal",
  "",
]);

const ToothPathologyEnum = z.enum([
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
  "",
]);

const ToothNameEnum = z.enum([
  "d11",
  "d12",
  "d13",
  "d14",
  "d15",
  "d16",
  "d17",
  "d18",
  "d21",
  "d22",
  "d23",
  "d24",
  "d25",
  "d26",
  "d27",
  "d28",
  "d31",
  "d32",
  "d33",
  "d34",
  "d35",
  "d36",
  "d37",
  "d38",
  "d41",
  "d42",
  "d43",
  "d44",
  "d45",
  "d46",
  "d47",
  "d48",
  "",
]);

const ToothItem = z.object({
  name: ToothNameEnum.optional(),
  state: ToothStateEnum.optional(),
  pathology: ToothPathologyEnum.optional(),
});

type FormData = {
  d11?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d12?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d13?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d14?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d15?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d16?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d17?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d18?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d21?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d22?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d23?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d24?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d25?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d26?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d27?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d28?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d31?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d32?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d33?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d34?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d35?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d36?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d37?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d38?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d41?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d42?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d43?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d44?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d45?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d46?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d47?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d48?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  generalPathology: { pathology?: string }[];
  comments?: string;
};

const FormSchema: ZodType<FormData> = z.object({
  generalPathology: z.array(
    z.object({
      pathology: string().optional(),
    })
  ),
  comments: z.string().optional(),
  d11: ToothItem.optional(),
  d12: ToothItem.optional(),
  d13: ToothItem.optional(),
  d14: ToothItem.optional(),
  d15: ToothItem.optional(),
  d16: ToothItem.optional(),
  d17: ToothItem.optional(),
  d18: ToothItem.optional(),
  d21: ToothItem.optional(),
  d22: ToothItem.optional(),
  d23: ToothItem.optional(),
  d24: ToothItem.optional(),
  d25: ToothItem.optional(),
  d26: ToothItem.optional(),
  d27: ToothItem.optional(),
  d28: ToothItem.optional(),
  d31: ToothItem.optional(),
  d32: ToothItem.optional(),
  d33: ToothItem.optional(),
  d34: ToothItem.optional(),
  d35: ToothItem.optional(),
  d36: ToothItem.optional(),
  d37: ToothItem.optional(),
  d38: ToothItem.optional(),
  d41: ToothItem.optional(),
  d42: ToothItem.optional(),
  d43: ToothItem.optional(),
  d44: ToothItem.optional(),
  d45: ToothItem.optional(),
  d46: ToothItem.optional(),
  d47: ToothItem.optional(),
  d48: ToothItem.optional(),
});

export default function FormOdontogramComponent({
  patientId,
  currentValoration,
}: {
  patientId: string;
  currentValoration: IOdontogram;
}) {
  const [tooth, setTooth] = useState({ label: "", image: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [pathologies, setPathologies] = useState<string[]>([]);

  const handleOpenModal = (label: string, image: string) => {
    setTooth({ label, image });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...currentValoration,
    },
  });

  const {
    fields: fieldsP,
    append: appendP,
    remove: removeP,
  } = useFieldArray({
    control,
    name: "generalPathology",
  });

  const onSubmit = async (data: FormData) => {
    const createdAt =
      currentValoration.createdAt === "" ||
      currentValoration.createdAt === undefined
        ? new Date().toISOString().split("T")[0]
        : currentValoration.createdAt;
    const updatedAt = new Date().toISOString().split("T")[0];
    const dataUpdated = { ...data, createdAt, updatedAt };

    const payload = { valorationOdotontogram: dataUpdated };

    try {
      const user = await updatePatient(payload, patientId);
      setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "Ocucrrio un error, voler a intentar",
      });
    }
  };

  const odontogramUpItems = [
    {
      label: "18",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs8.png?alt=media&token=ab0929dc-0a6f-4908-99bb-93c1982fe6ab",
      styles:
        "absolute w-12 h-10 right-[calc(50%+110px)] top-[210px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "17",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs7.png?alt=media&token=f703f2b2-00fd-4d65-9723-f2ce972d02b7",
      styles:
        "absolute w-12 h-10 right-[calc(50%+105px)] top-[170px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "16",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs6.png?alt=media&token=0779c86f-7903-415e-bc05-b4499001b324",
      styles:
        "absolute w-12 h-10 right-[calc(50%+100px)] top-[130px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "15",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs5.png?alt=media&token=90fbd00d-13bf-4096-a828-1cebf300f773",
      styles:
        "absolute w-11 h-10 right-[calc(50%+95px)] top-[95px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "14",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs4.png?alt=media&token=441b8ead-c53f-4272-9089-f65b110a5cb2",
      styles:
        "absolute w-11 h-10 right-[calc(50%+85px)] top-[60px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "13",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs3.png?alt=media&token=e5696b15-64dd-48c1-bf55-16f782d75e58",
      styles:
        "absolute w-10 h-10 right-[calc(50%+65px)] top-[30px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "12",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs2.png?alt=media&token=b837b188-4af8-4c82-b140-a7dfa494fa2b",
      styles:
        "absolute w-10 h-10  right-[calc(50%+35px)] top-[10px]   rounded-full  hover:bg-ctaLight",
    },
    {
      label: "11",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs1.png?alt=media&token=771bff08-a4b9-42ad-afb4-b621d608b589",
      styles: "absolute w-10 h-10 right-[50%]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "21",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs1.png?alt=media&token=771bff08-a4b9-42ad-afb4-b621d608b589",
      styles:
        "absolute -scale-x-[1] w-10 h-10 left-[50%]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "22",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs2.png?alt=media&token=b837b188-4af8-4c82-b140-a7dfa494fa2b",
      styles:
        "absolute -scale-x-[1] w-10 h-10  left-[calc(50%+35px)] top-[10px]   rounded-full  hover:bg-ctaLight",
    },
    {
      label: "23",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs3.png?alt=media&token=e5696b15-64dd-48c1-bf55-16f782d75e58",
      styles:
        "absolute -scale-x-[1] w-10 h-10 left-[calc(50%+65px)] top-[30px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "24",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs4.png?alt=media&token=441b8ead-c53f-4272-9089-f65b110a5cb2",
      styles:
        "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+85px)] top-[60px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "25",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs5.png?alt=media&token=90fbd00d-13bf-4096-a828-1cebf300f773",
      styles:
        "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+95px)] top-[95px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "26",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs6.png?alt=media&token=0779c86f-7903-415e-bc05-b4499001b324",
      styles:
        "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+100px)] top-[130px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "27",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs7.png?alt=media&token=f703f2b2-00fd-4d65-9723-f2ce972d02b7",
      styles:
        "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+105px)] top-[170px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "28",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fs8.png?alt=media&token=ab0929dc-0a6f-4908-99bb-93c1982fe6ab",
      styles:
        "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+110px)] top-[210px] rounded-full  hover:bg-ctaLight",
    },
  ];

  const odontogramDownItems = [
    {
      label: "48",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi8.png?alt=media&token=0db5a650-b7af-4675-8944-4564c25ffe39",
      styles:
        "absolute w-12 h-10 right-[calc(50%+105px)] bottom-[230px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "47",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi7.png?alt=media&token=15d201fc-21ab-452c-af53-8f4e5676818d",
      styles:
        "absolute w-12 h-10 right-[calc(50%+100px)] bottom-[185px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "46",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi6.png?alt=media&token=8d4034bc-8ca2-47aa-9bb9-525427507421",
      styles:
        "absolute w-12 h-10 right-[calc(50%+95px)] bottom-[140px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "45",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi5.png?alt=media&token=14886604-8b46-41b0-9148-63ba01e77bb2",
      styles:
        "absolute w-11 h-10 right-[calc(50%+90px)] bottom-[95px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "44",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi4.png?alt=media&token=f710b1ca-dc1a-4d69-b75a-1f508e138665",
      styles:
        "absolute w-11 h-10 right-[calc(50%+75px)] bottom-[60px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "43",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi3.png?alt=media&token=72eb40f7-6ac3-4f14-bedf-3f641e90e2c9",
      styles:
        "absolute w-9 h-10 right-[calc(50%+60px)] bottom-[30px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "42",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi2.png?alt=media&token=42b36c2e-43cf-4f72-8534-2f170c49510d",
      styles:
        "absolute w-9 h-10 right-[calc(50%+35px)] bottom-[10px]   rounded-full  hover:bg-ctaLight",
    },
    {
      label: "41",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi1.png?alt=media&token=92db535c-2f3c-4add-9bfd-c20c5d5f0b59",
      styles: "absolute w-8 h-10 right-[50%]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "31",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi1.png?alt=media&token=92db535c-2f3c-4add-9bfd-c20c5d5f0b59",
      styles:
        "absolute -scale-x-[1] w-8 h-10 left-[50%]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "32",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi2.png?alt=media&token=42b36c2e-43cf-4f72-8534-2f170c49510d",
      styles:
        "absolute -scale-x-[1] w-9 h-10  left-[calc(50%+40px)] bottom-[10px]   rounded-full  hover:bg-ctaLight",
    },
    {
      label: "33",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi3.png?alt=media&token=72eb40f7-6ac3-4f14-bedf-3f641e90e2c9",
      styles:
        "absolute -scale-x-[1] w-9 h-10 left-[calc(50%+65px)] bottom-[30px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "34",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi4.png?alt=media&token=f710b1ca-dc1a-4d69-b75a-1f508e138665",
      styles:
        "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+86px)] bottom-[60px]  rounded-full  hover:bg-ctaLight",
    },
    {
      label: "35",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi5.png?alt=media&token=14886604-8b46-41b0-9148-63ba01e77bb2",
      styles:
        "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+90px)] bottom-[95px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "36",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi6.png?alt=media&token=8d4034bc-8ca2-47aa-9bb9-525427507421",
      styles:
        "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+95px)] bottom-[140px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "37",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi7.png?alt=media&token=15d201fc-21ab-452c-af53-8f4e5676818d",
      styles:
        "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+100px)] bottom-[185px] rounded-full  hover:bg-ctaLight",
    },
    {
      label: "38",
      image:
        "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2Fodontogram%2Fi8.png?alt=media&token=0db5a650-b7af-4675-8944-4564c25ffe39",
      styles:
        "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+105px)] bottom-[230px] rounded-full  hover:bg-ctaLight",
    },
  ];

  return (
    <>
      <ModalComponent isOpen={isModalOpen}>
        <OdontogramModal
          label={tooth.label}
          image={tooth.image}
          onClose={closeModal}
          setInputValue={setValue}
          getInputsValue={getValues}
          register={register}
        />
      </ModalComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
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

              const piecelabel: ToothName = `d${item.label}` as ToothLabel;
              const piece = getValues(piecelabel) as ITooth;
              let statusStyle = "";
              if (piece) {
                const cariesIncluded = piece.state?.includes("caries");
                const cariesOclusal = piece.state?.includes("cariesOclusal");

                if (cariesIncluded && !cariesOclusal) {
                  const position =
                    Number(quadrant) === 1 || Number(quadrant) === 2
                      ? "upper"
                      : "lower";
                  const style = STATUS_STYLES_ODONTOGRAM[piece.state as string];
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
                  type='button'
                  key={item.label + index}
                  className={odontogramUpItems[index].styles ?? ""}
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
                      unoptimized
                    />
                    <div
                      className={odontogramUpItems[index].styles ?? "hidden"}
                    />
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
              const piece = getValues(piecelabel) as ITooth;
              let statusStyle = "";
              if (piece) {
                const cariesIncluded = piece.state?.includes("caries");
                const cariesOclusal = piece.state?.includes("cariesOclusal");

                if (cariesIncluded && !cariesOclusal) {
                  const position =
                    Number(quadrant) === 1 || Number(quadrant) === 2
                      ? "upper"
                      : "lower";
                  const style = STATUS_STYLES_ODONTOGRAM[piece.state as string];
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
                  type='button'
                  key={item.label + index}
                  className={odontogramDownItems[index].styles ?? ""}
                  onClick={() => handleOpenModal(item.label, item.image)}>
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
                    <div
                      className={odontogramDownItems[index].styles ?? "hidden"}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          <div className='w-full px-[10%] mt-20 text-txtBrand-alternative '>
            <h4 className='text-h4 mb-4'>Patologias</h4>
            <ul className='flex flex-col gap-2 text-small'>
              {Object.keys(getValues()).map((key) => {
                if (key.startsWith("d")) {
                  const allValues = getValues() as any;
                  const pathology = allValues[key].pathology;
                  if (pathology && pathology.length > 0) {
                    return <li>{`${key}: ${pathology}`}</li>;
                  }
                }
              })}
            </ul>
          </div>
        </section>
        <section className='mt-6 p-6 bg-bgDark-080 rounded-[12px]'>
          <div className='w-full grid gap-6'>
            <h4 className='text-h4 text-ctaLight-090 text-center'>
              Padecimientos Generales
            </h4>
            <div className='mt-3 grid gap-3'>
              {fieldsP.map((field, index) => (
                <div
                  key={field.id}
                  className='h-12 flex justify-between items-center bg-bgDark-070 text-ctaLight-090'>
                  <input
                    {...register(
                      `generalPathology.${index}.pathology` as const
                    )}
                    placeholder={`Agregar nevo padecimiento`}
                    className='w-full h-full px-3 first-letter:capitalize text-h5 bg-bgDark-070 focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50'
                    onBlur={() => {
                      setValue(
                        `generalPathology.${index}.pathology` as const,
                        getValues(
                          `generalPathology.${index}.pathology` as const
                        )
                      );
                    }}
                  />
                  <button className='px-3' onClick={() => removeP(index)}>
                    <IconsComponent icon='trash' />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-6 flex justify-center'>
            <ButtonComponent
              label='Agregar Padecimiento'
              variant='secondary'
              onClick={() => appendP({ pathology: "" })}
            />
          </div>
          <div className='mt-[60px] w-full flex flex-col gap-3'>
            <label
              className='w-full text-txtBrand-secondary text-center'
              htmlFor='observaciones'>
              Observaciones Generales
            </label>
            <textarea
              className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
              {...register("comments")}
              rows={4}></textarea>
          </div>
        </section>
        {!isSubmitted && (
          <div className='mt-[60px] h-[60px]'>
            <ButtonComponent
              type='submit'
              label='Guardar'
              variant='primary'
              widthfull
            />
          </div>
        )}
        {isSubmitted && (
          <div className='mt-[60px] h-[60px]'>
            <ButtonComponent
              label='Salir'
              variant='primary'
              widthfull
              anchor
              anchorUrl={`/patients/${patientId}`}
            />
          </div>
        )}
      </form>
    </>
  );
}
