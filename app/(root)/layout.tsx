import LeftSideBar from "@/components/shared/LeftSideBar";
import MobileNav from "@/components/shared/MobileNav";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <MobileNav />
      <div className="flex">
        <LeftSideBar />
        <section>{children}</section>
      </div>
    </main>
  );
};

export default Layout;
