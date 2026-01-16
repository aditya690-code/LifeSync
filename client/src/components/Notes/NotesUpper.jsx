import {
  LayoutGrid,
  LayoutList,
  Plus,
  SearchIcon,
  X,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { handleLayout } from "../../services/function";

const NotesUpper = ({ setForm }) => {
  const layoutStr = localStorage.getItem("layout") || "list";
  const [icon, setIcon] = useState(true);
  const [layout, setLayout] = useState(layoutStr);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-full h-fit flex justify-end">
      {/* Nav left */}
      <div className="left flex items-center justify-evenly w-1/2 h-12 gap-4 py-2 pr-12">
        {/* Search */}
        <div className="flex relative flex-1 h-full rounded bg-gray-100 items-center border border-gray-800">
          {/* Search Icon */}
          <SearchIcon
            size={30}
            className="p-1.5 rounded-l-md text-gray-950 ml-2"
          />
          {/* Search Input */}
          <input
            placeholder="Search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-100 text-gray-950 outline-none border-none pl-2 h-full flex-1 rounded-r-md pr-6"
          />
          {/* Search input clear button */}
          {searchText != "" ? (
            <XCircle
              size={16}
              onClick={() => setSearchText("")}
              className="absolute right-2 top-1/5 cursor-pointer"
            />
          ) : (
            ""
          )}
        </div>
        {/* Layout button */}
        <div className="flex gap-2 px-3 h-full py-1 bg-gray-200 border border-gray-800 rounded">
          {/* List layout icon */}
          <LayoutList
            size={25}
            onClick={() => handleLayout("list", setLayout)}
            className={`${
              layout === "list" ? "bg-white text-gray-600" : "text-gray-400"
            } p-1 rounded h-full cursor-pointer shadow-2xl`}
          />
          {/* Grid layout icon */}
          <LayoutGrid
            size={25}
            onClick={() => handleLayout("grid", setLayout)}
            className={`${
              layout === "grid" ? "bg-white text-gray-600" : "text-gray-400"
            } p-1 rounded h-full cursor-pointer shadow-2xl`}
          />
        </div>
        {/* Note button */}
        <button
          className="bg-indigo-600 text-white cursor-pointer border border-indigo-600
                      active:opacity-95 active:scale-95 flex px-4 py-1 
                      items-center justify-between gap-1 transition-all duration-300 rounded"
          onClick={() => {
            setIcon((prev) => !prev);
            setForm((prev) => !prev);
          }}
        >
          {icon ? (
            // Plus icon
            <Plus size={20} />
          ) : (
            // Cut icon
            <X size={20} />
          )}
          {/* Text */}
          Note
        </button>
      </div>
    </div>
  );
};

export default NotesUpper;
