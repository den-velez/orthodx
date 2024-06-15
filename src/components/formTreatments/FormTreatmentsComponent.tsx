"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IExpansion, ITreatment, TExpansionTreatment } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";
import TreatmentSectionComponent from "./TreatmentSectionComponent";
import { ButtonComponent, IconsComponent } from "@/components";

type FormData = {
  expansionTreatment?: string;
  treatments: ITreatment[];
};

const FormSchema: ZodType<FormData> = z.object({
  expansionTreatment: z.string().optional(),
  treatments: z.array(
    z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      treatment: z.string().min(1),
      priority: z.number(),
      done: z.boolean(),
      finishedAt: z.string(),
    })
  ),
});

export default function FormTreatmentsComponent({
  patientId,
  expansionTurns,
  expansionTreatment,
  treatmentsList,
}: {
  patientId: string;
  expansionTurns: IExpansion;
  expansionTreatment: TExpansionTreatment;
  treatmentsList: ITreatment[];
}) {
  const [isSubmitted, setSubmitted] = useState(true);
  const addTreatmentButtonRef = useRef<HTMLButtonElement>(null);

  const expansion = [
    {
      label: "korhause",
      fieldName: "expansionTreatment",
      turns: expansionTurns.korkhauseTurns,
      selected: expansionTreatment === "korkhause",
    },
    {
      label: "korhause modificado",
      fieldName: "expansionTreatment",
      turns: expansionTurns.korkhauseTurnsMod,
      selected: expansionTreatment === "korkhause mod",
    },
    {
      label: "mordida cruzada",
      fieldName: "expansionTreatment",
      turns: expansionTurns.mordidaCruzadaTurns,
      selected: expansionTreatment === "mordida cruzada",
    },
    {
      label: "apinamiento",
      fieldName: "expansionTreatment",
      turns: expansionTurns.apinamientoTurns,
      selected: expansionTreatment === "apinamiento",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    watch,
    reset,
    setValue,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      expansionTreatment: expansionTreatment,
      treatments: treatmentsList,
    },
  });

  const selectedOption = watch("expansionTreatment");
  const handleCheckboxChange = (value: string) => {
    setValue("expansionTreatment", value === selectedOption ? "" : value);
    setSubmitted(false);
  };

  const {
    fields: treatmentList,
    append: appendPendingTreatment,
    remove: removePendingTreatment,
  } = useFieldArray({
    control,
    name: "treatments",
  });

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (addTreatmentButtonRef.current) {
        addTreatmentButtonRef.current.focus();
      }
    }
    setSubmitted(false);
  };
  const getTodayDate = () => {
    const date = new Date();
    const dateString = date.toISOString().split("T")[0];
    const dateArray = dateString.split("-");
    const dateFix = dateArray.reverse().join("-");
    return dateFix;
  };

  const onSubmit = async (data: FormData) => {
    const payload = {
      expansionTreatment: data.expansionTreatment,
      treatmentList: data.treatments,
    };

    await updatePatient(payload, patientId)
      .then(() => {
        const treatmentsSorted = data.treatments.sort((a, b) => {
          return a.done > b.done ? 1 : -1;
        });

        setValue("treatments", treatmentsSorted);
        reset({
          expansionTreatment: data.expansionTreatment,
          treatments: treatmentsSorted,
        });

        setSubmitted(true);
      })
      .catch((error) => {
        setError("root", {
          message: "Ocucrrio un error, voler a intentar",
        });
      });
  };

  useEffect(() => {
    if (Object.keys(dirtyFields).length > 0) {
      setSubmitted(false);
    }
  }, [dirtyFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
      <TreatmentSectionComponent title='Expansion (giros)'>
        {expansion.map((option, index) => {
          if (option.turns === 0) return;
          return (
            <div key={index} className='flex items-center gap-3 text-h5'>
              <label>
                <Controller
                  name='expansionTreatment'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='checkbox'
                      className='h-8 w-8 min-w-6'
                      value={option.label}
                      checked={field.value === option.label}
                      onChange={() => handleCheckboxChange(option.label)}
                    />
                  )}
                />
              </label>
              <div className='flex items-center justify-between gap-3 sm:gap-6 flex-grow h-full '>
                <span className=' text-txtLight-100 capitalize'>
                  {option.label}
                </span>
                <div className='flex justify-center items-center min-w-[80px] sm:min-w-[100px] h-full px-3 sm:px-6 py-1 text-txtLight-100 text-center border rounded-[6px]'>
                  <span>{option.turns}</span>
                </div>
              </div>
            </div>
          );
        })}
      </TreatmentSectionComponent>
      <TreatmentSectionComponent title='Plan de Tratamiento'>
        {treatmentList.map((item, index) => {
          if (!item.done) {
            return (
              <div key={item.treatment} className='flex items-center gap-3'>
                <div className='px-1 h-full flex items-center bg-bgDark-070 text-ctaLight-090'>
                  <input
                    className='w-7 h-7 '
                    type='checkbox'
                    {...register(`treatments.${index}.done`)}
                    onChange={(e) => {
                      const today = getTodayDate();
                      setValue(`treatments.${index}.updatedAt`, today);
                      setSubmitted(false);
                    }}
                  />
                </div>
                <div className='px-3 py-2 flex flex-grow items-center bg-bgDark-070 text-ctaLight-090'>
                  <input
                    type='text'
                    className='w-full h-full bg-bgDark-070 text-ctaLight-090'
                    placeholder='Tratamiento'
                    onKeyDown={handleKeyDown}
                    {...register(`treatments.${index}.treatment`)}
                  />
                </div>
                <div className='px-1 h-full flex items-center justify-center bg-bgDark-070 text-ctaLight-090 shadow hover:border hover:border-light-090'>
                  <button onClick={() => removePendingTreatment(index)}>
                    <IconsComponent icon='trash' />
                  </button>
                </div>
              </div>
            );
          }
        })}
        {treatmentList.map((item, index) => {
          if (item.done) {
            return (
              <div key={item.treatment} className='flex items-center gap-3'>
                <div className='px-1 h-full flex items-center bg-bgDark-070 text-ctaLight-090'>
                  <input
                    className='w-7 h-7 '
                    type='checkbox'
                    {...register(`treatments.${index}.done`)}
                    onChange={(e) => {
                      const today = getTodayDate();
                      setValue(`treatments.${index}.updatedAt`, today);
                      setSubmitted(false);
                    }}
                  />
                </div>
                <div className='py-2 px-3 flex flex-grow items-center bg-bgDark-070 text-ctaLight-090'>
                  <span>{item.treatment}</span>
                </div>
                <div className='py-2 px-6 flex items-center justify-center bg-bgDark-070 text-ctaLight-090'>
                  <span>{item.updatedAt}</span>
                </div>
              </div>
            );
          }
        })}
        <div className='mt-6 flex justify-center'>
          <ButtonComponent
            ref={addTreatmentButtonRef}
            label='Agregar Tratamiento'
            variant='secondary'
            onClick={() =>
              appendPendingTreatment({
                treatment: "",
                priority: treatmentList.length + 1,
                done: false,
                finishedAt: "",
                createdAt: getTodayDate(),
                updatedAt: getTodayDate(),
              })
            }
          />
        </div>
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
      </TreatmentSectionComponent>
    </form>
  );
}
