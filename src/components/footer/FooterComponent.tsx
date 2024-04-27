import Icons from "@/components/icons/Icons";

interface FooterProps {
  type: "doctor" | "home" | "patient" | "patient-edit";
}

type FooterItem = {
  icon: "signOut" | "home" | "shop" | "home";
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
      icon: "home",
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
      icon: "shop",
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
        return patientFooter;
      default:
        return homeFooter;
    }
  };

  return (
    <footer className='flex items-center justify-evenly h-[90px] bg-bgDark-080'>
      {getFooter().map((item, index) => (
        <button key={index}>
          <Icons icon={item.icon} />
        </button>
      ))}
    </footer>
  );
};

export default FooterComponent;
