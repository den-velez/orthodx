export default function DxSectionDental({
  label,
  value = [],
}: {
  label: string;
  value: string | string[];
}) {
  return (
    <div className='grid grid-cols-[50%_50%] items-center gap-3'>
      <span className='text-txtBrand-secondary justify-end'>{label}</span>
      <span className=' text-txtLight-100 justify-start'>
        {Array.isArray(value) ? value.join(" ") : value}
      </span>
    </div>
  );
}
