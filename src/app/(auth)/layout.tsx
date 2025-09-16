import React from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className=" bg-muted min-h-svh flex items-center justify-center p-6 md:p-10 flex-col">
      <div className=" w-full md:max-w-3xl max-w-sm">{children}</div>
    </div>
  );
};

export default Layout;
