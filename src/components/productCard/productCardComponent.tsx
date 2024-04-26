import CardContainer from "@/containers/card/CardContainer";
import ButtonComponent from "../button/ButtonComponent";

interface IProductCardComponentProps {
  id: number;
  title: string;
  price: number;
}

const ProductCardComponent = (props: IProductCardComponentProps) => {
  return (
    <CardContainer styles='py-6 px-6  '>
      <div className='mb-6'>
        <h3 className='text-h3 text-txtLight-100 text-center'>{props.title}</h3>
        <p className='text-h3 text-txtLight-100 text-center'>
          <span>{"$ "}</span>
          <span>{props.price}</span>
        </p>
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
