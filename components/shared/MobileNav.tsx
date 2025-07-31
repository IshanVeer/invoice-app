import React from "react";
import Image from "next/image";
import Theme from "./Theme";

const MobileNav = () => {
  return (
    <div className="md:hidden h-[72px]  bg-dark-300 flex justify-between items-center">
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

      <div className="flex items-center">
        <Theme />
        <div className="text-white">avatar</div>
      </div>
    </div>
  );
};

export default MobileNav;
