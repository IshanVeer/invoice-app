"use client";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import React from "react";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <div className="lg:py-7 max-lg:px-4">
      {mode === "light" ? (
        <button
          className="hover:cursor-pointer"
          onClick={() => setMode("dark")}
        >
          <Image
            src="/assets/icon-moon.svg"
            alt="dark-theme"
            height={20}
            width={20}
          />
        </button>
      ) : (
        <button
          className="hover:cursor-pointer"
          onClick={() => setMode("light")}
        >
          <Image
            src="/assets/icon-sun.svg"
            alt="light-theme"
            height={20}
            width={20}
          />
        </button>
      )}
    </div>
  );
};

export default Theme;
