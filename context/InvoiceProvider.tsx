"use client";
import { InvoiceProps } from "@/types";
import React, { createContext, useContext, useState } from "react";

interface InvoiceFormState {
  mode: "create" | "edit";
  invoice?: InvoiceProps;
}

interface InvoiceContextProps {
  openInvoiceForm: InvoiceFormState | null;
  selectedStatuses: string[];
  setOpenInvoiceForm: React.Dispatch<
    React.SetStateAction<InvoiceFormState | null>
  >;
  handleOpenCreateInvoiceForm: () => void;
  handleOpenEditInvoiceForm: () => void;
  handleCloseInvoiceForm: () => void;
  handleCheckboxChange: (value: string) => void;
}

const InvoiceContext = createContext<undefined | InvoiceContextProps>(
  undefined
);

const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [openInvoiceForm, setOpenInvoiceForm] = useState<null | {
    mode: "create" | "edit";
    invoices?: InvoiceProps;
  }>(null);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleOpenCreateInvoiceForm = () => {
    setOpenInvoiceForm({ mode: "create" });
  };

  const handleOpenEditInvoiceForm = () => {
    setOpenInvoiceForm({ mode: "edit" });
  };

  const handleCloseInvoiceForm = () => {
    setOpenInvoiceForm(null);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const value = {
    openInvoiceForm,
    handleCloseInvoiceForm,
    setOpenInvoiceForm,
    handleOpenCreateInvoiceForm,
    handleOpenEditInvoiceForm,
    selectedStatuses,
    handleCheckboxChange,
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
