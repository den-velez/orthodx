import Link from "next/link";

const HomePage = () => {
  return (
    <section className='min-h-screen bg-white dark:bg-gray-900'>
      <Link href='/login'> Iniciar Sesion</Link>
      <div className='text-white flex flex-col items-center'>
        <h1 className='text-h1'>header 1 PLpghq</h1>
        <h2 className='text-h2'>header 2</h2>
        <h3 className='text-h3'>header 3</h3>
        <h4 className='text-h4'>header 4</h4>
        <h5 className='text-h5'>header 5</h5>
        <p>body</p>
        <p>small</p>
        <p>caption</p>
      </div>
    </section>
  );
};

export default HomePage;
