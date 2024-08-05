import Image from "next/image";
import { ButtonComponent, PurchaseComponent } from "@/components";
import {
  DRAW_DESCRIPTION,
  DX_DESCRIPTION,
  LOGO_ORTHODX_WHITE,
} from "@/constants/constants";

import { getAllProducts } from "@/lib/actions/actions";
import { IProduct } from "@/interfaces";

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const allProducts = (await getAllProducts()) as IProduct[];

  const products = allProducts.filter(
    (product: IProduct) => product.category === slug
  );

  const productsSorted = products.sort((a, b) => a.price - b.price);

  return (
    <main className='min-h-screen px-3 pt-3 pb-[60px] bg-bgDark-090'>
      <div className='flex justify-center'>
        <Image
          className='w-full h-auto mr-2 sm:max-w-md'
          src={LOGO_ORTHODX_WHITE}
          width={400}
          height={100}
          alt='logo'
        />
      </div>
      {products.map((product: IProduct) => (
        <PurchaseComponent product={product} />
      ))}
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
