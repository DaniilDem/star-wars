import React from "react";

export interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      {children}
    </div>
  );
}

export default DefaultLayout;
