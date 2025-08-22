"use client";
import { InvoiceProps } from "@/types";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import EmptyInvoice from "../invoice/EmptyInvoice";
import InvoiceCard from "../invoice/InvoiceCard";
import CustomButton from "../ui/CustomButton";
import FormSheet from "./FormSheet";

interface Props {
  invoiceData: InvoiceProps[];
}

const InvoicePage = ({ invoiceData }: Props) => {
  const [openInvoiceForm, setOpenInvoiceForm] = useState<null | {
    mode: "create" | "edit";
    invoices?: InvoiceProps;
  }>(null);

  const handleOpenCreateInvoiceForm = () => {
    setOpenInvoiceForm({ mode: "create" });
  };

  return (
    <div className="container">
      {/* sheet component */}
      {openInvoiceForm?.mode === "create" && <FormSheet />}
      {/* heading */}
      <div className="flex justify-between items-center w-full">
        <div className="">
          <h2 className="hm-bold md:hl-bold">Invoices</h2>
          <p className="md:hidden body text-muted-blues-200_muted-blues-100 pt-3">
            {invoiceData.length} invoices
          </p>
          <p className="max-md:hidden body text-muted-blues-200_muted-blues-100">
            There are {invoiceData.length} total invoices
          </p>
        </div>
        <div className="flex items-center gap-5 md:gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-3">
              <p className="md:hidden text-dark-100_light-100 capitalize hs-bold-variant">
                filter
              </p>{" "}
              <p className="max-md:hidden text-dark-100_light-100 capitalize hs-bold-variant">
                filter by status
              </p>{" "}
              <Image
                src="/assets/icon-arrow-down.svg"
                alt="filter"
                width={10}
                height={10}
                className="object-contain"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[192px] bg-light-100_dark-400 rounded-[8px] px-4 py-4 border-none shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:shadow-[0px_10px_20px_rgba(0,0,0,0.25)]">
              <DropdownMenuItem className="flex items-center gap-4 py-2">
                <input
                  className="appearance-none  rounded-xs border-none hover:border-1 hover:border-primary-500 hover:cursor-pointer w-4 h-4 bg-muted-blues-100_dark-300 checked:bg-primary-500 checked:text-transparent checked:border-primary-500 focus:outline-none focus:ring-0 checked:bg-no-repeat checked:bg-center
            checked:bg-contain"
                  id="draft"
                  name="draft"
                  type="checkbox"
                />
                <label
                  className="hs-bold-variant text-dark-100_light-100"
                  htmlFor="draft"
                >
                  Draft
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-4 py-2">
                <input
                  className="appearance-none  rounded-xs border-none hover:border-1 hover:border-primary-500 hover:cursor-pointer w-4 h-4 bg-muted-blues-100_dark-300 checked:bg-primary-500 checked:text-transparent checked:border-primary-500 focus:outline-none focus:ring-0 checked:bg-no-repeat checked:bg-center
            checked:bg-contain"
                  id="pending"
                  name="pending"
                  type="checkbox"
                />
                <label
                  className="hs-bold-variant text-dark-100_light-100"
                  htmlFor="pending"
                >
                  Pending
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-4 py-2">
                <input
                  className="appearance-none  rounded-xs border-none hover:border-1 hover:border-primary-500 hover:cursor-pointer w-4 h-4 bg-muted-blues-100_dark-300 checked:bg-primary-500 checked:text-transparent checked:border-primary-500 focus:outline-none focus:ring-0 checked:bg-no-repeat checked:bg-center
            checked:bg-contain"
                  id="paid"
                  name="paid"
                  type="checkbox"
                />
                <label
                  className="hs-bold-variant text-dark-100_light-100"
                  htmlFor="paid"
                >
                  Paid
                </label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            {" "}
            <CustomButton
              className="md:hidden"
              label="new"
              buttonStyle="button-1"
              handleOpenCreateInvoiceForm={handleOpenCreateInvoiceForm}
              action="create-invoice"
            />
            <CustomButton
              className="max-md:hidden"
              label="new invoice"
              buttonStyle="button-1"
              handleOpenCreateInvoiceForm={handleOpenCreateInvoiceForm}
              action="create-invoice"
            />
          </div>
        </div>
      </div>
      {/* invoice list */}
      <div className="flex flex-col gap-4 py-8 md:py-16 lg:py-[70px]">
        {invoiceData && invoiceData.length > 0 ? (
          invoiceData.map((invoice: InvoiceProps) => (
            <InvoiceCard key={invoice._id?.toString()} invoice={invoice} />
          ))
        ) : (
          <EmptyInvoice />
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
