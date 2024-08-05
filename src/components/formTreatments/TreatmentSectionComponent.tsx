export default function TreatmentSectionComponent({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className='py-6 px-3 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
      {title && (
        <h5 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
          {title}
        </h5>
      )}
      {children}
    </section>
  );
}
