"use client";
import { InvoiceProps } from "@/types";

import React from "react";
import EmptyInvoice from "../invoice/EmptyInvoice";
import InvoiceCard from "../invoice/InvoiceCard";
import CustomButton from "../ui/CustomButton";
import FormSheet from "./FormSheet";
import { useInvoiceForm } from "@/context/InvoiceProvider";
import StatusFilter from "./StatusFilter";

interface Props {
  invoiceData: InvoiceProps[];
}

const InvoicePage = ({ invoiceData }: Props) => {
  const { selectedStatuses, openInvoiceForm, handleOpenCreateInvoiceForm } =
    useInvoiceForm();

  const filteredInvoices =
    selectedStatuses.length === 0
      ? invoiceData
      : invoiceData.filter((invoice) =>
          selectedStatuses.includes(invoice.status)
        );

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
          <StatusFilter />
          <div>
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
        {filteredInvoices && filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice: InvoiceProps) => (
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
