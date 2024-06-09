"use client";

import { useState } from "react";
import { ButtonComponent, ModalComponent } from "@/components";
import CardContainer from "@/containers/card/CardContainer";
import { INewPurchase, IProduct } from "@/interfaces";
import { newPurchase } from "@/lib/actions/actions";

export default function PurchaseComponent({
  product,
  creditsLabel,
  doctorId,
}: {
  product: IProduct;
  creditsLabel: string;
  doctorId?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const buyProduct = async (purchase: INewPurchase) => {
    const response = await newPurchase(purchase);
    if (response) {
      setModalOpen(true);
    } else {
      alert("Error al realizar la compra");
    }
  };

  const purchase = {
    doctorId: doctorId ?? "",
    doctorEmail: doctorId ?? "",
    productId: product.id,
    date: new Date().toISOString().split("T")[0],
    amount: product.price,
    description: product.name,
    paymentMethod: "credit card",
  };

  if (!doctorId || doctorId === "") {
    return (
      <CardContainer styles='mt-[60px] flex flex-col gap-[60px] text-txtLight-100 items-center'>
        <h1 className='text-h3 text-center'>
          Necesitas iniciar sesion para realizar la compra
        </h1>
        <div className='w-full h-20'>
          <ButtonComponent
            label='Iniciar sesion'
            variant='primary'
            widthfull
            anchor
            anchorUrl='/auth/login'
          />
        </div>
      </CardContainer>
    );
  }

  return (
    <>
      <ModalComponent isOpen={modalOpen}>
        <div className='max-w-[300px] min-h-[200px] py-14 flex flex-col gap-10'>
          <h1 className='text-txtLight-100 text-center text-h3 '>
            Tu compra ha sido realizada con exito!
          </h1>

          <div className='h-[60px]'>
            <ButtonComponent
              label='Volver a pacientes'
              variant='primary'
              widthfull
              anchor
              anchorUrl='/patients'
            />
          </div>
        </div>
      </ModalComponent>
      <CardContainer styles='mt-[60px] flex flex-col gap-[60px] text-txtLight-100 items-center'>
        <h1 className='text-h1 capitalize'>{product.name}</h1>
        <div>
          <div>
            <p className='text-h1 text-center'>{`$ ${product.price}`}</p>
          </div>
          <div>
            <p className='mt-2 text-h4 text-center'>{`Incluye ${product.credits} ${creditsLabel}`}</p>
          </div>
        </div>
        <div className='w-full h-20'>
          <ButtonComponent
            label='comprar'
            variant='primary'
            widthfull
            type='button'
            onClick={() => buyProduct(purchase)}
          />
        </div>
      </CardContainer>
    </>
  );
}
