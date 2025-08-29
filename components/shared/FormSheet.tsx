"use client";
import React from "react";

import InvoiceForm from "../form/InvoiceForm";
import { InvoiceProps } from "@/types";
import { easeInOut, motion } from "motion/react";

interface FormSheetProps {
  mode?: "edit";
  invoice?: InvoiceProps;
}

const FormSheet = ({ mode, invoice }: FormSheetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/50"
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: easeInOut }}
        className="max-h-screen max-md:w-full bg-light-100_dark-200 sm:max-w-2xl md:w-[616px] md:top-[72px] md:rounded-r-[20px] lg:top-0 lg:left-[72px] px-6 md:px-14 py-0 max-md:pt-8 md:py-16 lg:py-0 lg:pt-16 overflow-y-auto fixed inset-y-0 left-0"
      >
        <InvoiceForm invoice={invoice} mode={mode} />
      </motion.div>
    </motion.div>
  );
};

export default FormSheet;
