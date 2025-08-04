import React from "react";
import Image from "next/image";

interface Buttonprops {
  label: string;
  className?: string;
  buttonStyle:
    | "button-1"
    | "button-2"
    | "button-3"
    | "button-4"
    | "button-5"
    | "button-6";
}

const Button = ({ buttonStyle, label, className }: Buttonprops) => {
  return (
    <button
      className={`${
        buttonStyle === "button-1"
          ? "bg-primary-500 text-light-100 flex gap-2 items-center py-2 pr-4 pl-2"
          : buttonStyle === "button-2"
          ? "bg-primary-500 text-light-100 px-7 py-4"
          : buttonStyle === "button-3"
          ? "bg-light-300_dark-400 hover:bg-[#dfe3fa] hover:dark:bg-light-100 text-muted-blues-300_muted-blues-100 px-7 py-4"
          : buttonStyle === "button-4"
          ? "bg-[#373b53] hover:bg-dark-100 hover:dark:bg-dark-300 text-muted-blues-200_muted-blues-100 px-7 py-4 text-"
          : buttonStyle === "button-5"
          ? "bg-accent-red-500 hover:bg-accent-red-300 text-light-100 px-7 py-4"
          : buttonStyle === "button-6"
          ? "px-7 py-4 bg-light-300 text-muted-blues-300 hover:bg-[#dfe3fa]"
          : ""
      } rounded-3xl hs-bold-variant capitalize hover:cursor-pointer transition duration-150 ${className}`}
    >
      {buttonStyle === "button-1" && (
        <div className="bg-light-100 w-8 h-8 rounded-full flex items-center justify-center">
          <Image
            src="/assets/icon-plus.svg"
            alt="add"
            height={10}
            width={10}
            className="object-cover"
          />
        </div>
      )}
      <p>{label}</p>
    </button>
  );
};

export default Button;
