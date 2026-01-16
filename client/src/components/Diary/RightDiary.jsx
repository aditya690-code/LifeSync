import React, { useState, useRef } from "react";
import {
  Book,
  Save,
  Edit,
  Plus,
  X,
  User as UserIcon,
  Trash2,
  Search,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { addJournal, editJournal,setSkip, deleteJournal,setActiveDiary } from "../../redux/features/diary/diarySlice";
import { diaries as dia } from "../../services/data";


const RightDiary = () => {
  // Edit diary

  const {entry,skip,isLoading,error,searchDiary,limit,activeDiary } = useSelector((store) => store.diary);
  const diaries = entry;
  const dispatch = useDispatch();

  const [isDiaryActive, setIsDiaryActive] = useState(false);
  
  const ref = useRef();
  const listRef = useRef();
  const contentRef = useRef();


  console.log(activeDiary)

  useGSAP(
    () => {
      const tl3 = gsap.timeline();
      tl3
        .from(".left", { x: -400, delay: 0.7, autoAlpha: 0 })
        .from(".right", { x: 800, autoAlpha: 0 }, ">")
        .from(".left .header", { y: -300, autoAlpha: 0 })
        .from(
          ".head-item",
          { y: 250, scale: 0, autoAlpha: 0, stagger: 0.15 },
          "-=0.7"
        );
    },
    { scope: ref }
  );


// dispatch(addJournal());













  function addDiary() {
    setIsDiaryActive(false);
  }




  return (
        <div className="right h-full flex-1 rounded-2xl overflow-y-scroll bg-white shadow-lg shadow-white-500/50">
          {Object.keys(activeDiary).length != 0 ? (
            <div ref={contentRef} className="w-full h-full flex flex-col">
              <div className="flex justify-end pr-12 p-8 bg-[#e1e4e7]">
                <button
                  className="hover:scale-105 cursor-pointer flex items-center
                                    text-white gap-3 py-2 px-7 rounded-lg bg-indigo-700 text-md
                                    transition-transform duration-200 ease-in-out"
                  onClick={() => addDiary()}
                >
                  <Save size={18} /> Save
                </button>
              </div>
              <input
                value={activeDiary.title}
                onChange={(e) =>
                  setActiveDiary((prev) => ({ ...prev, title: e.target.value }))
                }
                type="text"
                placeholder="Title"
                className="
                                placeholder:text-[#CBD5E1] 
                                w-full 
                                text-3xl 
                                py-5 
                                pl-5 
                                outline-0 
                                border-0"
              />
              <textarea
                onChange={(e) =>
                  setActiveDiary((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                value={activeDiary.content}
                type="text"
                placeholder="Write your thoughts..."
                className="border-0 outline-0 w-full  flex-1 resize-none px-5 pl-7 pt-2 pb-4"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300 h-full w-full">
              <Book size={48} className="mb-4 opacity-20 animate-pulse" />
              <p>Select or create an entry</p>
            </div>
          )}
        </div>
  )
}

export default RightDiary;
