import React from "react";
import NoteListitem from "./NoteListitem";

const NotesGrid = ({ data }) => {
  return (
    <div className="h-[calc(100vh-7.5rem)] w-full bg-gray-600 overflow-y-auto no-scrollbar px-15 py-4
      grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 grid-rows-3">
      {data.map((item, i) => {
        return (
          // <NoteListitem data={item} key={i} />
          <h2 className="bg-red-400">item</h2>
        )
      })}
    </div>
  );
};

export default NotesGrid;
