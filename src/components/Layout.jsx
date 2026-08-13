import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children,heading }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 p-4">
        <h4 className="font-[500] text-2xl mb-5">{heading}</h4>
        {children}
      </div>
    </div>
  );
};

export default Layout;
