import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { labelDayButton } from "react-day-picker";

const InvoiceForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const paymentTermsData = [
    { label: "Net 1 day", value: 1 },
    { label: "Net 7 days", value: 7 },
    { label: "Net 14 days", value: 14 },
    { label: "Net 30 days", value: 30 },
  ];
  return (
    <form>
      <h2 className="hm-bold mb-10">New Invoice</h2>
      {/* bill from */}
      <div>
        <h3 className="hs-bold-variant text-primary-500 mb-7">Bill From</h3>
        {/* grid layout */}
        <div className="grid grid-cols-2 gap-y-7 gap-x-6">
          {/* street address */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="street-address"
            >
              Street Address
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="street-address"
              name="street-address"
              type="text"
            />
          </div>
          {/* city */}
          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="city"
              name="city"
              type="text"
            />
          </div>

          {/* postcode */}
          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="postcode"
            >
              Postcode
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="postcode"
              name="postcode"
              type="text"
            />
          </div>

          {/* country */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="country"
              name="country"
              type="text"
            />
          </div>
        </div>
      </div>
      {/* bill to */}
      <div className="py-10">
        <h3 className="hs-bold-variant text-primary-500 mb-7">Bill To</h3>
        {/* grid layout */}
        <div className="grid grid-cols-2 gap-y-7 gap-x-6">
          {/* client name*/}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="client-name"
            >
              Client’s Name
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-name"
              name="client-name"
              type="text"
            />
          </div>
          {/* client email */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="client-email"
            >
              Client’s Email
            </label>
            <input
              placeholder="alexgrim@mail.com"
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-email"
              name="client-email"
              type="text"
            />
          </div>

          {/* client street address */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="client-street-address"
            >
              Street Address
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-street-address"
              name="client-street-address"
              type="text"
            />
          </div>
          {/* client city */}
          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="-clientcity"
            >
              City
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-city"
              name="client-city"
              type="text"
            />
          </div>

          {/* client postcode */}
          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="postcode"
            >
              Postcode
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="postcode"
              name="postcode"
              type="text"
            />
          </div>

          {/* client country */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="client-country"
            >
              Country
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-country"
              name="client-country"
              type="text"
            />
          </div>
          {/* invoice date */}

          <div className="flex flex-col gap-4 col-span-2">
            <p className="body-variant text-m text-muted-blues-200_muted-blues-100">
              Invoice Date
            </p>
            <Popover>
              <PopoverContent className=" border-0 bg-light-100_dark-300 rounded-[8px] shadow-[0px_10px_10px_rgba(72,84,159,0.1)]">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
              <PopoverTrigger asChild>
                <div
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground hover:cursor-pointer  border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300 flex items-center justify-between"
                >
                  <CalendarIcon className="text-muted-blues-200_muted-blues-100" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </div>
              </PopoverTrigger>
            </Popover>
          </div>
          {/* payment terms */}
          <div className="flex flex-col gap-4 col-span-2">
            <p className="body-variant text-m text-muted-blues-200_muted-blues-100">
              Payment Terms
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full hover:cursor-pointer flex items-center justify-between border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300">
                <p>Net 30 Days</p>
                <Image
                  src="/assets/icon-arrow-down.svg"
                  alt="payment-terms"
                  width={10}
                  height={10}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
                className="w-[100%] border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              >
                {paymentTermsData.map((payment) => (
                  <DropdownMenuItem
                    className="hover:bg-transparent focus:bg-transparent data-[highlighted]:bg-transparent hover:text-primary-500 hover:cursor-pointer py-3"
                    key={payment.value}
                  >
                    {payment.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* project description */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="project-description"
            >
              Project Description
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="project-description"
              name="project-description"
              type="text"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
