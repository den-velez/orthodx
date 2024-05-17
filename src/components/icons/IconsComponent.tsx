import {
  back,
  edit,
  home,
  doctor,
  shop,
  signOut,
  search,
  trash,
  list,
} from "./iconList";

type IconProps = {
  icon:
    | "back"
    | "edit"
    | "home"
    | "doctor"
    | "shop"
    | "signOut"
    | "search"
    | "trash"
    | "list";
};

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='#89919E'
      className='flex justify-end hover:fill-txtBrand-secondary hover:scale-125'
      xmlns='http://www.w3.org/2000/svg'>
      {children}
    </svg>
  );
};

const IconsComponent = (props: IconProps) => {
  const { icon } = props;

  let iconSelected;

  switch (icon) {
    case "edit":
      return <IconContainer>{edit()}</IconContainer>;
    case "home":
      return <IconContainer>{home()}</IconContainer>;
    case "doctor":
      return <IconContainer>{doctor()}</IconContainer>;
    case "shop":
      return <IconContainer>{shop()}</IconContainer>;
    case "signOut":
      return <IconContainer>{signOut()}</IconContainer>;
    case "search":
      return <IconContainer>{search()}</IconContainer>;
    case "trash":
      return <IconContainer>{trash()}</IconContainer>;
    case "list":
      return <IconContainer>{list()}</IconContainer>;
    case "back":
      return <IconContainer>{back()}</IconContainer>;
    default:
      return <IconContainer>{back()}</IconContainer>;
  }
};

export default IconsComponent;
