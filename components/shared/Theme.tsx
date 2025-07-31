import Image from "next/image";
import React from "react";

const Theme = () => {
  return (
    <button>
      <Image
        src="/assets/icon-moon.svg"
        alt="dark-theme"
        height={20}
        width={20}
      />
    </button>
  );
};

export default Theme;
