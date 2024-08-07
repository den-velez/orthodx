"use client";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

export default function ModalComponent({ children, isOpen }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
      <div className='w-full max-w-[600px] flex justify-center items-center bg-bgDark-090 rounded-[12px] p-6'>
        {children}
      </div>
    </div>
  );
}
