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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import CustomButton from "../ui/CustomButton";

const InvoiceForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    sendersStreetAddress: "",
    sendersCity: "",
    sendersPostcode: "",
    sendersCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreetAddress: "",
    clientCity: "",
    clientPostcode: "",
    clientCountry: "",
    projectDescription: "",
  });
  const [items, setItems] = useState([
    { itemName: "", quantity: 0, price: 0, total: 0 },
  ]);
  const paymentTermsData = [
    { label: "Net 1 day", value: 1 },
    { label: "Net 7 days", value: 7 },
    { label: "Net 14 days", value: 14 },
    { label: "Net 30 days", value: 30 },
  ];

  // handle form input
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle item data

  const itemChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setItems((prev) => {
      // make a copy of your array
      const updatedItems = [...prev];

      // ensure numeric values are stored as numbers

      const updatedValues =
        name === "quantity" || name === "price" ? Number(value) : value;

      updatedItems[index] = {
        ...updatedItems[index],
        [name]: updatedValues,
      };

      // calculate total

      updatedItems[index].total =
        Number(updatedItems[index].quantity) *
        Number(updatedItems[index].price);

      return updatedItems;
    });
  };

  // add items

  const addItemHandler = () => {
    setItems([...items, { itemName: "", quantity: 0, price: 0, total: 0 }]);
  };

  // handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData, "form data");
  };
  return (
    <form onSubmit={handleFormSubmit} className="relative">
      <h2 className="hm-bold mb-10">New Invoice</h2>
      {/* bill from */}
      <div className="flex flex-col gap-7">
        <h3 className="hs-bold-variant text-primary-500 mb-3">Bill From</h3>

        {/* street address */}
        <div className="flex flex-col gap-4 col-span-2">
          <label
            className="body-variant text-m text-muted-blues-200_muted-blues-100"
            htmlFor="senders-street-address"
          >
            Street Address
          </label>
          <input
            className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
            id="senders-street-address"
            name="sendersStreetAddress"
            type="text"
            value={formData.sendersStreetAddress}
            onChange={inputHandler}
          />
        </div>

        {/* grid layout for country */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-7">
          {/* city */}
          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="senders-city"
            >
              City
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="senders-citycity"
              name="sendersCity"
              type="text"
              value={formData.sendersCity}
              onChange={inputHandler}
            />
          </div>

          {/* postcode */}
          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="senders-postcode"
            >
              Postcode
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="senders-postcode"
              name="sendersPostcode"
              type="text"
              value={formData.sendersPostcode}
              onChange={inputHandler}
            />
          </div>

          {/* country */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="senders-country"
            >
              Country
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="senders-country"
              name="sendersCountry"
              type="text"
              value={formData.sendersCountry}
              onChange={inputHandler}
            />
          </div>
        </div>
      </div>
      {/* bill to */}
      <div className="py-10 flex flex-col gap-7">
        <h3 className="hs-bold-variant text-primary-500 mb-3">Bill To</h3>
        {/* grid layout */}

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
            name="clientName"
            type="text"
            value={formData.clientName}
            onChange={inputHandler}
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
            name="clientEmail"
            type="text"
            value={formData.clientEmail}
            onChange={inputHandler}
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
            name="clientStreetAddress"
            type="text"
            value={formData.clientStreetAddress}
            onChange={inputHandler}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-7">
          {/* client city */}

          <div className="flex flex-col gap-4">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="client-city"
            >
              City
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-city"
              name="clientCity"
              type="text"
              value={formData.clientCity}
              onChange={inputHandler}
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
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-postcode"
              name="clientPostcode"
              type="text"
              value={formData.clientPostcode}
              onChange={inputHandler}
            />
          </div>

          {/* client country */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <label
              className="body-variant text-m text-muted-blues-200_muted-blues-100"
              htmlFor="client-country"
            >
              Country
            </label>
            <input
              className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
              id="client-country"
              name="clientCountry"
              type="text"
              value={formData.clientCountry}
              onChange={inputHandler}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-7 md:gap-6">
          {/* invoice date */}

          <div className="md:w-full flex flex-col gap-4 col-span-2">
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
          <div className="md:w-full flex flex-col gap-4 col-span-2">
            <p className="body-variant text-m text-muted-blues-200_muted-blues-100">
              Payment Terms
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full hover:cursor-pointer flex items-center justify-between border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-5 rounded-[4px] bg-light-100_dark-300">
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
            name="projectDescription"
            type="text"
            value={formData.projectDescription}
            onChange={inputHandler}
          />
        </div>
      </div>
      {/* Item list */}
      <div className="pb-10">
        <h2 className="text-[18px] font-bold text-[#777f98] my-10">
          Items List
        </h2>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 md:grid-cols-6 items-start gap-x-5 gap-y-7 pb-8"
          >
            {/* item name */}
            <div className="flex flex-col gap-4 col-span-4 md:col-span-2">
              <label
                className="body-variant text-m text-muted-blues-200_muted-blues-100"
                htmlFor={`item-name-${index}`}
              >
                Item Name
              </label>
              <input
                className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
                id={`item-name-${index}`}
                name="itemName"
                type="text"
                value={item.itemName}
                onChange={(e) => itemChangeHandler(e, index)}
              />
            </div>
            {/* quantity */}
            <div className="flex flex-col gap-4">
              <label
                className="body-variant text-m text-muted-blues-200_muted-blues-100"
                htmlFor="quantity"
              >
                Qty
              </label>
              <input
                className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
                id="quantity"
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => itemChangeHandler(e, index)}
              />
            </div>
            {/* price */}
            <div className="flex flex-col gap-4">
              <label
                className="body-variant text-m text-muted-blues-200_muted-blues-100"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300"
                id="price"
                name="price"
                type="number"
                value={item.price}
                onChange={(e) => itemChangeHandler(e, index)}
              />
            </div>
            {/* Total */}
            <div className="flex flex-col gap-7">
              <p className="body-variant text-m text-muted-blues-200_muted-blues-100">
                Total
              </p>
              <p className="hs-bold-variant text-muted-blues-200">
                {item.total}
              </p>
            </div>
            {/* delete */}
            <button className="justify-self-end">
              <Image
                src="/assets/icon-delete.svg"
                alt="delete"
                height={15}
                width={15}
              />
            </button>
          </div>
        ))}

        <CustomButton
          className="w-full mt-6"
          label="+ Add New Item"
          buttonStyle="button-6"
          addItemHandler={addItemHandler}
          action="add-item"
        />
      </div>
      {/* edit/delete options for mobile */}
      <div className=" w-full py-6  flex items-center justify-between sticky bottom-0 bg-light-100_dark-200">
        <CustomButton buttonStyle="button-3" label="Discard" />
        <div className="flex gap-3">
          <CustomButton buttonStyle="button-4" label="Save as Draft" />
          <CustomButton
            buttonType="submit"
            buttonStyle="button-2"
            label="Save & Send"
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
