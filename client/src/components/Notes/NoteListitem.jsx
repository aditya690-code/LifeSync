import { Calendar, Trash2 } from "lucide-react";
import React from "react";

const NoteListitem = ({ data }) => {
  const date = data.createdAt;

  return (
    <div className="bg-gray-200 cursor-pointer h-fit py-4 my-2 w-full px-12 flex justify-between group">
      <div className="flex flex-col items-start justify-center gap-1">
        <h2 className="text-md">{data.title}</h2>
        <div className="flex gap-2 items-center text-xs text-gray-500">
          <p className="flex text-xs items-center justify-center gap-0.5">
            <Calendar size={10} />
            {date.date}/ {date.month}/ {date.year}
          </p>
          <p className="text-xs">{data.content}</p>
        </div>
      </div>
      <button className="bg--300 pr-4 cursor-pointer opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 active:scale-90 group-hover:opacity-80">
        <Trash2 size={20} className="text-red-500" />
      </button>
    </div>
  );
};

export default NoteListitem;
