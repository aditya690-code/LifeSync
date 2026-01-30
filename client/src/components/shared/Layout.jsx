import { LayoutGrid, LayoutList } from "lucide-react";
import React from "react";

const Layout = ({ handleLayout, setActiveLayout, activeLayout, ref }) => {
  return (
    <div
      className="right w-full h-full flex justify-evenly items-center mr-4 bg-transparent"
      ref={ref}
    >
      <LayoutList
        onClick={() => handleLayout("list", setActiveLayout)}
        size={30}
        className={`${
          activeLayout === "list" ? "bg-white " : ""
        } cursor-pointer p-1.5 rounded-sm`}
      />
      <LayoutGrid
        onClick={() => handleLayout("grid", setActiveLayout)}
        size={30}
        className={`${
          activeLayout === "grid" ? "bg-white " : ""
        } cursor-pointer p-1.5 rounded-sm`}
      />
    </div>
  );
};

export default Layout;
