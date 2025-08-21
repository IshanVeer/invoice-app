import InvoicePage from "@/components/shared/InvoicePage";

import { getInvoices } from "@/lib/actions/user.action";

import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const invoicesResult = await getInvoices({ clerkId: userId });

  const invoiceData = invoicesResult.invoices;
  console.log(invoiceData, "invoice data home page");

  return (
    <div>
      <InvoicePage invoiceData={invoiceData} />
    </div>
  );
}
