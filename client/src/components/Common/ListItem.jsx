import { Calendar, Trash2 } from "lucide-react";
import React from "react";

const ListItem = ({ data }) => {
    return (
        // List item
        <div className="task-item w-full px-12 py-3 bg-gray-200 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
            {/* Text section */}
            <div className="flex items-center gap-3 flex-1 py-3">
                {/* Checkbox */}
                <input
                type="checkbox"
                checked={data.isDone}
                onChange={() => console.log("toggle")}
                className="
                            h-5 w-5 rounded-full
                            cursor-pointer
                            appearance-none
                        bg-gray-300
                        checked:bg-indigo-600
                            transition-all
                            duration-100
                            checked:scale-110
                            focus:ring-0
                        "
                />
                {/* List infos */}
                <div>
                    {/* List title  */}
                    <h2 className="font-medium">{data.title}</h2>
                    {/* List date,description */}
                    <div className="text-gray-400 text-xs flex gap-2">
                        <p className="flex items-center gap-0">
                            <Calendar size={18} className="p-1" />
                            {data.createdAt.date}/{data.createdAt.month + 1}/
                            {data.createdAt.year}
                        </p>
                        <p>{data.content}</p>
                    </div>
                </div>
            </div>

            {/* Trash button */}
            <button>
                <Trash2
                size={20}
                className="text-red-400 hover:text-red-500 active:scale-90 transition cursor-pointer"
                />
            </button>
        </div>
    );
};

export default ListItem;
