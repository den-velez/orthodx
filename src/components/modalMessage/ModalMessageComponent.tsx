import Image from "next/image";

export default function ModalMessageComponent({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const successImg = "/images/success.png";
  const errorImg = "/images/error.png";

  return (
    <div className='p-6 flex flex-col items-center justify-center gap-6 bg-txtBrand-secondary rounded-[12px] shadow-inner'>
      <div>
        <Image
          src={type === "success" ? successImg : errorImg}
          alt={type === "success" ? "success image" : "error image"}
          width={120}
          height={120}
        />
      </div>
      <p className='text-h3 text-center text-ctaDark-090 font-bold'>
        {message}
      </p>
    </div>
  );
}
