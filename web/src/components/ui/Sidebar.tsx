import React, { useState } from "react";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [loader, setLoader] = useState(true);
  return (
    <>
      <div className="py-8">
        <h2 className="text-2xl font-semibold text-open-dark">SUBSCRIBES</h2>
        {loader ? <ul className="pr-4 py-4 space-y-4"></ul> : null}
      </div>
    </>
  );
};
