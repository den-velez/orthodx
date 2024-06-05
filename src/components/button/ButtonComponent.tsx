import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  label: string;
  variant: "primary" | "primary-dark" | "secondary" | "alternative";
  type?: "button" | "submit" | "reset";
  anchor?: boolean;
  anchorUrl?: string;
  widthfull?: boolean;
  disabled?: boolean;
  iconSrc?: string;
  square?: boolean;
  onClick?: () => void;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const width = props.widthfull ? "w-full" : "";
    const typeButton = props.type ? props.type : "button";

    const square = props.square ? "flex-col" : "";
    const imageButtonSquare = props.square ? "h-[60%]" : "h-full";
    const textButtonSquare = props.square ? "h-[40%] flex items-end" : "ml-4 ";

    const getButtonStyle = (): string => {
      switch (props.variant) {
        case "primary":
          return `h-full flex items-center justify-center gap-2 bg-cta-100 text-txtLight-100 text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-090 hover:border-ctaLight-090 active:border-[4px] active:bg-cta-100 ${width} ${square}`;
        case "primary-dark":
          return `h-full flex items-center justify-center gap-2 bg-ctaDark-090 text-txtBrand-secondary text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-080 hover:text-txtLight-100 hover:border-ctaLight-090 active:border-[4px] active:bg-ctaDark-090 ${width} ${square}`;
        case "secondary":
          return `h-full flex items-center justify-center gap-2 text-txtLight-100 text-center shadow border border-[4px] border-ctaDark-080 capitalize hover:bg-bgDark-070 hover:border-ctaLight-090 active:border-[6px] active:bg-bgDark-080 ${width} ${square}`;
        case "alternative":
          return `h-full flex items-center justify-center gap-2 text-txtLight-100 text-center shadow border border-[4px] border-bgDark-080 capitalize hover:bg-bgDark-070 hover:border-ctaLight-090 active:border-[6px] active:bg-bgDark-080 ${width} ${square}`;
        default:
          return `h-full flex items-center justify-center gap-2 bg-cta-100 text-txtLight-100 text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-080  hover:border-ctaLight-090 active:border-[4px] active:bg-cta-100 ${width} ${square}`;
      }
    };

    if (props.anchor) {
      return (
        <Link
          href={props.anchorUrl || "#"}
          type={typeButton}
          className={`px-4 py-2 rounded-[12px] ${getButtonStyle()}`}>
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt='icon'
              width={40}
              height={40}
              className={`w-auto p-1 ${imageButtonSquare}`}
            />
          )}
          <p className={`text-h5 ${textButtonSquare}`}>
            <span>{props.label}</span>
          </p>
        </Link>
      );
    } else {
      return (
        <button
          disabled={props.disabled}
          ref={ref}
          type={typeButton}
          onClick={props.onClick}
          className={`px-4 py-2 rounded-[12px] disabled:bg-opacity-40 disabled:text-opacity-20 ${getButtonStyle()}`}>
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt='icon'
              width={40}
              height={40}
              className={`w-auto p-1 ${imageButtonSquare}`}
            />
          )}
          <p className={`text-h5 ${textButtonSquare}`}>
            <span>{props.label}</span>
          </p>
        </button>
      );
    }
  }
);

export default ButtonComponent;
