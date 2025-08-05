import Button from "@/components/ui/Button";
import { invoiceData } from "@/constants";
import { getInvoices } from "@/lib/actions/user.action";
import { formatDate } from "@/lib/utils";
import { InvoiceProps, ItemsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

import Image from "next/image";
import Link from "next/link";

import React from "react";

interface InvoiceDetailPageProps {
  params: {
    _id: string;
  };
}

const InvoiceDetailPage = async ({ params }: InvoiceDetailPageProps) => {
  const { userId } = await auth();
  const { _id } = params;
  console.log(_id, "id in details page");
  if (!userId) {
    return;
  }

  const invoicesResult = await getInvoices({ clerkId: userId });
  const invoiceData = invoicesResult.invoices;

  console.log(invoiceData, "invoice data details page");
  const invoice = invoiceData.find(
    (invoice: InvoiceProps) => invoice._id.toString() === _id.toString()
  );

  if (!invoice) {
    return;
  }

  const grandTotal = invoice.items.reduce(
    (acc: number, item: ItemsProps) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="container relative pb-28">
        <Link
          className="flex items-center gap-4 hs-bold-variant text-dark-100_light-100 mb-8"
          href="/"
        >
          <Image
            src="/assets/icon-arrow-left.svg"
            alt="go-back"
            height={10}
            width={10}
          />
          <p>Go back</p>
        </Link>

        {/* status container */}

        <div className="md:flex items-center justify-between py-3.5 px-6 lg:px-12 lg:py-6 bg-light-100_dark-300 rounded-[8px] mb-4 md:mb-6">
          <div className="flex items-center justify-between md:gap-5">
            <p className="text-muted-blues-400_muted-blues-100 body-variant ">
              Status
            </p>
            <div
              className={`flex items-center justify-center gap-2 w-[104px] h-[40px] rounded-[6px] hs-bold-variant capitalize ${
                invoice.status === "paid"
                  ? "bg-[#33d69f]/6 text-[#33d69f]"
                  : invoice.status === "pending"
                  ? "bg-[#ff8f00]/6 text-[#ff8f00]"
                  : invoice.status === "draft"
                  ? "bg-[#373b53]/6 dark:bg-[#dee2fa]/6 text-[#373b53] dark:text-[#dee2fa]"
                  : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  invoice.status === "paid"
                    ? "bg-[#33d69f]"
                    : invoice.status === "pending"
                    ? "bg-[#ff8f00]"
                    : invoice.status === "draft"
                    ? "bg-[#373b53] dark:bg-[#dee2fa]"
                    : ""
                } `}
              ></div>
              {invoice.status}
            </div>
          </div>

          <div className="max-md:hidden  flex items-center gap-2 justify-between ">
            <Button buttonStyle="button-3" label="edit" />
            <Button buttonStyle="button-5" label="delete" />
            {invoice.status === "pending" && (
              <Button buttonStyle="button-2" label="mark as paid" />
            )}
          </div>
        </div>
        {/* invoice detail container */}
        <div className="bg-light-100_dark-300 py-6 px-6 lg:px-12 lg:py-8 rounded-[8px] mb-4">
          {/* id and address container */}
          <div className="flex flex-col md:flex-row md:justify-between gap-9">
            <div>
              <p className="hs-bold-variant uppercase order-1 mb-1">
                <span className="text-muted-blues-300">#</span>
                {invoice.id}
              </p>
              <p className="text-muted-blues-300_muted-blues-100 body-variant">
                {invoice.description}
              </p>
            </div>

            <div className="body text-muted-blues-300_muted-blues-100 flex flex-col gap-0.5">
              <p>{invoice.senderAddress.street},</p>{" "}
              <p>{invoice.senderAddress.city},</p>
              <p>{invoice.senderAddress.postCode},</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>
          {/* date / client / email container */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 pt-8 pb-8 md:pt-10 md:pb-12">
            {/* dates */}
            <div className="flex flex-col gap-9">
              {/* invoice date */}
              <div>
                <p className="text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                  Invoice Date
                </p>
                <p className="text-dark-100_light-100 hs-bold">
                  {formatDate(invoice.createdAt)}
                </p>
              </div>
              {/* due date */}
              <div>
                <p className="text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                  Payment Due
                </p>
                <p className="text-dark-100_light-100 hs-bold">
                  {formatDate(invoice.paymentDue)}
                </p>
              </div>
            </div>
            {/* client address */}
            <div>
              <p className="text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                Bill To
              </p>
              <div className="body text-muted-blues-300_muted-blues-100 flex flex-col gap-0.5">
                <p>{invoice.clientAddress.street},</p>{" "}
                <p>{invoice.clientAddress.city},</p>
                <p>{invoice.clientAddress.postCode},</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>
            {/* email */}
            <div>
              <p className="text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                sent to
              </p>
              <p className="text-dark-100_light-100 hs-bold">
                {invoice.clientEmail}
              </p>
            </div>
          </div>
          {/* pricing container */}
          <div className="rounded-[8px] overflow-hidden">
            <div className="px-6 bg-light-300_dark-400 pt-8 lg:px-12 lg:pt-10 ">
              {invoice.items.map((item: ItemsProps) => (
                <div
                  className="flex items-center justify-between pb-8 md:pb-10"
                  key={item.name}
                >
                  {/* name */}
                  <div className="md:w-[40%]">
                    <p className="max-md:hidden text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                      item name
                    </p>
                    <p className="hs-bold-variant text-dark-100_light-100 pb-2">
                      {item.name}
                    </p>
                    <p className="md:hidden hs-bold-variant text-muted-blues-300_muted-blues-100">{`${item.quantity} x £ ${item.price}`}</p>
                  </div>
                  {/* qty */}
                  <div className="md:flex items-start gap-20 md:w-[60%] justify-around">
                    {/* quantity */}
                    <div className="max-md:hidden text-center">
                      <p className="max-md:hidden text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                        QTY.
                      </p>
                      <p className="hs-bold-variant text-dark-100_light-100 pb-2">
                        {item.quantity}
                      </p>
                    </div>
                    {/* Price */}
                    <div className="max-md:hidden text-center">
                      <p className="max-md:hidden text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                        Price
                      </p>
                      <p className="hs-bold-variant text-dark-100_light-100 pb-2">
                        £{item.price}
                      </p>
                    </div>
                    {/* total */}
                    <div className="text-center">
                      <p className="max-md:hidden text-muted-blues-300_muted-blues-100 body-variant capitalize pb-4">
                        Total
                      </p>
                      <p className="hs-bold-variant text-dark-100_light-100">
                        £ {item.total}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#373b53] dark:bg-dark-100 py-9 px-6 flex items-center justify-between">
              <p className="body text-light-100">Grand total</p>
              <p className="hm-bold text-light-100">£ {grandTotal}</p>
            </div>
          </div>
        </div>
      </div>
      {/* edit/delete options for mobile */}
      <div className="md:hidden py-3.5 px-6 w-full flex items-center justify-between  bg-light-100_dark-300 fixed bottom-0">
        <Button buttonStyle="button-3" label="edit" />
        <Button buttonStyle="button-5" label="delete" />
        <Button buttonStyle="button-2" label="mark as paid" />
      </div>
    </>
  );
};

export default InvoiceDetailPage;
