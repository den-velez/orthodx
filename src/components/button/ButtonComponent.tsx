import Link from "next/link";

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary" | "alternative";
  type?: "button" | "submit" | "reset";
  anchor?: boolean;
  anchorUrl?: string;
  widthfull?: boolean;
}

const ButtonComponent = (props: ButtonProps) => {
  const width = props.widthfull ? "w-full" : "";
  const typeButton = props.type ? props.type : "button";

  const getButtonStyle = () => {
    switch (props.variant) {
      case "primary":
        return `h-full flex items-center justify-center bg-cta-100 text-txtLight-100 text-center shadow border border-bgDark-080 capitalize hover:bg-ctaDark-080 active:border-[4px] active:bg-cta-100 ${width}`;
      case "secondary":
        return `h-full flex items-center justify-center text-txtLight-100 text-center shadow border border-[4px] border-bgDark-080 capitalize hover:bg-bgDark-070 active:border-[6px] active:bg-bgDark-080 ${width}`;
      case "alternative":
        return "bg-yellow-500 text-white";
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
        className={`px-4 py-2 rounded-[12px] ${getButtonStyle()}`}>
        <span className='text-h5'>{props.label}</span>
      </button>
    );
  }
};

export default ButtonComponent;
