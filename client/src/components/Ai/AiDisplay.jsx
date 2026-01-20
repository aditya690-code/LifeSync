import React from "react";
import { useSelector } from "react-redux";

const AiDisplay = ({ loading }) => {
  const { chats } = useSelector((state) => state.chatbot);
  loading = true;
  return (
    // CHAT DISPLAY
    <div className="display flex-1 overflow-y-auto p-4 space-y-3">
      {/* Chatbot chats */}
      {chats.map((msg, i) => (
        <p
          key={i}
          className={`max-w-[80%] w-fit px-4 py-2 rounded-lg text-sm wrap-break-words whitespace-normal ${
            msg.role === "user"
              ? "bg-gray-200 text-black self-end ml-auto rounded-lg rounded-tr-none"
              : "bg-indigo-600 text-white rounded-lg rounded-tl-none"
          }`}
        >
          {msg.text}
        </p>
      ))}

      {/* Loader */}
      {loading && (
        <div className="flex gap-1 p-0.5 bg-gray-500"> 
          {/* Thinking… | italic text-sm text-gray-500 */}
          <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default AiDisplay;
