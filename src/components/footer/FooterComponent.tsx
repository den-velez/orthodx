"use client";

import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { IconsComponent } from "@/components";

interface FooterProps {
  type: "doctor" | "home" | "patient" | "patient-edit";
}

type FooterItem = {
  icon: "signOut" | "home" | "shop" | "edit" | "doctor";
  onClick?: () => void;
};

const FooterComponent = (props: FooterProps) => {
  const router = useRouter();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const doctorFooter: FooterItem[] = [
    {
      icon: "signOut",
      onClick: () => signOutUser,
    },
    {
      icon: "home",
      onClick: () => router.push("/patients"),
    },
    {
      icon: "shop",
      onClick: () => router.push("/store"),
    },
  ];

  const homeFooter: FooterItem[] = [
    {
      icon: "signOut",
      onClick: signOutUser,
    },
    {
      icon: "doctor",
      onClick: () => router.push("/doctors/2"),
    },
    {
      icon: "shop",
      onClick: () => router.push("/store"),
    },
  ];

  const patientEditFooter: FooterItem[] = [
    {
      icon: "signOut",
      onClick: () => signOutUser,
    },
    {
      icon: "home",
      onClick: () => router.push("/patients"),
    },
    {
      icon: "edit",
      onClick: () => router.push("/patients"),
    },
  ];

  const patientFooter: FooterItem[] = [
    {
      icon: "signOut",
      onClick: () => signOutUser,
    },
    {
      icon: "home",
      onClick: () => router.push("/patients"),
    },
    {
      icon: "shop",
      onClick: () => router.push("/store"),
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
        <button key={index} onClick={item.onClick}>
          <IconsComponent icon={item.icon} />
        </button>
      ))}
    </footer>
  );
};

export default FooterComponent;
