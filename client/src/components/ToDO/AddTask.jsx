import React, { useState } from "react";

const AddTask = ({ handleTaskForm, formRef }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div
      ref={formRef}
      className="overflow-hidden w-screen flex gap-3 px-4 pr-20"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none w-1/4"
      />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="Description"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none flex-1"
      />
      <button
        onClick={() => handleTaskForm(title, content)}
        className="bg-indigo-600 text-white py-1 rounded-md hover:bg-indigo-700 px-5"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
