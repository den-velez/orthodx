import { IconsComponent } from "@/components";

function DxItem({ label, iconShowen }: { label: string; iconShowen: boolean }) {
  return (
    <div className='flex items-center gap-3 '>
      {iconShowen && (
        <div className='h-6 w-5 flex items-center'>
          <IconsComponent icon='list' />
        </div>
      )}
      <p className='flex-grow text-txtLight-100'>{label}</p>
    </div>
  );
}

export default function DxSection({
  title,
  items,
  iconShowen = true,
}: {
  title?: string;
  items: string | string[];
  iconShowen?: boolean;
}) {
  return (
    <section className='p-6 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
      {title && (
        <h5 className='text-h5 text-txtBrand-secondary text-center'>{title}</h5>
      )}
      {items === typeof "string" && (
        <DxItem label={items} iconShowen={iconShowen} />
      )}
      {Array.isArray(items) &&
        items.map((item: string, index: number) => (
          <DxItem key={index} label={item} iconShowen={iconShowen} />
        ))}
    </section>
  );
}
