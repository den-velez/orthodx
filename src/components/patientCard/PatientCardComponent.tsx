import Image from "next/image";

type PatientCardComponentProps = {
  avatar: string;
  name: string;
  type: "fav" | "regular";
};

export default function PatientCardComponent({
  avatar,
  name,
  type = "regular",
}: PatientCardComponentProps) {
  if (type === "fav") {
    return (
      <div className='p-3 flex flex-col items-center justify-between gap-3 bg-bgDark-070 rounded-[12px]'>
        <Image
          className='w-[48px] h-[48px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={48}
          height={48}
          src={avatar}
          alt={name}
        />
        <p className='text-txtLight-100'>{name}</p>
      </div>
    );
  } else {
    return (
      <div className='px-3 py-2 flex items-center justify-between bg-bgDark-070 rounded-[12px]'>
        <p className='text-txtLight-100 text-h5'>{name}</p>
        <Image
          className='w-[48px] h-[48px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={48}
          height={48}
          src={avatar}
          alt={name}
        />
      </div>
    );
  }
}
