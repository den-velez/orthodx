import Image from "next/image";
import CardContainer from "@/containers/card/CardContainer";
import ButtonComponent from "@/components/button/ButtonComponent";
import {
  PRODUCT_MOCK,
  DRAW_DESCRIPTION,
  DX_DESCRIPTION,
} from "@/constants/contants";

const Product = ({ params }: { params: { slug: string } }) => {
  const slug = parseInt(params.slug, 10);
  const [product] = PRODUCT_MOCK.filter((product) => product.id === slug);
  return (
    <main className='h-screen px-3 pt-3 pb-[60px] bg-bgDark-090'>
      <div className='flex justify-center'>
        <Image
          className='w-full h-auto mr-2 sm:max-w-md'
          src='/images/logo-white.png'
          width={400}
          height={100}
          alt='logo'
        />
      </div>
      <CardContainer styles='mt-[60px] flex flex-col gap-[60px] text-txtLight-100 items-center'>
        <h1 className='text-h1'>{product.title}</h1>
        <div className='flex flex-col gap-6 items-center text-h5'>
          <h5>{DX_DESCRIPTION}</h5>
          <h5>{DRAW_DESCRIPTION}</h5>
        </div>
        <h1 className='text-h1'>
          <span>{`$ `}</span>
          <span>{product.price}</span>
        </h1>
        <div className='w-full h-24'>
          <ButtonComponent
            label='comprar'
            variant='primary'
            widthfull
            anchor
            anchorUrl='/store'
          />
        </div>
      </CardContainer>
    </main>
  );
};

export default Product;
