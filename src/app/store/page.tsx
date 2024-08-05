import Image from "next/image";
import Link from "next/link";
import CardContainer from "@/containers/card/CardContainer";
import ProductCardComponent from "@/components/productCard/productCardComponent";
import { ButtonComponent } from "@/components";
import { STORES_CATEGORIES, LOGO_ORTHODX_WHITE } from "@/constants/constants";

export default async function StorePage() {
  return (
    <main className='min-h-screen px-3 pt-6 pb-[60px] bg-bgDark-090'>
      <CardContainer>
        <Link href='/' className='flex justify-center p-3'>
          <Image
            className='w-full h-auto'
            src={LOGO_ORTHODX_WHITE}
            width={400}
            height={100}
            alt='logo'
          />
        </Link>
        <h2 className='text-h1 text-txtLight-100 text-center'>Store</h2>
      </CardContainer>
      <section className='mt-[60px] flex flex-col gap-6'>
        {STORES_CATEGORIES.map((product, index) => (
          <ProductCardComponent
            key={index}
            id={product.category}
            name={product.name}
            description={product.description}
          />
        ))}
        <div className='w-full mt-20 h-[60px] flex justify-center'>
          <ButtonComponent
            variant='secondary'
            label='Regresar'
            widthfull
            anchor
            anchorUrl='/patients'
          />
        </div>
      </section>
    </main>
  );
}
