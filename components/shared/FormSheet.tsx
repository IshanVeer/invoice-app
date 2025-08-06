"use client";
import React from "react";

import InvoiceForm from "../form/InvoiceForm";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustomButton from "@/components/ui/CustomButton";

const FormSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          {" "}
          <CustomButton
            className="md:hidden"
            label="new"
            buttonStyle="button-1"
          />
          <CustomButton
            className="max-md:hidden"
            label="new invoice"
            buttonStyle="button-1"
          />
        </div>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={(e) => e.preventDefault()}
        className="max-md:w-full bg-light-100_dark-200 sm:max-w-2xl md:w-[616px] md:top-[72px]  md:rounded-r-[20px] lg:top-0 lg:left-[72px] px-6 md:px-14 py-8 md:py-16 overflow-y-auto"
        side="left"
      >
        <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
        <InvoiceForm />
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;
