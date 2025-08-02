import LeftSideBar from "@/components/shared/LeftSideBar";
import MobileNav from "@/components/shared/MobileNav";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <MobileNav />
      <div className="flex h-screen">
        <LeftSideBar />
        <section className="flex-1 overflow-auto">{children}</section>
      </div>
    </main>
  );
};

export default Layout;
