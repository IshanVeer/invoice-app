import Image from "next/image";
import Link from "next/link";
import React from "react";

const InvoiceCard = () => {
  return (
    <div className="bg-light-100_dark-300 p-6 shadow-[0px_10px_10px_rgba(72,84,159,0.1)] rounded-[8px] grid grid-cols-2 md:flex md:items-center md:justify-between gap-y-5">
      <p className="hs-bold-variant uppercase order-1 mb-2.5 md:mb-0">
        <span className="text-muted-blues-300">#</span>#RT3080
      </p>
      <p className="text-muted-blues-400 body-variant order-2 md:order-3 max-md:justify-self-end">
        Jensen Huang
      </p>
      <p className="text-muted-blues-300 body-variant order-3 md:order-2 max-md:self-end ">
        Due 19 Aug 2021
      </p>
      <div className="order-4 md:order-5 w-fit flex items-center gap-2 px-7 py-3  rounded-[6px] hs-bold-variant capitalize bg-[#33d69f]/6 text-[#33d69f] justify-self-end self-center row-span-2">
        <div className="w-2 h-2 rounded-full bg-[#33d69f]"></div>
        Paid
      </div>
      <p className="hs-bold text-dark-100_light-100 order-5 md:order-4 ">
        £ 1,800.90
      </p>
      <Link className="order-6 max-md:hidden" href="/">
        <Image
          src="/assets/icon-arrow-right.svg"
          alt="link"
          height={10}
          width={10}
        />
      </Link>
    </div>
  );
};

export default InvoiceCard;
