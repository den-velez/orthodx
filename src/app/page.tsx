import Image from "next/image";
import Link from "next/link";
import CardContainer from "@/containers/card/CardContainer";
import ButtonComponent from "@/components/button/ButtonComponent";
import { LOGO_ORTHODX_WHITE } from "@/constants/constants";

const HomePage = () => {
  return (
    <main className='w-full min-h-screen px-3 pt-6 pb-[60px] flex flex-col gap-6 dark:bg-gray-900 '>
      <CardContainer>
        <div className='flex justify-center p-3'>
          <Image
            className='w-full h-auto'
            src={LOGO_ORTHODX_WHITE}
            width={400}
            height={100}
            alt='logo'
            unoptimized
          />
        </div>
        <h2 className='text-h2 text-txtLight-100 text-center'>
          Bienvenido a tu consultorio digital
        </h2>
      </CardContainer>
      <CardContainer>
        <h4 className='flex justify-center gap-3 text-h5 text-txtLight-100 text-center'>
          <span>Ya tienes cuenta?</span>
          <Link
            href='/auth/login'
            className='text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
            Ingresar
          </Link>
        </h4>
      </CardContainer>
      <div className='grid grid-cols-2 gap-3 min-h-32'>
        <CardContainer styles='flex items-center'>
          <h5 className='text-h5 text-txtLight-100 text-center'>
            Podrás hacer trazados, registrar tus avances
          </h5>
        </CardContainer>
        <CardContainer styles='flex items-center'>
          <h5 className='text-h5 text-txtLight-100 text-center'>
            Subir y guardar fotos de cada paciente
          </h5>
        </CardContainer>
      </div>
      <div className='w-full h-[60px] flex justify-center'>
        <ButtonComponent
          variant='secondary'
          label='OrthoDx Store'
          widthfull
          anchor
          anchorUrl='/store'
        />
      </div>
      <div className='w-full h-[96px] flex justify-center'>
        <ButtonComponent
          variant='primary'
          label='Crear Cuenta'
          widthfull
          anchor
          anchorUrl='/auth/signup'
        />
      </div>
      <br />
      <CardContainer>
        <div className='flex flex-col justify-center gap-3 text-h5 text-txtLight-100'>
          <p className='text-body'>
            Nuestra version anterior estara vigente por algunos meses
          </p>
          <div className='flex flex-wrap items-center gap-4 text-center'>
            <p className='text-body'>Para acceder usa este link</p>
            <Link
              href='https://denprueba001.firebaseapp.com/'
              target='_blank'
              className='text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
              Version Anterior
            </Link>
          </div>
        </div>
      </CardContainer>
    </main>
  );
};

export default HomePage;
