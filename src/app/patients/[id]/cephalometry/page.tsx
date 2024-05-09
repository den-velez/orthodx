import { ButtonComponent } from "@/components";
import { CEPHALOMETRY_ITEMS } from "@/constants/contants";
import { TCephalometryItem } from "@/interfaces/valorations.interface";

function CephalometryItem({
  label,
  rangeLabel,
  rangeMin,
  rangeMax,
}: TCephalometryItem) {
  return (
    <div className='flex gap-3 text-small sm:text-body'>
      <div
        className='flex justify-between px-3 py-2 flex-grow bg-bgDark-070 text-txtBrand-secondary
      '>
        <span>{label}</span>
        {rangeLabel && <span>{rangeLabel}</span>}
        {!rangeLabel && (
          <div className='flex gap-2'>
            <span className='px-1 sm:px-3 border border-bgDark-080'>
              {rangeMin}
            </span>
            <span className='px-1 sm:px-3 border border-bgDark-080'>
              {rangeMax}
            </span>
          </div>
        )}
      </div>
      <div className='w-[20%] flex gap-3 justify-between'>
        <div className='w-2 h-full bg-txtBrand-primary'></div>
        <input
          type='text'
          className='bg-light-100 w-full text-center text-h5'
        />
      </div>
    </div>
  );
}

export default function Cephalometry() {
  return (
    <>
      <div className='px-3 pt-6 pb-[60px] bg-bgDark-080 shadow rounded-[12px]'>
        <h3 className='text-h4 text-txtLight-100 text-center'>
          Analisis Radiograficos
        </h3>
        <h4 className='my-3 text-h4 text-txtBrand-secondary text-center'>
          Cefalometría
        </h4>
        <form action='' className=' grid gap-3'>
          <p></p>
          {CEPHALOMETRY_ITEMS.map((item, index) => (
            <CephalometryItem key={index} {...item} />
          ))}

          <div className='mt-3 w-full flex flex-col gap-3'>
            <label
              className='w-full text-txtBrand-secondary text-center'
              htmlFor='observaciones'>
              Observaciones De Radiografia Panoramica
            </label>
            <textarea
              className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
              name='observaciones'
              id=''
              rows={6}></textarea>
          </div>
        </form>
      </div>
      {/* <div className='mt-[60px] h-[60px]'>
        <ButtonComponent label='Guardar' variant='primary' widthfull />
      </div> */}
      <div className='mt-[60px] h-[60px]'>
        <ButtonComponent
          label='Siguiente'
          variant='primary'
          widthfull
          anchor
          anchorUrl='/patients/2/dental'
        />
      </div>
    </>
  );
}
