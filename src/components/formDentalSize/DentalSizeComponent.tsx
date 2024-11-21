"use client";

import { UseFormRegister } from "react-hook-form";
import { FormDataDentalSize } from "./FormDentalSizeComponent";

export default function DentalSizeComponent({
  discrepancy = true,
  patient = true,
  upper = ["d13", "d12", "d11", "d21", "d22", "d23"],
  lower = ["d43", "d42", "d41", "d31", "d32", "d33"],
  upperTreatment = ["none", "none", "none", "none", "none", "none"],
  lowerTreatment = ["none", "none", "none", "none", "none", "none"],
  sumAbove,
  sumBelow,
  register,
}: {
  discrepancy: boolean;
  patient: boolean;
  upper?: string[];
  lower?: string[];
  upperTreatment?: string[];
  lowerTreatment?: string[];
  sumAbove: number;
  sumBelow: number;
  register: UseFormRegister<FormDataDentalSize>;
}) {
  const label = discrepancy ? "Discrepancia" : "Proporcional";
  const propocionalStyles = discrepancy
    ? "bg-msg-error text-center"
    : "bg-msg-success text-center";

  const addStyle = (
    toothArrayWithTreatment: string[],
    indexToCompare: number
  ) => {
    const treatment = toothArrayWithTreatment[indexToCompare];

    if (treatment === "none") return "";

    return treatment === "increase"
      ? "bg-msg-success"
      : "bg-msg-error text-txtlight-100";
  };

  return (
    <>
      <div
        className={`p-3 flex items-center justify-between rounded-b-[12px] ${propocionalStyles}`}>
        <h3 className='p-2 text-h3 text-center'>{label}</h3>
        <div>
          <p className='flex items-center justify-between gap-1 capitalize'>
            <span>Suma superior:</span>
            <span className='text-h5 w-8'>{sumAbove}</span>
          </p>
          <p className='flex items-center justify-between gap-1 capitalize'>
            <span>Suma inferior:</span>
            <span className='text-h5 w-8'>{sumBelow}</span>
          </p>
        </div>
      </div>
      <div className='mt-3 flex flex-col gap-3'>
        <div className='grid grid-cols-6 gap-2 '>
          {patient ? (
            <>
              {upper.map((tooth, key: number) => (
                <span
                  key={key}
                  className='p-2 bg-txtDark-090 text-center text-h5'>
                  {tooth}
                </span>
              ))}
            </>
          ) : (
            <>
              {upper.map((tooth, index: number) => {
                const bgStyle = addStyle(upperTreatment, index);
                return (
                  <input
                    key={index}
                    type='number'
                    inputMode='decimal'
                    step='0.1'
                    pattern='^\d+(\.\d{1})?$'
                    className={`p-2 text-center text-h5 ${bgStyle}`}
                    {...register(tooth as keyof FormDataDentalSize)}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className='grid grid-cols-6 gap-2 '>
          {patient ? (
            <>
              {lower.map((tooth, key: number) => (
                <span
                  key={key}
                  className='p-2 bg-txtDark-090 text-center text-h5'>
                  {tooth}
                </span>
              ))}
            </>
          ) : (
            <>
              {lower.map((tooth, index: number) => {
                const bgStyle = addStyle(lowerTreatment, index);
                return (
                  <input
                    key={index}
                    inputMode='decimal'
                    type='number'
                    step='0.1'
                    pattern='^\d+(\.\d{1})?$'
                    className={`p-2 text-center text-h5 ${bgStyle}`}
                    {...register(tooth as keyof FormDataDentalSize)}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
