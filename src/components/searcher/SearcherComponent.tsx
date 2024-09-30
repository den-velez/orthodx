"use client";

import { IconsComponent } from "@/components";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BEFORE_SEARCH = 300;

export default function SearcherComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlerSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BEFORE_SEARCH);

  return (
    <div className='px-3 py-6 bg-bgDark-080 rounded-xl'>
      <div className='px-3 flex items-center rounded-xl bg-bgDark-070'>
        <IconsComponent icon='search' />
        <input
          className='p-3 text-body min-h-12 bg-bgDark-070 text-txtDark-090 focus:text-txtLight-100 focus:outline-none'
          type='text'
          placeholder='Buscar pacientes'
          defaultValue={searchParams.get("name") ?? ""}
          onChange={(event) => handlerSearch(event.target.value)}
        />
      </div>
    </div>
  );
}
