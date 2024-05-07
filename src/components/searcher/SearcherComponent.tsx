"use client";

import { ChangeEvent } from "react";
import { IconsComponent } from "@/components";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearcherComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='px-3 py-6 bg-bgDark-080'>
      <div className='px-3 flex items-center rounded-[12px] bg-bgDark-070'>
        <IconsComponent icon='search' />
        <input
          className='p-3 text-body min-h-12 bg-bgDark-070 text-txtDark-090 focus:text-txtLight-100 focus:outline-none'
          type='text'
          placeholder='Buscar pacientes'
          onChange={handlerChange}
        />
      </div>
    </div>
  );
}
