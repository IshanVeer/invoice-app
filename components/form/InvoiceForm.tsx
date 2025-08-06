import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const InvoiceForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
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
              htmlFor="client-postcode"
            >
              Postcode
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
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
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="invoice-date"
            >
              Invoice Date
            </label>
          </div>
          {/* payment terms */}
          <div className="flex flex-col gap-4 col-span-2">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="payment-terms"
            >
              Payment Terms
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="payment-terms"
              name="payment-terms"
              type="text"
            />
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
