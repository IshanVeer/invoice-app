import { formatDate } from "@/lib/utils";
import { InvoiceDataProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const InvoiceCard = ({ invoice }: InvoiceDataProps) => {
  return (
    <Link href={`/invoices/${invoice._id}`}>
      <div className="bg-light-100_dark-300 p-6 shadow-[0px_10px_10px_rgba(72,84,159,0.1)] rounded-[8px] grid grid-cols-2 md:flex md:items-center md:justify-between gap-y-5">
        <p className="hs-bold-variant uppercase break-words whitespace-normal order-1 mb-2.5 md:mb-0">
          <span className="text-muted-blues-300">#</span>
          {invoice._id.toString()}
        </p>
        <p className="text-muted-blues-400 body-variant order-2 md:order-3 max-md:justify-self-end">
          {invoice.clientName}
        </p>
        <p className="text-muted-blues-300_muted-blues-100 body-variant order-3 md:order-2 max-md:self-end ">
          {`Due ${formatDate(invoice.paymentDue)}`}
        </p>
        <div
          className={`order-4 md:order-5  flex items-center justify-center gap-2 w-[104px] h-[40px]  rounded-[6px] hs-bold-variant capitalize  justify-self-end self-center row-span-2 ${
            invoice.status === "paid"
              ? "bg-[#33d69f]/6 text-[#33d69f]"
              : invoice.status === "pending"
              ? "bg-[#ff8f00]/6 text-[#ff8f00]"
              : invoice.status === "draft"
              ? "bg-[#373b53]/6 dark:bg-[#dee2fa]/6 text-[#373b53] dark:text-[#dee2fa]"
              : ""
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              invoice.status === "paid"
                ? "bg-[#33d69f]"
                : invoice.status === "pending"
                ? "bg-[#ff8f00]"
                : invoice.status === "draft"
                ? "bg-[#373b53] dark:bg-[#dee2fa]"
                : ""
            } `}
          ></div>
          {invoice.status}
        </div>
        <p className="hs-bold text-dark-100_light-100 order-5 md:order-4 ">
          {`£ ${invoice.total}`}
        </p>

        <Image
          src="/assets/icon-arrow-right.svg"
          alt="link"
          height={10}
          width={10}
          className="order-6 max-md:hidden"
        />
      </div>
    </Link>
  );
};

export default InvoiceCard;
