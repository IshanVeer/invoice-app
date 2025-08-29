"use client";
import React, { useEffect, useState } from "react";
import { format, setDate } from "date-fns";
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
import { createInvoice, editInvoice } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import { InvoiceProps } from "@/types";
import { useInvoiceForm } from "@/context/InvoiceProvider";
import { useRouter } from "next/navigation";

interface InvoiceFormProps {
  mode?: "edit";
  invoice?: InvoiceProps;
}

const InvoiceForm = ({ mode, invoice }: InvoiceFormProps) => {
  const { userId } = useAuth();
  const { setOpenInvoiceForm } = useInvoiceForm();
  const router = useRouter();

  const paymentTermsData = [
    { label: "Net 1 day", value: 1 },
    { label: "Net 7 days", value: 7 },
    { label: "Net 14 days", value: 14 },
    { label: "Net 30 days", value: 30 },
  ];

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [paymentTerms, setPaymentTerms] = useState(7);
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    if (mode === "edit" && invoice) {
      setFormData({
        sendersStreetAddress: invoice.senderAddress.street || "",
        sendersCity: invoice.senderAddress.city || "",
        sendersPostcode: invoice.senderAddress.postCode || "",
        sendersCountry: invoice.senderAddress.country || "",
        clientName: invoice.clientName || "",
        clientEmail: invoice.clientEmail || "",
        clientStreetAddress: invoice.clientAddress.street || "",
        clientCity: invoice.clientAddress.city || "",
        clientPostcode: invoice.clientAddress.postCode || "",
        clientCountry: invoice.clientAddress.country || "",
        projectDescription: invoice.description || "",
      });
      setPaymentTerms(invoice.paymentTerms);
      setItems(invoice.items);
      setDate(invoice.createdAt);
    }
  }, [mode, invoice]);

  // validation rules

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "sendersStreetAddress":
      case "clientStreetAddress":
        if (!value.trim()) return "Street address is required";
        if (value.trim().length < 3)
          return "Street address must be atleast 5 characters";
        return "";

      case "sendersCity":
      case "clientCity":
        if (!value.trim()) return "City is required";
        if (value.trim().length < 2) return "City must be atleast 2 characters";
        if (!/^[a-zA-Z\s\-\.]+$/.test(value))
          return "City can only contain letters, spaces, hyphens, and periods";
        return "";

      case "sendersPostcode":
      case "clientPostcode":
        if (!value.trim()) return "Postcode is required";
        if (!/^[0-9A-Za-z\s-]{3,10}$/.test(value))
          return "Enter a valid postcode (3–10 characters)";
        return "";

      case "sendersCountry":
      case "clientCountry":
        if (!value.trim()) return "Country is required";
        if (value.trim().length < 2)
          return "Country must be atleast 2 characters";
        if (!/^[a-zA-Z\s\-\.]+$/.test(value))
          return "Country can only contain letters, spaces, hyphens, and periods";
        return "";

      case "clientName":
        if (!value.trim()) return "Client name is required";
        if (value.trim().length < 2)
          return "Name should be atleast 2 characters";
        return "";

      case "clientEmail":
        if (!value.trim()) return "email address is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address";
        return "";

      case "projectDescription":
        if (!value.trim()) return "Project description is required";
        if (value.trim().length < 5)
          return " Project description must be atleast 5 characters";
        return "";

      case "itemName":
        if (!value.trim()) return "Item name is required";
        if (value.trim().length < 2)
          return "Item name must be atleast 2 characters";
        return "";

      case "quantity":
        const qty = Number(value);
        if (isNaN(qty) || qty <= 0) return "Quantity must be greater than 0";
        return "";

      case "price":
        const price = Number(value);
        if (isNaN(price) || price <= 0) return "Price must be greater than 0";
        return "";

      default:
        return "";
    }
  };

  // validate form data

  const validateFormData = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = [
      "sendersStreetAddress",
      "sendersCity",
      "sendersPostcode",
      "sendersCountry",
      "clientName",
      "clientEmail",
      "clientStreetAddress",
      "clientCity",
      "clientPostcode",
      "clientCountry",
      "projectDescription",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  // validate items data

  const validateItemsData = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    const itemFieldsToValidate = ["itemName", "quantity", "price"];

    items.forEach((item, index) => {
      itemFieldsToValidate.forEach((field) => {
        const error = validateField(
          field,
          String(item[field as keyof typeof item])
        );

        if (error) {
          // use unique key to avoid overwriting
          newErrors[`${index}-${field}`] = error;
        }
      });
    });

    return newErrors;
  };

  const validateForm = (): boolean => {
    const formErrors = validateFormData();
    const itemErrors = validateItemsData();

    const newErrors = { ...formErrors, ...itemErrors };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle form input
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error when user starts typing

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // real-time validation for better UX

    if (touched[name]) {
      const error = validateField(name, value);

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
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

    const errorKey = `${index}-${name}`;

    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: "",
      }));
    }

    // real-time validation for better UX

    if (touched[errorKey]) {
      const error = validateField(name, value);

      setErrors((prev) => ({
        ...prev,
        [errorKey]: error,
      }));
    }
  };

  const handleFormDataBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // handle item blur

  const handleItemBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const key = `${index}-${name}`;

    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  };

  // add items

  const addItemHandler = () => {
    setItems([...items, { itemName: "", quantity: 0, price: 0, total: 0 }]);
  };

  const removeItemHandler = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const buildInvoicePayload = () => {
    if (!date || !userId) return;

    const paymentDue = new Date(date);
    paymentDue.setDate(paymentDue.getDate() + paymentTerms);

    return {
      clerkId: userId,
      createdAt: date,
      paymentDue: paymentDue,
      description: formData.projectDescription,
      paymentTerms: paymentTerms,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      status: "draft",
      senderAddress: {
        street: formData.sendersStreetAddress,
        city: formData.sendersCity,
        postCode: formData.sendersPostcode,
        country: formData.sendersCountry,
      },
      clientAddress: {
        street: formData.clientStreetAddress,
        city: formData.clientCity,
        postCode: formData.clientPostcode,
        country: formData.clientCountry,
      },
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
      isDraft: isDraft,
    };
  };

  // handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields = [
      "sendersStreetAddress",
      "sendersCity",
      "sendersPostcode",
      "sendersCountry",
      "clientName",
      "clientEmail",
      "clientStreetAddress",
      "clientCity",
      "clientPostcode",
      "clientCountry",
      "projectDescription",
    ];

    const newTouched: Record<string, boolean> = {};

    allFields.forEach((field) => {
      newTouched[field] = true;
    });

    items.forEach((_, index) => {
      newTouched[`${index}-itemName`] = true;
      newTouched[`${index}-quantity`] = true;
      newTouched[`${index}-price`] = true;
    });

    setTouched(newTouched);

    if (!isDraft) {
      const isFormValid = validateForm();

      if (!isFormValid) {
        console.log("Form inputs have error");
        return;
      }
    }

    try {
      const payload = buildInvoicePayload();

      if (!payload) {
        return;
      }

      const result =
        mode === "edit"
          ? await editInvoice({
              invoiceId: invoice?._id,
              updatedInvoiceData: payload,
            })
          : await createInvoice(payload);
      if (!result) {
        console.log("form submission failed");
      } else {
      }
    } catch (error) {
      console.log("error in submitting form", error);
      throw error;
    }

    setOpenInvoiceForm(null);
    router.refresh();
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses =
      "border border-muted-blues-100 dark:border-dark-400 outline-0 hs-bold-variant text-dark-100_light-100 px-5 py-4 rounded-[4px] bg-light-100_dark-300";

    const hasErrors = errors[fieldName];

    if (hasErrors) {
      return `${baseClasses} border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500`;
    }
    return baseClasses;
  };
  return (
    <form onSubmit={handleFormSubmit} className="relative">
      {mode === "edit" ? (
        <h2 className="hm-bold mb-10">
          <span className="mr-2">Edit </span> # {invoice?._id}
        </h2>
      ) : (
        <h2 className="hm-bold mb-10">New Invoice</h2>
      )}

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
            className={getInputClasses("sendersStreetAddress")}
            id="senders-street-address"
            name="sendersStreetAddress"
            type="text"
            value={formData.sendersStreetAddress}
            onChange={inputHandler}
            onBlur={handleFormDataBlur}
          />
          {errors.sendersStreetAddress && (
            <p className="text-red-500 text-sm">
              {errors.sendersStreetAddress}
            </p>
          )}
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
              className={getInputClasses("sendersCity")}
              id="senders-citycity"
              name="sendersCity"
              type="text"
              value={formData.sendersCity}
              onChange={inputHandler}
              onBlur={handleFormDataBlur}
            />
            {errors.sendersCity && (
              <p className="text-red-500 text-sm">{errors.sendersCity}</p>
            )}
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
              className={getInputClasses("sendersPostcode")}
              id="senders-postcode"
              name="sendersPostcode"
              type="text"
              value={formData.sendersPostcode}
              onChange={inputHandler}
              onBlur={handleFormDataBlur}
            />
            {errors.sendersPostcode && (
              <p className="text-red-500 text-sm">{errors.sendersPostcode}</p>
            )}
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
              className={getInputClasses("sendersCountry")}
              id="senders-country"
              name="sendersCountry"
              type="text"
              value={formData.sendersCountry}
              onChange={inputHandler}
              onBlur={handleFormDataBlur}
            />
            {errors.sendersCountry && (
              <p className="text-red-500 text-sm">{errors.sendersCountry}</p>
            )}
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
            className={getInputClasses("clientName")}
            id="client-name"
            name="clientName"
            type="text"
            value={formData.clientName}
            onChange={inputHandler}
            onBlur={handleFormDataBlur}
          />
          {errors.clientName && (
            <p className="text-red-500 text-sm">{errors.clientName}</p>
          )}
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
            className={getInputClasses("clientEmail")}
            id="client-email"
            name="clientEmail"
            type="text"
            value={formData.clientEmail}
            onChange={inputHandler}
            onBlur={handleFormDataBlur}
          />
          {errors.clientEmail && (
            <p className="text-red-500 text-sm">{errors.clientEmail}</p>
          )}
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
            className={getInputClasses("clientStreetAddress")}
            id="client-street-address"
            name="clientStreetAddress"
            type="text"
            value={formData.clientStreetAddress}
            onChange={inputHandler}
            onBlur={handleFormDataBlur}
          />
          {errors.clientStreetAddress && (
            <p className="text-red-500 text-sm">{errors.clientStreetAddress}</p>
          )}
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
              className={getInputClasses("clientCity")}
              id="client-city"
              name="clientCity"
              type="text"
              value={formData.clientCity}
              onChange={inputHandler}
              onBlur={handleFormDataBlur}
            />
            {errors.clientCity && (
              <p className="text-red-500 text-sm">{errors.clientCity}</p>
            )}
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
              className={getInputClasses("clientPostcode")}
              id="client-postcode"
              name="clientPostcode"
              type="text"
              value={formData.clientPostcode}
              onChange={inputHandler}
              onBlur={handleFormDataBlur}
            />
            {errors.clientPostcode && (
              <p className="text-red-500 text-sm">{errors.clientPostcode}</p>
            )}
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
              className={getInputClasses("clientCountry")}
              id="client-country"
              name="clientCountry"
              type="text"
              value={formData.clientCountry}
              onChange={inputHandler}
              onBlur={handleFormDataBlur}
            />
            {errors.clientCountry && (
              <p className="text-red-500 text-sm">{errors.clientCountry}</p>
            )}
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
                <p>{`Net ${paymentTerms} ${
                  paymentTerms === 1 ? "Day" : "Days"
                }`}</p>
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
                    onSelect={() => setPaymentTerms(payment.value)}
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
            className={getInputClasses("projectDescription")}
            id="project-description"
            name="projectDescription"
            type="text"
            value={formData.projectDescription}
            onChange={inputHandler}
            onBlur={handleFormDataBlur}
          />
          {errors.projectDescription && (
            <p className="text-red-500 text-sm">{errors.projectDescription}</p>
          )}
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
                className={getInputClasses(`${index}-itemName`)}
                id={`item-name-${index}`}
                name="itemName"
                type="text"
                value={item.itemName}
                onChange={(e) => itemChangeHandler(e, index)}
                onBlur={(e) => handleItemBlur(e, index)}
              />
              {errors[`${index}-itemName`] && (
                <p className="text-red-500 text-sm">
                  {errors[`${index}-itemName`]}
                </p>
              )}
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
                className={getInputClasses(`${index}-quantity`)}
                id={`quantity-${index}`}
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => itemChangeHandler(e, index)}
                onBlur={(e) => handleItemBlur(e, index)}
              />
              {errors[`${index}-quantity`] && (
                <p className="text-red-500 text-sm">
                  {errors[`${index}-quantity`]}
                </p>
              )}
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
                className={getInputClasses(`${index}-price`)}
                id={`price-${index}`}
                name="price"
                type="number"
                value={item.price}
                onChange={(e) => itemChangeHandler(e, index)}
                onBlur={(e) => handleItemBlur(e, index)}
              />
              {errors[`${index}-price`] && (
                <p className="text-red-500 text-sm">
                  {errors[`${index}-price`]}
                </p>
              )}
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
            <button
              onClick={() => removeItemHandler(index)}
              className="justify-self-end cursor-pointer"
            >
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
          <CustomButton
            buttonType="submit"
            buttonStyle="button-4"
            setIsDraft={() => setIsDraft(true)}
            label="Save as Draft"
          />
          <CustomButton
            buttonType="submit"
            buttonStyle="button-2"
            setIsDraft={() => setIsDraft(false)}
            label={mode === "edit" ? "Save Changes" : "Save & Send"}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
