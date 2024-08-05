"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ButtonComponent } from "@/components";
import CardContainer from "@/containers/card/CardContainer";
import { INewPurchase, IProduct } from "@/interfaces";
import { paymentCheckout, getDoctorEmailbyCookie } from "@/lib/actions/actions";

export default function PurchaseComponent({ product }: { product: IProduct }) {
  const router = useRouter();
  const [doctorEmail, setDoctorEmail] = useState<string | null>(null);
  const creditsLabel = product.credits > 1 ? "creditos" : "credito";

  const purchase: INewPurchase = {
    doctorEmail: doctorEmail ?? "",
    productId: product.id,
    amount: product.price,
    priceID: product.priceID,
    paymentMethod: "stripe",
    onePayment: product.justOnePayment,
  };

  const buyProduct = async (purchase: INewPurchase) => {
    try {
      const getCheckoutUrl = await paymentCheckout(
        purchase,
        purchase.onePayment
      );

      window.open(getCheckoutUrl, "_blank");
      // router.push(getCheckoutUrl);
    } catch (error) {
      alert("Error al realizar la compra");
    }
  };

  useEffect(() => {
    const getDoctorId = async () => {
      const doctorRaw = Cookies.get("userID");
      if (!doctorRaw) return;

      const doctorEmail = await getDoctorEmailbyCookie(doctorRaw);
      setDoctorEmail(doctorEmail);
    };
    getDoctorId();
  }, []);

  if (!doctorEmail) {
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
      <CardContainer styles='mt-[60px] flex flex-col gap-[60px] text-txtLight-100 items-center'>
        <h1 className='text-h1 capitalize text-center'>{product.name}</h1>
        <div>
          <div>
            <p className='text-h1 text-center'>{`$ ${new Intl.NumberFormat(
              "mx-MX"
            ).format(product.price)}`}</p>
          </div>
          <div>
            <p className='mt-2 text-h4 text-center'>{`Incluye ${product.credits} ${creditsLabel}`}</p>
          </div>
        </div>
        <div className='w-full h-20'>
          <ButtonComponent
            label={product.justOnePayment ? "Comprar" : "Suscribirme"}
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
