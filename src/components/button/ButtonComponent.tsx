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
        return `bg-cta-100 text-txtLight-100 text-center shadow border border-bgDark-080 hover:bg-ctaDark-080 active:border-[4px] active:bg-cta-100 ${width}`;
      case "secondary":
        return "bg-gray-300 text-gray-800";
      case "alternative":
        return "bg-yellow-500 text-white";
    }
  };

  if (props.anchor) {
    return (
      <Link
        href={props.anchorUrl || "#"}
        type={typeButton}
        className={`px-4 py-2 rounded-[12px] ${getButtonStyle()}`}>
        {props.label}
      </Link>
    );
  } else {
    return (
      <button
        type={typeButton}
        className={`px-4 py-2 rounded-[12px] ${getButtonStyle()}`}>
        {props.label}
      </button>
    );
  }
};

export default ButtonComponent;
