"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ButtonComponent,
  ModalMessageComponent,
  ModalComponent,
} from "@/components";
import { auth } from "@/firebase/firebase";

type FormData = {
  email: string;
};

const FormSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
});

const ForgotPasswordPage = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      const user = await sendPasswordResetEmail(auth, data.email);

      setShowModal(true);
      reset({ email: "" });

      setTimeout(() => {
        setShowModal(false);
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      setError("root", {
        message: "El email o la contraseña son incorrectos",
      });
    }
  };

  return (
    <section className=' bg-gray-50 dark:bg-gray-900 h-screen'>
      <ModalComponent isOpen={showModal}>
        <ModalMessageComponent
          type='success'
          message='Se ha enviado un correo electronico a tu cuenta exitosamente'
        />
      </ModalComponent>
      <div className='flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0'>
        <Link
          href='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Image
            className='w-full h-auto mr-2 sm:max-w-md'
            src='/images/logo-white.png'
            width={400}
            height={100}
            alt='logo'
          />
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              ¿Olvidaste el password?
            </h1>
            <form
              className='space-y-10 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  {...register("email")}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                />
                {errors.email && (
                  <span className='text-caption text-msg-error'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='h-[60px]'>
                <ButtonComponent
                  variant='primary'
                  label='Recuperar password'
                  type='submit'
                  widthfull
                />
              </div>
              {errors.root && (
                <p className='text-h5 text-msg-error text-center'>
                  {errors.root.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
