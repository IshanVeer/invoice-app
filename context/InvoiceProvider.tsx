"use client";
import { InvoiceProps } from "@/types";
import React, { createContext, useContext, useState } from "react";

interface InvoiceFormState {
  mode: "create" | "edit";
  invoice?: InvoiceProps;
}

interface InvoiceContextProps {
  openInvoiceForm: InvoiceFormState | null;
  setOpenInvoiceForm: React.Dispatch<
    React.SetStateAction<InvoiceFormState | null>
  >;
  handleOpenCreateInvoiceForm: () => void;
  handleOpenEditInvoiceForm: () => void;
}

const InvoiceContext = createContext<undefined | InvoiceContextProps>(
  undefined
);

const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [openInvoiceForm, setOpenInvoiceForm] = useState<null | {
    mode: "create" | "edit";
    invoices?: InvoiceProps;
  }>(null);

  const handleOpenCreateInvoiceForm = () => {
    setOpenInvoiceForm({ mode: "create" });
  };

  const handleOpenEditInvoiceForm = () => {
    setOpenInvoiceForm({ mode: "edit" });
  };

  const value = {
    openInvoiceForm,

    setOpenInvoiceForm,
    handleOpenCreateInvoiceForm,
    handleOpenEditInvoiceForm,
  };
  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export default InvoiceProvider;

export const useInvoiceForm = () => {
  const context = useContext(InvoiceContext);

  if (context === undefined) {
    throw new Error("useInvoiceForm must be used inside the invoice provider");
  }
  return context;
};
