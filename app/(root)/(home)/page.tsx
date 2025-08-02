import EmptyInvoice from "@/components/invoice/EmptyInvoice";
import InvoiceCard from "@/components/invoice/InvoiceCard";
import Button from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { invoiceData } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" px-6 md:px-12 lg:px-60 py-10 md:py-16 lg:py-20">
      {/* heading */}
      <div className="flex justify-between items-center w-full">
        <div className="">
          <h2 className="hm-bold md:hl-bold">Invoices</h2>
          <p className="md:hidden body text-muted-blues-200_muted-blues-100 pt-3">
            {7} invoices
          </p>
          <p className="max-md:hidden body text-muted-blues-200_muted-blues-100">
            There are 7 total invoices
          </p>
        </div>
        <div className="flex items-center gap-5 md:gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-3">
              <p className="md:hidden text-dark-100_light-100 capitalize hs-bold-variant">
                filter
              </p>{" "}
              <p className="max-md:hidden text-dark-100_light-100 capitalize hs-bold-variant">
                filter by status
              </p>{" "}
              <Image
                src="/assets/icon-arrow-down.svg"
                alt="filter"
                width={10}
                height={10}
                className="object-contain"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[192px] bg-light-100_dark-400 rounded-[8px] px-4 py-4 border-none shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:shadow-[0px_10px_20px_rgba(0,0,0,0.25)]">
              <DropdownMenuItem className="flex items-center gap-4 py-2">
                <input
                  className="appearance-none  rounded-xs border-none hover:border-1 hover:border-primary-500 hover:cursor-pointer w-4 h-4 bg-muted-blues-100_dark-300 checked:bg-primary-500 checked:text-transparent checked:border-primary-500 focus:outline-none focus:ring-0 checked:bg-no-repeat checked:bg-center
                checked:bg-contain"
                  id="draft"
                  name="draft"
                  type="checkbox"
                />
                <label
                  className="hs-bold-variant text-dark-100_light-100"
                  htmlFor="draft"
                >
                  Draft
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-4 py-2">
                <input
                  className="appearance-none  rounded-xs border-none hover:border-1 hover:border-primary-500 hover:cursor-pointer w-4 h-4 bg-muted-blues-100_dark-300 checked:bg-primary-500 checked:text-transparent checked:border-primary-500 focus:outline-none focus:ring-0 checked:bg-no-repeat checked:bg-center
                checked:bg-contain"
                  id="pending"
                  name="pending"
                  type="checkbox"
                />
                <label
                  className="hs-bold-variant text-dark-100_light-100"
                  htmlFor="pending"
                >
                  Pending
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-4 py-2">
                <input
                  className="appearance-none  rounded-xs border-none hover:border-1 hover:border-primary-500 hover:cursor-pointer w-4 h-4 bg-muted-blues-100_dark-300 checked:bg-primary-500 checked:text-transparent checked:border-primary-500 focus:outline-none focus:ring-0 checked:bg-no-repeat checked:bg-center
                checked:bg-contain"
                  id="paid"
                  name="paid"
                  type="checkbox"
                />
                <label
                  className="hs-bold-variant text-dark-100_light-100"
                  htmlFor="paid"
                >
                  Paid
                </label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="md:hidden" label="new" buttonStyle="button-1" />
          <Button
            className="max-md:hidden"
            label="new invoice"
            buttonStyle="button-1"
          />
        </div>
      </div>
      {/* invoice list */}
      <div className="flex flex-col gap-4 py-8 md:py-16 lg:py-[70px]">
        {invoiceData && invoiceData.length > 0 ? (
          invoiceData.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        ) : (
          <EmptyInvoice />
        )}
      </div>
    </div>
  );
}
