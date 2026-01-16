import React, { useState } from "react";
import NotesUpper from "../components/Notes/NotesUpper";
import NotesForm from "../components/Notes/NotesForm";

const Notes = () => {
  const [form, setForm] = useState(true);
  return (
    <div className="no-scrollbar">
      <NotesUpper setForm={setForm} />
      <NotesForm form={form} setForm={setForm} />
    </div>
  );
};

export default Notes;
