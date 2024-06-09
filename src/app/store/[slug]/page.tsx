import Image from "next/image";
import { cookies } from "next/headers";
import { ButtonComponent, PurchaseComponent } from "@/components";
import { DRAW_DESCRIPTION, DX_DESCRIPTION } from "@/constants/constants";

import { getDocById, getDoctorIdByEmail } from "@/lib/actions/actions";
import { IProduct } from "@/interfaces";

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const doctorId = await getDoctorIdByEmail();

  const product = (await getDocById(slug, "products")) as IProduct;

  const creditsLabel = product.credits === 1 ? "credito" : "creditos";
  const productWithId = { ...product, id: slug };

  return (
    <main className='min-h-screen px-3 pt-3 pb-[60px] bg-bgDark-090'>
      <div className='flex justify-center'>
        <Image
          className='w-full h-auto mr-2 sm:max-w-md'
          src='/images/logo-white.png'
          width={400}
          height={100}
          alt='logo'
        />
      </div>
      <PurchaseComponent
        product={productWithId}
        creditsLabel={creditsLabel}
        doctorId={doctorId?.doctorId ?? undefined}
      />
      <div className='my-[60px] flex flex-col gap-6 items-center text-h5 text-txtDark-090'>
        <h2 className='text-h4'>¿Como puedo utilizar mis creditos?</h2>
        <p>{DX_DESCRIPTION}</p>
        <p>{DRAW_DESCRIPTION}</p>
      </div>
      <div className='w-full h-[60px] flex justify-center'>
        <ButtonComponent
          variant='secondary'
          label='Todos los productos'
          widthfull
          anchor
          anchorUrl='/store'
        />
      </div>
    </main>
  );
}
