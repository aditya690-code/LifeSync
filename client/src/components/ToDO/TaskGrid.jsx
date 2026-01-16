import { Calendar, Calendar1, Trash2 } from "lucide-react";
import React from "react";

const TaskGrid = ({ data }) => {
  return (
    <div className="w-full max-h-full grid grid-cols-3 gap-4 px-8 pt-6  overflow-hidden overflow-y-auto no-scrollbar pb-12">
      {data.map((task, i) => {
        return (
          <div
            className="px-4 py-3 bg-gray-200 rounded-2xl flex items-center justify-start gap-2 group"
            key={i}
          >
            <div className="h-full pt-3 bg-purple-00 mr-1">
              <input
                onChange={() => console.log("hello")}
                checked={task.isDone}
                type="checkbox"
                className="
                  w-5 h-5
                  rounded-full
                  cursor-pointer
                  appearance-none
                  border-0
                  outline-none
                bg-gray-300
                checked:bg-indigo-600
                  transition-all  
                  duration-50
                  ease-out
                  checked:scale-110
                  focus:ring-0
                  "
              />
            </div>

            <div className="taskInfo py-5 flex flex-wrap max-w-[80%] flex-col justify-center gap-1 flex-1 ">
              <h2 className="text-lg font-medium w-full">{task.title}</h2>
              <p className="text-xs text-gray-500 pl-1 flex gap-2">
                <span className="flex gap-0 pl-1">
                  <Calendar size={15} className="p-0.5" />
                  {task.createdAt.date}/ {task.createdAt.month}/{" "}
                  {task.createdAt.year}
                </span>
                {task.content}
              </p>
            </div>

            <button className="text-red-400 cursor-pointer active:scale-90 transition-all duration-300 hover:text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TaskGrid;
