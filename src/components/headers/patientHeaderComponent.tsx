import Image from "next/image";

interface IPatientHeaderComponent {
  avatar: string;
  name: string;
  age: number;
  doctorOffice: string;
}

const PatientHeaderComponent = ({
  avatar,
  name,
  age,
  doctorOffice,
}: IPatientHeaderComponent) => {
  const avatarFallback = avatar || "/images/avatar.png";
  return (
    <header className='flex gap-6 p-3 min-h-[120px] bg-bgDark-080 shadow'>
      <div>
        <Image
          className='w-[100px] h-[100px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={40}
          height={40}
          src={avatarFallback}
          alt={name}
          unoptimized
        />
      </div>
      <div className='p-3 flex flex-col flex-grow justify-between text-txtBrand-secondary border border-bgDark-070 rounded-[12px]'>
        <h5 className='text-h5 capitalize'>{name}</h5>
        <h5 className='text-h5'>{age + " años"}</h5>
        <h5 className='text-h5 capitalize'>{doctorOffice}</h5>
      </div>
    </header>
  );
};

export default PatientHeaderComponent;
