import React from "react";
import NoteListitem from "./NoteListitem";

const NotesList = ({ data }) => {
  console.log(data);
  return (
    <div className="bg-gray-500 h-[100vh-4rem] w-full">
      {data.map((item, i) => {
        return (
          <NoteListitem data={item} key={i} />
        );
      })}
    </div>
  );
};

export default NotesList;
