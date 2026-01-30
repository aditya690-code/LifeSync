import { Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { handleLayout } from "../../services/function";
import SearchBar from "../shared/SearchBar";
import Layout from "../shared/Layout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NotesUpper = ({
  setForm,
  layout,
  setLayout,
  setActiveNote,
  setAnyNote,
}) => {
  const [icon, setIcon] = useState(true);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);
  const layoutRef = useRef(null);

  useEffect(() => {
    setAnyNote(false);
    setActiveNote({});
    setForm(false);
    setIcon(true);
  }, [layout]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(
      searchRef.current,
      {
        x: 200,
        duration: 0.4,
        autoAlpha: 0,
      },
      "+=1",
    )
      .from(".note-lay", { x: 200, duration: 0.4, autoAlpha: 0 })
      .from(layoutRef.current, { x: 200, duration: 0.2, autoAlpha: 0 })
      .fromTo(".note-add-btn", { x: 200 }, { x: 0, duration: 0.2 });
  }, [layout]);

  return (
    <div className="w-full flex justify-end h-13 overflow-hidden">
      {/* Nav left */}
      <div className="left flex items-center justify-evenly w-1/2 h-full gap-4 py-2 pr-12">
        {/* Search */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          ref={searchRef}
        />
        {/* Layout button */}
        <div className="w-[16%] note-lay h-full border rounded overflow-hidden bg-[#f1f1f1] f1f1f1">
          <Layout
            activeLayout={layout}
            handleLayout={handleLayout}
            setActiveLayout={setLayout}
            ref={layoutRef}
          />
        </div>

        {/* Note button */}
        {
          <button
            className="note-add-btn bg-indigo-600 text-white cursor-pointer border border-indigo-600
                      active:opacity-95 active:scale-95 flex px-2 py-1 
                      items-center justify-between gap-1 transition-all duration-300 rounded h-full"
            onClick={() => {
              setIcon((prev) => !prev);
              layout === "grid"
                ? setForm((prev) => !prev)
                : setActiveNote(
                    { title: "", content: "" },
                    setAnyNote((prev) => !prev),
                  );
            }}
          >
            {icon ? (
              // Plus icon
              <Plus size={20} />
            ) : (
              // Cut icon
              <X size={20} />
            )}
          </button>
        }
      </div>
    </div>
  );
};

export default NotesUpper;
