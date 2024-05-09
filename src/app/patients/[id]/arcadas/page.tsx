import { ButtonComponent } from "@/components";

export default function ArcadasValoration() {
  return (
    <form action='' className='grid gap-[60px] w-full '>
      <section className='w-full px-3 pt-6 pb-[60px] bg-bgDark-080 rounded-[12px] shadow'>
        <h3 className='mb-6 text-h3 text-light-090 text-center capitalize'>
          Arcadas
        </h3>

        <div className='px-6 grid grid-cols-6 gap-3'>
          <input
            placeholder='1.3'
            className='h-8 mt-8 text-center'
            type='text'
          />
          <input placeholder='1.2' className='h-8 text-center' type='text' />
          <input placeholder='1.1' className='h-8 text-center' type='text' />
          <input placeholder='2.1' className='h-8 text-center' type='text' />
          <input placeholder='2.2' className='h-8 text-center' type='text' />
          <input
            placeholder='2.3'
            className='h-8 mt-8 text-center'
            type='text'
          />
        </div>
        <div className='flex flex-col items-center gap-3'>
          <input
            placeholder='dist 1 a 1'
            className='h-8 w-20 text-center'
            type='text'
          />
          <input
            placeholder='dist 4 a 4'
            className='h-8 w-20 text-center'
            type='text'
          />
          <input
            placeholder='dist 6 a 6'
            className='h-8 w-20 text-center'
            type='text'
          />
        </div>

        <div className='mt-24 flex flex-col items-center gap-3'>
          <input
            placeholder='dist 6 a 6'
            className='h-8 w-20 text-center'
            type='text'
          />
          <input
            placeholder='dist 3 a 3'
            className='h-8 w-20 text-center'
            type='text'
          />
        </div>
        <div className='px-6 grid grid-cols-6 gap-3'>
          <input placeholder='4.3' className='h-8 text-center' type='text' />
          <input
            placeholder='4.2'
            className='mt-8 h-8 text-center'
            type='text'
          />
          <input
            placeholder='4.1'
            className='mt-8 h-8 text-center'
            type='text'
          />
          <input
            placeholder='3.1'
            className='mt-8 h-8 text-center'
            type='text'
          />
          <input
            placeholder='3.2'
            className='mt-8 h-8 text-center'
            type='text'
          />
          <input placeholder='3.3' className='h-8 text-center' type='text' />
        </div>
      </section>
      {/* <div className='mt-[60px] h-[60px]'>
        <ButtonComponent label='Guardar' variant='primary' widthfull />
      </div> */}
      <div className='h-[60px]'>
        <ButtonComponent
          label='Siguiente'
          variant='primary'
          widthfull
          anchor
          anchorUrl='/patients/2/arcadas'
        />
      </div>
    </form>
  );
}
