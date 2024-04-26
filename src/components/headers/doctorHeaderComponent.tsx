import Image from "next/image";

const DoctorHeaderComponent = () => {
  const avatar = "https://i.pravatar.cc/150?u=fake@pravatar.com";
  const name = "Dr. John Doe";
  const credits = 100;
  return (
    <header className='flex justify-between p-3 min-h-24 bg-bgDark-080 shadow'>
      <div className='flex flex-col justify-between text-txtBrand-secondary'>
        <h1 className='text-h4 '>{name}</h1>
        <p className=' '>Creditos Disponibles: {credits}</p>
      </div>
      <div>
        <Image
          className='w-[72px] h-[72px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={40}
          height={40}
          src={avatar}
          alt={name}
        />
      </div>
    </header>
  );
};

export default DoctorHeaderComponent;
