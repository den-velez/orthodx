"use client";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

export default function ModalComponent({ children, isOpen }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full bg-bgDark-090 rounded-[12px] p-6'>{children}</div>
    </div>
  );
}
