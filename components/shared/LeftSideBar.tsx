import React from "react";
import Theme from "./Theme";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

const LeftSideBar = () => {
  return (
    <div className="max-lg:hidden overflow-hidden h-screen   bg-dark-300 flex flex-col justify-between  items-center rounded-r-[20px]">
      <div className="bg-primary-500 z-10 relative  px-5 h-[80px] flex flex-col justify-center rounded-r-[20px] overflow-hidden">
        <div className="bg-primary-300 absolute w-full h-[80px] top-1/2 left-0 rounded-l-[20px] -z-10"></div>
        <Image
          src="/assets/logo.svg"
          alt="logo"
          height={100}
          width={100}
          className="w-8"
        />
      </div>

      <div className="flex flex-col w-full items-center">
        <Theme />
        <div className="text-white border-t border-[#484e6d] w-full h-20 text-center flex flex-col items-center justify-center">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    height: "40px !important",
                    width: "40px !important",
                  },
                  userButtonAvatarImage: {
                    height: "40px !important",
                    width: "40px !important",
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

export default LeftSideBar;
