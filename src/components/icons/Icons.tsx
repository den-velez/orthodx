import { back, edit, home, doctor, shop, signOut } from "./iconList";

type IconProps = {
  icon: "back " | "edit" | "home" | "doctor" | "shop" | "signOut";
};

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='#89919E'
      className='hover:fill-txtBrand-secondary hover:scale-125'
      xmlns='http://www.w3.org/2000/svg'>
      {children}
    </svg>
  );
};

const Icons = (props: IconProps) => {
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
    default:
      return <IconContainer>{back()}</IconContainer>;
  }
};

export default Icons;
