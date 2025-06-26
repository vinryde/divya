import { Facebook, Github, Linkedin, Mail, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const footerData = [

  {
    label: "Youtube",
    href: "/",
    icon: <Youtube />,
  },
  {
    label: "Linkedin",
    href: "/",
    icon: <Linkedin />,
  },
  {
    label: "Facebook",
    href: "/",
    icon: <Facebook />,
  },
  {
    label: "Email",
    href: "/",
    icon: <Mail />,
  },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {footerData?.map((item) => (
        <Link
          href={item?.href}
          key={item?.label}
          className="border border-darkOrange/50 p-2 rounded-lg text-primary/80 hover:border-darkOrange hover:text-darkOrange hover:bg-darkOrange/5 hoverEffect"
        >
          <span>{item?.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
