import Link from "next/link";

interface ButtonProps {
  label: string;
  variant: "primary" | "primary-dark" | "secondary" | "alternative";
  type?: "button" | "submit" | "reset";
  anchor?: boolean;
  anchorUrl?: string;
  widthfull?: boolean;
  onClick?: () => void;
}

const ButtonComponent = (props: ButtonProps) => {
  const width = props.widthfull ? "w-full" : "";
  const typeButton = props.type ? props.type : "button";

  const getButtonStyle = () => {
    switch (props.variant) {
      case "primary":
        return `h-full flex items-center justify-center bg-cta-100 text-txtLight-100 text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-090 hover:border-ctaLight-090 active:border-[4px] active:bg-cta-100 ${width}`;
      case "primary-dark":
        return `h-full flex items-center justify-center bg-ctaDark-090 text-txtBrand-secondary text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-080 hover:text-txtLight-100 hover:border-ctaLight-090 active:border-[4px] active:bg-ctaDark-090 ${width}`;
      case "secondary":
        return `h-full flex items-center justify-center text-txtLight-100 text-center shadow border border-[4px] border-ctaDark-080 capitalize hover:bg-bgDark-070 hover:border-ctaLight-090 active:border-[6px] active:bg-bgDark-080 ${width}`;
      case "alternative":
        return `h-full flex items-center justify-center text-txtLight-100 text-center shadow border border-[4px] border-bgDark-080 capitalize hover:bg-bgDark-070 hover:border-ctaLight-090 active:border-[6px] active:bg-bgDark-080 ${width}`;
      default:
        return `h-full flex items-center justify-center bg-cta-100 text-txtLight-100 text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-080  hover:border-ctaLight-090 active:border-[4px] active:bg-cta-100 ${width}`;
    }
  };

  if (props.anchor) {
    return (
      <Link
        href={props.anchorUrl || "#"}
        type={typeButton}
        className={`block px-4 py-2 rounded-[12px] ${getButtonStyle()}`}>
        <span className='text-h5'>{props.label}</span>
      </Link>
    );
  } else {
    return (
      <button
        type={typeButton}
        onClick={props.onClick}
        className={`px-4 py-2 rounded-[12px] ${getButtonStyle()}`}>
        <span className='text-h5'>{props.label}</span>
      </button>
    );
  }
};

export default ButtonComponent;
