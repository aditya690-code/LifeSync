import React from "react";
import NoteListitem from "./NoteListitem";

const NotesList = ({ data }) => {
  return (
    <div className="bg--500 h-[calc(100vh-8rem)] w-full 
                    overflow-y-auto no-scrollbar px-3 py-2 no-scrollbar">
      {data.map((item) => (
        <NoteListitem key={item._id} data={item} />
      ))}
    </div>
  );
};

export default NotesList;