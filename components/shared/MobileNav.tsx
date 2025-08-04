import React from "react";
import Image from "next/image";
import Theme from "./Theme";
import { SignedIn, UserButton } from "@clerk/nextjs";

const MobileNav = () => {
  return (
    <div className="lg:hidden h-[72px]  bg-dark-300 flex justify-between items-center">
      <div className="bg-primary-500 z-10 relative  px-5 h-full flex flex-col justify-center rounded-r-[20px] overflow-hidden">
        <div className="bg-primary-300 absolute w-full h-full top-1/2 left-0 rounded-l-[20px] -z-10"></div>
        <Image
          src="/assets/logo.svg"
          alt="logo"
          height={100}
          width={100}
          className="w-8"
        />
      </div>

      <div className="flex items-center h-full">
        <Theme />
        <div className="text-white w-18 text-center flex flex-col items-center justify-center border-l border-[#484e6d] h-full">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    height: "32px !important",
                    width: "32px !important",
                  },
                  userButtonAvatarImage: {
                    height: "32px !important",
                    width: "32px !important",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
