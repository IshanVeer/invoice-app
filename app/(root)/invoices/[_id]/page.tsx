import InvoiceDetail from "@/components/shared/InvoiceDetail";

import { getInvoices } from "@/lib/actions/user.action";

import { InvoiceProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

import React from "react";

interface InvoiceDetailPageProps {
  params: Promise<{ _id: string }>;
}

const InvoiceDetailPage = async ({ params }: InvoiceDetailPageProps) => {
  const { userId } = await auth();
  const { _id } = await params;
  console.log(_id, "id in details page");
  if (!userId) {
    return;
  }

  const invoicesResult = await getInvoices({ clerkId: userId });
  const invoiceData = invoicesResult.invoices;

  const invoice = invoiceData.find(
    (invoice: InvoiceProps) => invoice._id?.toString() === _id.toString()
  );

  if (!invoice) {
    return;
  }

  return (
    <>
      <InvoiceDetail invoice={invoice} />
    </>
  );
};

export default InvoiceDetailPage;
