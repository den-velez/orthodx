import Image from "next/image";
import Link from "next/link";
import CardContainer from "@/containers/card/CardContainer";
import ProductCardComponent from "@/components/productCard/productCardComponent";
import { PRODUCT_MOCK } from "@/constants/contants";

const StorePage = () => {
  return (
    <main className='h-screen px-3 pt-6 pb-[60px] bg-bgDark-090'>
      <CardContainer>
        <Link href='/' className='flex justify-center p-3'>
          <Image
            className='w-full h-auto'
            src='/images/logo-white.png'
            width={400}
            height={100}
            alt='logo'
          />
        </Link>
        <h2 className='text-h1 text-txtLight-100 text-center'>Store</h2>
      </CardContainer>
      <section className='mt-[60px] flex flex-col gap-3'>
        {PRODUCT_MOCK.map((product) => (
          <ProductCardComponent
            title={product.title}
            price={product.price}
            id={product.id}
          />
        ))}
      </section>
    </main>
  );
};

export default StorePage;
