import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "@/components/button/ButtonComponent";

const LoginPage = () => {
  return (
    <section className=' bg-gray-50 dark:bg-gray-900 h-screen'>
      <div className='flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0'>
        <a
          href='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Image
            className='w-full h-auto mr-2 sm:max-w-md'
            src='/images/logo-white.png'
            width={400}
            height={100}
            alt='logo'
          />
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Ingresa a tu cuenta
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label className='text-gray-500 dark:text-gray-300'>
                      Recuerdame
                    </label>
                  </div>
                </div>
                <a
                  href='#'
                  className='text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
                  ¿olvidaste el password?
                </a>
              </div>
              <ButtonComponent
                variant='primary'
                label='Ingresar'
                type='submit'
                widthfull
                anchor
                anchorUrl='/patients'
              />

              <p className='text-small font-light text-gray-500 dark:text-gray-400'>
                ¿No tienes cuenta?{" "}
                <Link
                  href='/auth/signup'
                  className=' text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
                  Crear cuenta
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
