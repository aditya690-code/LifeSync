import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import AddTask from "./AddTask";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = ({ addTask }) => {
  const [showForm, setShowForm] = useState(false);
  // const [tasks, setTasks] = useState("pending");
  // const [view, setView] = useState("list");
  const formRef = useRef(null);

  const toggleForm = () => {
    if (!showForm) {
      setShowForm(true);
      const tl = gsap.timeline();
      tl.fromTo(
        formRef.current,
        { height: 0, opacity: 0, y: -10 },
        { height: "auto", opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    } else {
      gsap.to(formRef.current, {
        height: 0,
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setShowForm(false),
      });
    }
  };
  const tl = gsap.timeline();
  useEffect(() => {
    if (!showForm) return;

    tl.from(formRef.current.children, {
      x: 1200,
      autoAlpha: 0,
      duration: 0.6,
      scale: 0,
      stagger: 0.12,
    });
  }, [showForm]);

  const handleTaskForm = (title, content) => {
    if (title == "" || content == "") return;
    addTask(title, content);
  };

  useGSAP(() => {
    tl.from(
      ".add-contianer",
      {
        x: 200,
        y: 50,
        duration: 0.6,
        autoAlpha: 0,
        scale: 0,
      },
      "+=1"
    );
  });

  return (
    <div className="w-full flex flex-col gap-3 px-4">
      {/* Top Bar */}

      {/* Add Task Section */}
      <div className="flex justify-end w-full relative h-16 ">
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 py-0 max-w-full min-w-17 flex justify-between items-center add-contianer">
          {/* Animated Form */}
          {showForm && (
            <AddTask
              handleTaskForm={handleTaskForm}
              formRef={formRef}
              addTask={addTask}
            />
          )}
          <div className="flex justify-between items-center w-fit absolute right-4">
            <button
              onClick={toggleForm}
              className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition my-2 cursor-pointer shadow shadow-2xl"
            >
              {showForm ? (
                <X size={18} />
              ) : (
                <Plus className="plusBtn" size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

// <div className="flex items-center justify-end gap-4  py-3 rounded-lg flex-1">
//   {/* Search */}
//   <div className="flex items-center flex-1 max-w-xl bg-white border border-gray-500 rounded-md overflow-hidden">
//     <Search size={18} className="ml-3 text-gray-500" />
//     <input
//       type="text"
//       placeholder="Search tasks..."
//       className="w-full px-3 py-3 text-sm outline-none"
//     />
//   </div>

//   <div className="w-fit h-full flex gap-3">
//     {/* View Toggle */}
//     <div className="flex bg-pink-50 rounded-md border border-gray-500 p-1">
//       <button
//         className={`${
//           view === "list"
//             ? "bg-indigo-100 text-indigo-700"
//             : "text-gray-400"
//         } p-2 rounded-md cursor-pointer`}
//         onClick={() => setView("list")}
//       >
//         <List size={18} />
//       </button>
//       <button
//         className={`${
//           view === "grid"
//             ? "bg-indigo-100 text-indigo-700"
//             : "text-gray-400"
//         } p-2 rounded-md cursor-pointer`}
//         onClick={() => setView("grid")}
//       >
//         <LayoutGrid size={18} />
//       </button>
//     </div>

//     {/* Filters */}
//     <div className="w-fit flex gap-1 p-1 bg-gray-50 mr-3 rounded-md px-2 border border-gray-500 ">
//       <button
//         onClick={() => setTasks("pending")}
//         className={`${
//           tasks == "pending" ? "bg-indigo-500 text-white" : ""
//         } cursor-pointer px-4 py-2 text-sm rounded-md `}
//       >
//         Pending
//       </button>
//       <button
//         onClick={() => setTasks("history")}
//         className={`${
//           tasks == "history" ? "bg-green-500 text-white" : ""
//         } cursor-pointer px-4 py-2 text-sm rounded-md `}
//       >
//         History
//       </button>
//       <button onClick={()=> setTasks('inbox')} className={`${tasks == 'inbox' ? 'bg-gray-700 text-white':''} cursor-pointer px-4 py-2 text-sm rounded-md `}>
//         Inbox
//       </button>
//     </div>
//   </div>
// </div>
