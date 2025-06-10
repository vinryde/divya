import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { footerLinks } from "@/constants/data";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-12 bg-primary/5">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-5 lg:gap-20">
        <div className="flex flex-col gap-3 lg:col-span-3">
          <Logo className="w-[88px]">Divya</Logo>
          <p className="text-sm tracking-wide">
          An educator, researcher, and innovator dedicated to transforming education through sustainability, technology, and equity-focused outreach. Her global collaborations and leadership in teacher education shape future-ready learning environments and inclusive academic practices.
          </p>
          <SocialLinks />
        </div>
        <div className="hidden lg:inline-flex" />
        <div className="lg:col-span-4 flex justify-between">
          {footerLinks?.map((item) => (
            <div key={item?.title}>
              <h2 className="text-base capitalize font-semibold text-primary/80">
                {item?.title}
              </h2>
              <div className="flex flex-col mt-2 gap-2 text-sm font-medium text-primary/80 ">
                {item?.data?.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hover:text-darkOrange hoverEffect"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
