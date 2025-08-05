import Image from "next/image";
import React from "react";

const EmptyInvoice = () => {
  return (
    <div className="text-center flex flex-col items-center my-[40%] md:my-[10%]">
      <Image
        src="/assets/illustration-empty.svg"
        height={1000}
        width={1000}
        alt="empty-invoice"
        className="w-[200px] md:w-[240px] lg:w-[248px] mb-6.5"
      />
      <h2 className="hm-bold text-dark-100_light-100 py-7">
        There is nothing here
      </h2>
      <p className="body-variant text-muted-blues-200_muted-blues-100 w-[194px]">
        Create an invoice by clicking the
        <span className="font-bold"> New</span> button and get started
      </p>
    </div>
  );
};

export default EmptyInvoice;
