import { CardContainer } from "@/containers";
import { ButtonComponent } from "@/components";

export default function DentalSize() {
  const labels = {
    title: "Tamaño Dentario",
  };

  const patientMeasures = {
    upper: [7, 8, 9, 9, 8, 7],
    lower: [6, 6, 6, 6, 6, 6],
  };

  const updates = {
    upper: [, 6, 1, 1, 6, 6],
    lower: [6, 6, 6, 6, 6, 6],
  };
  const result = {
    upper: [6, 6, 6, 6, 6, 6],
    lower: [6, 6, 6, 6, 6, 6],
  };

  return (
    <div className='grid gap-[60px]'>
      <CardContainer>
        <h3 className='mb-[60px] text-h3 text-center text-txtLight-100'>
          Tamaño Dentario
        </h3>
        <div className='h-[60px] my-[48px] flex gap-6'>
          <ButtonComponent label='Paciente' variant='primary-dark' widthfull />
          <ButtonComponent
            label='Modificado'
            variant='primary-dark'
            widthfull
          />
        </div>
        <div className='flex justify-center items-center  bg-bgDark-070 rounded-t-[12px]'>
          <h3 className='p-2 text-h3 text-txtDark-090'>Paciente</h3>
        </div>
        <div className='p-3 flex items-center justify-between bg-msg-success text-center'>
          <h3 className='p-2 text-h3 '>Proporcional</h3>
          <div>
            <p className='flex items-center justify-between gap-1 capitalize'>
              <span>Suma superior:</span>
              <span className='text-h5'>30</span>
            </p>
            <p className='flex items-center justify-between gap-1 capitalize'>
              <span>Suma inferior:</span>
              <span className='text-h5'>25</span>
            </p>
          </div>
        </div>
        <div className='p-3 flex items-center justify-between bg-msg-error text-center'>
          <h3 className='p-2 text-h3 '>Discrepancia</h3>
          <div>
            <p className='flex items-center justify-between gap-1 capitalize'>
              <span>Suma superior:</span>
              <span className='text-h5'>25</span>
            </p>
            <p className='flex items-center justify-between gap-1 capitalize'>
              <span>Suma inferior:</span>
              <span className='text-h5'>25</span>
            </p>
          </div>
        </div>
        <div className='mt-3 flex flex-col gap-3'>
          <div className='grid grid-cols-6 gap-2 '>
            {patientMeasures.upper.map((measure, index) => (
              <input
                className='p-2 text-center text-h5'
                key={index}
                value={measure}
              />
            ))}
          </div>
          <div className='grid grid-cols-6 gap-2 '>
            {patientMeasures.lower.map((measure, index) => (
              <input
                className='p-2 text-center text-h5'
                key={index}
                value={measure}
              />
            ))}
          </div>
          <div className='h-[60px] my-[48px] flex gap-6'>
            <ButtonComponent
              label='Sugerencias'
              variant='secondary'
              widthfull
            />
          </div>
        </div>
      </CardContainer>
      <div className='h-[60px]'>
        <ButtonComponent label='Guardar' variant='primary' widthfull />
      </div>
    </div>
  );
}
