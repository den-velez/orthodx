"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";

import {
  ButtonComponent,
  ModalMessageComponent,
  ModalComponent,
} from "@/components";
import { LOGO_ORTHODX_WHITE } from "@/constants/constants";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const FormSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: "El correo no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  terms: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

type ErrorResponse = {
  code: number | string;
  message: string;
  errors?: [];
};
const SignUpPage = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await sendEmailVerification(user.user);

      setShowModal(true);
      reset({ email: "", password: "", confirmPassword: "", terms: false });

      setTimeout(() => {
        setShowModal(false);
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        const { code } = error as ErrorResponse;
        if (code === 400) {
          setError("email", {
            message: "El correo ya está en uso",
          });
        } else {
          setError("root", {
            message: "Algo salió mal, intenta de nuevo",
          });
        }
      }
    }
  };

  return (
    <section className='py-[60px] bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <ModalComponent isOpen={showModal}>
        <ModalMessageComponent
          type='success'
          message='Cuenta creada exitosamente, revisa tu correo para verificar tu cuenta y poder iniciar sesión.'
        />
      </ModalComponent>
      <div className='flex flex-col items-center justify-center px-3 py-3 mx-auto lg:py-0'>
        <a
          href='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Image
            className='w-full h-auto mr-2 sm:max-w-md'
            src={LOGO_ORTHODX_WHITE}
            width={400}
            height={100}
            alt='logo'
          />
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Crea una cuenta
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <input
                  type='email'
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
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  {...register("password")}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                {errors.password && (
                  <span className='text-caption text-msg-error'>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Confirma password
                </label>
                <input
                  type='password'
                  {...register("confirmPassword")}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                {errors.confirmPassword && (
                  <span className='text-caption text-msg-error'>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div>
                <div className='flex items-start'>
                  <div className='flex flex-col items-start justify-center'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      {...register("terms")}
                      type='checkbox'
                      className='w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label className='font-light text-gray-500 dark:text-gray-300'>
                      Acepto los{" "}
                      <a
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        href='#'>
                        terminos y condiciones
                      </a>
                    </label>
                  </div>
                </div>
                {errors.terms && (
                  <p className='mt-1 text-caption text-msg-error'>
                    {errors.terms.message}
                  </p>
                )}
              </div>

              <div className='h-[60px]'>
                <ButtonComponent
                  variant='primary'
                  label='Crear Cuenta'
                  type='submit'
                  widthfull
                />
              </div>
              {errors.root && (
                <p className='text-h5 text-msg-error text-center'>
                  {errors.root.message}
                </p>
              )}
              <p className='text-small font-light dark:text-gray-400'>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href='/auth/login'
                  className='text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
                  Ingresa Aquí
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className='w-full mt-10 px-10 flex justify-between items-center'>
          <Link className=' text-txtBrand-secondary' href={"/terms"}>
            Terminos y Condiciones
          </Link>

          <Link className='py-2 text-txtBrand-secondary' href={"/privacy"}>
            Aviso de Privacidad
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
