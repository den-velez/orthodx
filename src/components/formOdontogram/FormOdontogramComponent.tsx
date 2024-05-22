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
} from "@/interfaces";
import OdontogramModal from "./OdontogramModal";

import { updatePatient } from "@/lib/actions/actions";

const STATUS_STYLES: {
  [key: string]: string | { upper: string; lower: string };
} = {
  ausente: "absolute w-full h-full top-0 rounded-full bg-dark-100",
  corona:
    "absolute w-full h-full top-0 rounded-full border-[6px] border-blue-600",
  obturación:
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
    styles:
      "absolute w-12 h-10 right-[calc(50%+110px)] top-[210px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "17",
    image: "/images/odontogram/s7.png",
    styles:
      "absolute w-12 h-10 right-[calc(50%+105px)] top-[170px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "16",
    image: "/images/odontogram/s6.png",
    styles:
      "absolute w-12 h-10 right-[calc(50%+100px)] top-[130px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "15",
    image: "/images/odontogram/s5.png",
    styles:
      "absolute w-11 h-10 right-[calc(50%+95px)] top-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "14",
    image: "/images/odontogram/s4.png",
    styles:
      "absolute w-11 h-10 right-[calc(50%+85px)] top-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "13",
    image: "/images/odontogram/s3.png",
    styles:
      "absolute w-10 h-10 right-[calc(50%+65px)] top-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "12",
    image: "/images/odontogram/s2.png",
    styles:
      "absolute w-10 h-10  right-[calc(50%+35px)] top-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "11",
    image: "/images/odontogram/s1.png",
    styles:
      "absolute w-10 h-10 right-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "21",
    image: "/images/odontogram/s1.png",
    styles:
      "absolute -scale-x-[1] w-10 h-10 left-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "22",
    image: "/images/odontogram/s2.png",
    styles:
      "absolute -scale-x-[1] w-10 h-10  left-[calc(50%+35px)] top-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "23",
    image: "/images/odontogram/s3.png",
    styles:
      "absolute -scale-x-[1] w-10 h-10 left-[calc(50%+65px)] top-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "24",
    image: "/images/odontogram/s4.png",
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+85px)] top-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "25",
    image: "/images/odontogram/s5.png",
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+95px)] top-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "26",
    image: "/images/odontogram/s6.png",
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+100px)] top-[130px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "27",
    image: "/images/odontogram/s7.png",
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+105px)] top-[170px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "28",
    image: "/images/odontogram/s8.png",
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+110px)] top-[210px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
];

const odontogramDownItems = [
  {
    label: "48",
    image: "/images/odontogram/i8.png",
    styles:
      "absolute w-12 h-10 right-[calc(50%+105px)] bottom-[230px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "47",
    image: "/images/odontogram/i7.png",
    styles:
      "absolute w-12 h-10 right-[calc(50%+100px)] bottom-[185px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "46",
    image: "/images/odontogram/i6.png",
    styles:
      "absolute w-12 h-10 right-[calc(50%+95px)] bottom-[140px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "45",
    image: "/images/odontogram/i5.png",
    styles:
      "absolute w-11 h-10 right-[calc(50%+90px)] bottom-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "44",
    image: "/images/odontogram/i4.png",
    styles:
      "absolute w-11 h-10 right-[calc(50%+75px)] bottom-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "43",
    image: "/images/odontogram/i3.png",
    styles:
      "absolute w-9 h-10 right-[calc(50%+60px)] bottom-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "42",
    image: "/images/odontogram/i2.png",
    styles:
      "absolute w-9 h-10 right-[calc(50%+35px)] bottom-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "41",
    image: "/images/odontogram/i1.png",
    styles:
      "absolute w-8 h-10 right-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "31",
    image: "/images/odontogram/i1.png",
    styles:
      "absolute -scale-x-[1] w-8 h-10 left-[50%]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "32",
    image: "/images/odontogram/i2.png",
    styles:
      "absolute -scale-x-[1] w-9 h-10  left-[calc(50%+40px)] bottom-[10px]   rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "33",
    image: "/images/odontogram/i3.png",
    styles:
      "absolute -scale-x-[1] w-9 h-10 left-[calc(50%+65px)] bottom-[30px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "34",
    image: "/images/odontogram/i4.png",
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+86px)] bottom-[60px]  rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "35",
    image: "/images/odontogram/i5.png",
    styles:
      "absolute -scale-x-[1] w-11 h-10 left-[calc(50%+90px)] bottom-[95px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "36",
    image: "/images/odontogram/i6.png",
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+95px)] bottom-[140px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "37",
    image: "/images/odontogram/i7.png",
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+100px)] bottom-[185px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
  {
    label: "38",
    image: "/images/odontogram/i8.png",
    styles:
      "absolute -scale-x-[1] w-12 h-10 left-[calc(50%+105px)] bottom-[230px] rounded-full hover:border hover:border-cta-100 hover:border-4",
  },
];

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

type ToothLabel = Exclude<ToothName, "">;

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

      console.log(user);
      setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "Ocucrrio un error, voler a intentar",
      });
    }
  };

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
                  const position = Number(quadrant) >= 2 ? "upper" : "lower";
                  const style = STATUS_STYLES[piece.state as string];
                  if (typeof style === "object") {
                    statusStyle = style[position] || "";
                  }
                } else {
                  statusStyle = piece.state
                    ? (STATUS_STYLES[piece.state] as string)
                    : "";
                }
              }
              return (
                <button
                  type='button'
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
              const piece = getValues(piecelabel) as ITooth;
              let statusStyle = "";
              if (piece) {
                const cariesIncluded = piece.state?.includes("caries");
                const cariesOclusal = piece.state?.includes("cariesOclusal");

                if (cariesIncluded && !cariesOclusal) {
                  const position = Number(quadrant) >= 2 ? "upper" : "lower";
                  const style = STATUS_STYLES[piece.state as string];
                  if (typeof style === "object") {
                    statusStyle = style[position] || "";
                  }
                } else {
                  statusStyle = piece.state
                    ? (STATUS_STYLES[piece.state] as string)
                    : "";
                }
              }

              return (
                <button
                  type='button'
                  key={item.label + index}
                  className={item.styles ?? ""}
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
                    />
                    <div className={statusStyle ?? "hidden"} />
                  </div>
                </button>
              );
            })}
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
              label='Ir a Diagnostico'
              variant='primary'
              widthfull
              anchor
              anchorUrl={`/patients/${patientId}/diagnostic`}
            />
          </div>
        )}
      </form>
    </>
  );
}
