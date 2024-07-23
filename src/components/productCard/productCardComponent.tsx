import CardContainer from "@/containers/card/CardContainer";
import { ButtonComponent } from "@/components";

interface IProductCardComponentProps {
  id: string;
  name: string;
  description?: string;
  price?: number;
}

const ProductCardComponent = (props: IProductCardComponentProps) => {
  return (
    <CardContainer styles='py-6 px-6 min-h-60 flex flex-col justify-between'>
      <div className='mb-6 flex-grow flex flex-col justify-center gap-3'>
        <h3 className='text-h3 text-txtLight-100 text-center first-letter:uppercase'>
          {props.name}
        </h3>
        {props.description && (
          <p className='mt-3 text-h5 text-txtLight-100 text-center'>
            <span>{props.description}</span>
          </p>
        )}
        {props.price && (
          <p className='text-h2 text-txtLight-100 text-center'>
            <span>{"$ "}</span>
            <span>{props.price}</span>
          </p>
        )}
      </div>
      <div className='w-full h-[60px] flex justify-center'>
        <ButtonComponent
          label='Comprar'
          variant='primary'
          widthfull
          anchor
          anchorUrl={"/store/" + props.id}
        />
      </div>
    </CardContainer>
  );
};

export default ProductCardComponent;
