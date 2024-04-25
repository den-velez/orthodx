import Link from "next/link";

const HomePage = () => {
  return (
    <section className='py-40 min-h-screen bg-white dark:bg-gray-900'>
      <div className='text-white flex flex-col gap-10 items-center'>
        <h1 className='text-h1'>
          <Link href='/auth/login'> Ingresar</Link>
        </h1>
        <h1 className='text-h1'>
          <Link href='/auth/signup'> Crear cuenta</Link>
        </h1>
      </div>
    </section>
  );
};

export default HomePage;
