"use client";

import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import { IconsComponent } from "@/components";

interface FooterProps {
  type: "doctor" | "home" | "patient";
  patientId?: string;
  doctorId: string | undefined;
}

type FooterItem = {
  icon: "back" | "signOut" | "home" | "shop" | "edit" | "doctor";
  onClick?: () => void;
};

const FooterComponent = (props: FooterProps) => {
  const router = useRouter();
  const params = useParams();

  const url = window.location.pathname;
  const urlArray = url.split("/");
  const lastItemRoute = urlArray.pop();

  const patientPage = params.id == lastItemRoute;

  const signOutUser = async () => {
    try {
      await signOut(auth);
      Cookies.remove("userID");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const doctorFooter: FooterItem[] = [
    {
      icon: "signOut",
      onClick: async () => await signOutUser(),
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
      onClick: () => router.push(`/doctors/${props.doctorId}`),
    },
    {
      icon: "shop",
      onClick: () => router.push("/store"),
    },
  ];

  const patientFooter: FooterItem[] = [
    {
      icon: "back",
      onClick: () =>
        patientPage
          ? router.push("/patients")
          : router.push(`/patients/${params.id}`),
    },
    {
      icon: "home",
      onClick: () => router.push("/patients"),
    },
    {
      icon: "edit",
      onClick: () => router.push(`/patients/${params.id}/edit`),
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
