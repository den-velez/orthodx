import { IconsComponent } from "@/components";

interface FooterProps {
  type: "doctor" | "home" | "patient" | "patient-edit";
}

type FooterItem = {
  icon: "signOut" | "home" | "shop" | "edit" | "doctor";
};

const FooterComponent = (props: FooterProps) => {
  const doctorFooter: FooterItem[] = [
    {
      icon: "signOut",
    },
    {
      icon: "home",
    },
    {
      icon: "shop",
    },
  ];

  const homeFooter: FooterItem[] = [
    {
      icon: "signOut",
    },
    {
      icon: "doctor",
    },
    {
      icon: "shop",
    },
  ];

  const patientEditFooter: FooterItem[] = [
    {
      icon: "signOut",
    },
    {
      icon: "home",
    },
    {
      icon: "edit",
    },
  ];

  const patientFooter: FooterItem[] = [
    {
      icon: "signOut",
    },
    {
      icon: "home",
    },
    {
      icon: "shop",
    },
  ];

  const getFooter = () => {
    switch (props.type) {
      case "doctor":
        return doctorFooter;
      case "home":
        return homeFooter;
      case "patient":
        return patientFooter;
      case "patient-edit":
        return patientEditFooter;
      default:
        return homeFooter;
    }
  };

  return (
    <footer className='flex items-center justify-evenly h-[90px] bg-bgDark-080'>
      {getFooter().map((item, index) => (
        <button key={index}>
          <IconsComponent icon={item.icon} />
        </button>
      ))}
    </footer>
  );
};

export default FooterComponent;
