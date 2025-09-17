import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import DashboredSidebar from "@/module/dashbored/ui/components/dashbored-sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboredSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
