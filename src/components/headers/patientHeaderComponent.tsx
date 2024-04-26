import Image from "next/image";

const PatientHeaderComponent = () => {
  const avatar = "https://i.pravatar.cc/150?u=fake@pravatar.com";
  const patientName = "Dr. John Doe";
  const patientAge = 100;
  const doctorOffice = "Ortho & lab";

  return (
    <header className='flex gap-6 p-3 min-h-[120px] bg-bgDark-080 shadow'>
      <div>
        <Image
          className='w-[100px] h-[100px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={40}
          height={40}
          src={avatar}
          alt={patientName}
        />
      </div>
      <div className='p-3 flex flex-col flex-grow justify-between text-txtBrand-secondary border border-bgDark-070 rounded-[12px]'>
        <h5 className='text-h5'>{patientName}</h5>
        <h5 className='text-h5'>{patientAge + " años"}</h5>
        <h5 className='text-h5'>{doctorOffice}</h5>
      </div>
    </header>
  );
};

export default PatientHeaderComponent;
