"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonComponent } from "@/components";
import { login } from "@/lib/actions/actions";

type FormData = {
  email: string;
  password: string;
};

const FormSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: "El correo no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

const LoginPage = () => {
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
    try {
      const user = await login(data.email, data.password);
      reset({ email: "", password: "" });
      router.push("/patients");
    } catch (error) {
      const { message } = (error as Error) ?? "Error al ingresar";
      reset({ password: "" });
      setError("root", {
        message: message,
      });
    }
  };

  return (
    <section className='pb-[60px] bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className='flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0'>
        <a
          href='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Image
            className='w-full h-auto mr-2 sm:max-w-md'
            src='/images/logo-white.png'
            width={400}
            height={100}
            alt='logo'
          />
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Ingresa a tu cuenta
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
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
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
              <div className='flex items-center justify-between'>
                <div className='flex items-start'></div>
                <Link
                  href='/auth/forgot-password'
                  className='text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
                  ¿olvidaste el password?
                </Link>
              </div>
              <div className='h-[60px]'>
                <ButtonComponent
                  variant='primary'
                  label='Ingresar'
                  type='submit'
                  widthfull
                />
              </div>
              {errors.root && (
                <p className='text-h5 text-msg-error text-center'>
                  {errors.root.message}
                </p>
              )}
              <p className='text-small font-light text-gray-500 dark:text-gray-400'>
                ¿No tienes cuenta?{" "}
                <Link
                  href='/auth/signup'
                  className=' text-txtBrand-primary hover:text-txtBrand-primary-hover hover:underline'>
                  Crear cuenta
                </Link>
              </p>
            </form>
          </div>
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
    </section>
  );
};

export default LoginPage;
