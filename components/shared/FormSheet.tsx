"use client";
import React from "react";

import InvoiceForm from "../form/InvoiceForm";

const FormSheet = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 left-[72px]">
      <div className="max-h-screen max-md:w-full bg-light-100_dark-200 sm:max-w-2xl md:w-[616px] md:top-[72px]  md:rounded-r-[20px] lg:top-0 lg:left-[72px] px-6 md:px-14 py-0 max-md:pt-8 md:py-16 lg:py-0 lg:pt-16 overflow-y-auto">
        <InvoiceForm />
      </div>
    </div>
  );
};

export default FormSheet;
