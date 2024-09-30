"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IFollowUp } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";
import {
  ButtonComponent,
  IconsComponent,
  ModalComponent,
  TextWithLineBreaksComponent,
} from "@/components";

type FormData = {
  followup: string;
  followupEdit?: string;
};

type FollowupUpdateItem = {
  item: string;
  index: number;
};

const FormSchema: ZodType<FormData> = z.object({
  followup: z.string().min(1, { message: "Campo requerido" }),
  followupEdit: z.string().optional(),
});

export default function FormFollowUpComponent({
  patientId,
  followupList,
}: {
  patientId: string;
  followupList: IFollowUp[];
}) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [followupItem, setFollowupItem] = useState<FollowupUpdateItem>({
    item: "",
    index: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    watch,
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
    return 1 + Math.max(...array.map((f) => f.sort));
  };

  const openModalEdit = (content: string, index: number) => {
    setValue("followupEdit", content);
    setFollowupItem({
      item: content,
      index: index,
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setDeleteStatus(false);
    setFollowupItem({ item: "", index: 0 });
  };

  const confirmDeleteItem = async (index: number) => {
    const newArray = followupList.filter((f, i) => i !== index);
    const payload = {
      followupList: newArray,
    };

    await updatePatient(payload, patientId)
      .then(() => {
        reset();
        setDeleteStatus(false);
        setFollowupItem({ item: "", index: 0 });
        setOpenModal(false);
      })
      .catch((error) => {
        setError("root", {
          message: "Ocucrrio un error, voler a intentar",
        });
      });
  };

  const updateItem = async (index: number) => {
    if (!itemHasUpdate) closeModal();

    const content = watch("followupEdit");

    const newArray = followupList.map((f, i) => {
      if (i === index) {
        return {
          ...f,
          content: content,
          updatedAt: getTodayDate(),
        };
      }
      return f;
    });

    const payload = {
      followupList: newArray,
    };

    await updatePatient(payload, patientId)
      .then(() => {
        reset();
        setDeleteStatus(false);
        setFollowupItem({ item: "", index: 0 });
        setOpenModal(false);
      })
      .catch((error) => {
        setError("root", {
          message: "Ocucrrio un error, voler a intentar",
        });
      });
  };

  const itemHasUpdate = watch("followupEdit") !== followupItem.item;

  const onSubmit = async (data: FormData) => {
    const newItem = {
      content: data.followup,
      createdAt: getTodayDate(),
      updatedAt: getTodayDate(),
      sort: getNewOrderNumber(followupList),
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
      <ModalComponent isOpen={openModal}>
        <div className='w-full'>
          <div className='w-full flex justify-end mb-4'>
            <h3 className='flex-grow text-h4 text-txtDark-090 text-center'>
              Editar Seguimiento
            </h3>
            <button
              className='flex justify-center  items-center w-10 h-10 pb-1 rounded-full border border-txtDark-090 text-h2 text-txtDark-090'
              onClick={() => closeModal()}>
              x
            </button>
          </div>
          <div className='w-full'>
            <textarea
              rows={8}
              className='w-full h-full py-2 px-3 bg-bgDark-070 text-ctaLight-090 rounded-[12px] text-h5'
              placeholder='Agregar Seguimiento'
              {...register("followupEdit")}
            />
            {deleteStatus ? (
              <div className='w-full mt-5 h-[60px]'>
                <ButtonComponent
                  type='button'
                  label='Confirma borrar seguimiento'
                  variant='delete'
                  widthfull
                  onClick={() => confirmDeleteItem(followupItem.index)}
                />
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-6 mt-5'>
                <ButtonComponent
                  type='button'
                  label='Borrar'
                  variant='alternative'
                  onClick={() => setDeleteStatus(true)}
                />
                <ButtonComponent
                  type='button'
                  label='Guardar'
                  variant='primary'
                  onClick={() => updateItem(followupItem.index)}
                />
              </div>
            )}
          </div>
        </div>
      </ModalComponent>
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
            {followupList.map((f, index) => (
              <div
                key={index}
                className='w-full flex justify-between px-3 py-2 bg-bgDark-070 text-ctaLight-090 rounded-[12px]'>
                <div>
                  <p className='text-caption mb-2'>{f.createdAt}</p>
                  <TextWithLineBreaksComponent text={f.content} />
                </div>
                <button onClick={() => openModalEdit(f.content, index)}>
                  <IconsComponent icon='edit' />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
