"use client";

import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IFollowUp } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";
import { ButtonComponent, TextWithLineBreaksComponent } from "@/components";

type FormData = {
  followup: string;
};

const FormSchema: ZodType<FormData> = z.object({
  followup: z.string().min(1, { message: "Campo requerido" }),
});

export default function FormFollowUpComponent({
  patientId,
  followupList,
}: {
  patientId: string;
  followupList: IFollowUp[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const getTodayDate = () => {
    const date = new Date();
    const dateString = date.toISOString().split("T")[0];
    const dateArray = dateString.split("-");
    const dateFix = dateArray.reverse().join("-");
    return dateFix;
  };

  const getNewOrderNumber = (array: IFollowUp[]) => {
    if (array.length === 0) {
      return 1;
    }
    return 1 + Math.max(...array.map((f) => f.order));
  };

  const onSubmit = async (data: FormData) => {
    const newItem = {
      content: data.followup,
      createdAt: getTodayDate(),
      updatedAt: getTodayDate(),
      order: getNewOrderNumber(followupList),
    };

    const payload = {
      followupList: [...followupList, newItem],
    };

    await updatePatient(payload, patientId)
      .then(() => {
        reset();
      })
      .catch((error) => {
        setError("root", {
          message: "Ocucrrio un error, voler a intentar",
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
        <div className='px-6 flex flex-col gap-6'>
          <h3 className='text-h3 text-txtLight-100 text-center'>
            Seguimiento Paciente
          </h3>
          <div>
            <textarea
              rows={8}
              className='w-full h-full py-2 px-3 bg-bgDark-070 text-ctaLight-090 rounded-[12px] text-h5'
              placeholder='Agregar Seguimiento'
              {...register("followup")}
            />
            {errors.followup && (
              <p className='text-msg-error'>{errors.followup.message}</p>
            )}
          </div>
          <div className='mt-5 h-[60px] mx-auto w-[280px]'>
            <ButtonComponent
              type='submit'
              label='Guardar'
              variant='primary'
              widthfull
            />
          </div>
        </div>
      </form>
      {followupList.length > 0 && (
        <div className=' w-full px-6'>
          <h3 className='pt-[60px] pb-5 text-h3 text-txtLight-100 text-center'>
            Historial Completo
          </h3>
          <div className='flex flex-col-reverse gap-3'>
            {followupList.map((f) => (
              <div
                key={f.createdAt}
                className='w-full px-3 py-2 bg-bgDark-070 text-ctaLight-090 rounded-[12px]'>
                <p className='text-caption mb-2'>{f.createdAt}</p>
                <TextWithLineBreaksComponent text={f.content} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
