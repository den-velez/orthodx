import Image from "next/image";
import Link from "next/link";

type PatientCardComponentProps = {
  id: string | number;
  avatar: string;
  name: string;
  type: "fav" | "regular";
};

export default function PatientCardComponent({
  id,
  avatar = "/images/avatar.png",
  name,
  type = "regular",
}: PatientCardComponentProps) {
  if (type === "fav") {
    return (
      <Link
        href={`/patients/${id}`}
        className='p-3 flex flex-col items-center justify-between gap-3 bg-bgDark-070 rounded-[12px] border border-bgDark-090 shadow hover:border-light-090'>
        <Image
          className='w-[48px] h-[48px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={48}
          height={48}
          src={avatar}
          alt={name}
        />
        <p className='text-txtLight-100'>{name}</p>
      </Link>
    );
  } else {
    return (
      <Link
        href={`/patients/${id}`}
        className='px-3 py-2 flex items-center justify-between bg-bgDark-070 rounded-[12px] border border-bgDark-090 shadow hover:border-light-090'>
        <p className='text-txtLight-100 text-h5 capitalize'>{name}</p>
        <Image
          className='w-[48px] h-[48px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={48}
          height={48}
          src={avatar}
          alt={name}
        />
      </Link>
    );
  }
}
