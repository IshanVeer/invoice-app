import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      {/* Custom test credentials display */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">
          Test Credentials
        </h3>
        <p className="text-sm text-blue-700">Email: ishantest@gmail.com</p>
        <p className="text-sm text-blue-700">Password: Ishan@135</p>
      </div>

      <SignUp />
    </div>
  );
};

export default Page;
