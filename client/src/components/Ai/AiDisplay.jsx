import React from "react";

const AiDisplay = ({ messages = [],loading }) => {
  console.log(messages);
  return (
    // CHAT DISPLAY 
    <div className="display flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg, i) => (
        <p
          key={i}
          className={`max-w-[80%] w-fit px-4 py-2 rounded-lg text-sm wrap-break-words whitespace-normal ${
            msg.role === "user"
              ? "bg-gray-200 text-black self-end ml-auto"
              : "bg-indigo-600 text-white"
          }`}
        >
          {msg.text}
        </p>
      ))}

      {loading && <p className="text-sm text-gray-500 italic">Thinking…</p>}
    </div>
  );
};

export default AiDisplay;
