"use client";
import React from "react";
import CustomButton from "../ui/CustomButton";
import { easeIn, motion } from "motion/react";

interface ModalProps {
  handleDeleteInvoice: () => void;
  invoiceId?: string;
  closeDeleteModal: () => void;
}

const InvoiceDeleteModal = ({
  handleDeleteInvoice,
  invoiceId,
  closeDeleteModal,
}: ModalProps) => {
  return (
    <motion.div className="fixed flex items-center justify-center inset-0 z-50 bg-black/50">
      <motion.div
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: easeIn }}
        className="w-[480px] max-sm:w-[343px] bg-light-100_dark-400 p-12  max-sm:p-8 rounded-[8px]"
      >
        <h2 className="text-dark-100_light-100 hm-bold ">Confirm Deletion</h2>
        <p className="body text-muted-blues-200_muted-blues-100 my-4">
          Are you sure you want to delete invoice #{invoiceId} ? This action
          cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-4">
          <CustomButton
            buttonStyle="button-3"
            label="Cancel"
            action="close-delete-modal"
            closeDeleteModal={closeDeleteModal}
          />
          <CustomButton
            action="delete-invoice"
            handleDeleteInvoice={handleDeleteInvoice}
            buttonStyle="button-5"
            label="delete"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvoiceDeleteModal;
