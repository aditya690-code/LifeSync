import React from "react";
import NoteGriditem from "./NoteGriditem";

const NotesGrid = ({ data }) => {
  return (
    <div
      className="h-[calc(100vh-7.5rem)] w-full overflow-y-auto px-4 py-4 no-scrollbar"
    >
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data.map((item, i) => (
          <NoteGriditem data={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default NotesGrid;
