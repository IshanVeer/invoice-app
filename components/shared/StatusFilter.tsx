"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { useInvoiceForm } from "@/context/InvoiceProvider";

const StatusFilter = () => {
  const statuses = [
    { name: "Darft", value: "draft" },
    { name: "Pending", value: "pending" },
    { name: "Paid", value: "paid" },
  ];

  const { selectedStatuses, handleCheckboxChange } = useInvoiceForm();

  return (
    <div>
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
          {statuses.map((status) => (
            <DropdownMenuItem
              className="flex items-center gap-4 py-2 hover:bg-transparent"
              key={status.value}
              onSelect={(e) => e.preventDefault()}
            >
              <label className="relative flex items-center  cursor-pointer">
                <input
                  type="checkbox"
                  className="appearance-none w-4 h-4 border border-gray-400 rounded checked:bg-primary-500 peer"
                  checked={selectedStatuses.includes(status.value)}
                  onChange={() => handleCheckboxChange(status.value)}
                />
                <span className="absolute left-0 w-4 h-4 flex items-center justify-center pointer-events-none">
                  {selectedStatuses.includes(status.value) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="hs-bold-variant text-dark-100_light-100 ml-3">
                  {status.name}
                </span>
              </label>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatusFilter;
