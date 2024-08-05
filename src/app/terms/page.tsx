import { ButtonComponent } from "@/components";
import { terms } from "@/constants/termsAndCondionts";

export default function TermsAndConditonPage() {
  return (
    <main className='py-10 bg-bgDark-090 text-txtBrand-alternative'>
      <h1 className='mb-10 text-h1 text-center'>Terminos y Condiciones</h1>
      <div className='flex flex-col gap-6 px-4'>
        {terms.details.map((item, index) => (
          <div key={index}>
            <h4 className='text-h5 mb-3'>{item.subtitle}</h4>
            {item.content.map((paragraph, index) => (
              <p key={index} className=''>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className='mt-5 text-caption text-center'>
        <span>{`Actualizado el: `}</span>
        <span>{terms.dateUpated}</span>
      </div>
      <div className='mt-10 w-[240px] mx-auto '>
        <ButtonComponent
          variant='secondary'
          label='Volver a inicio'
          type='submit'
          anchor
          anchorUrl='/patients'
        />
      </div>
    </main>
  );
}
