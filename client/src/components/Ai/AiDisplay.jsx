import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

const AiDisplay = ({ loading }) => {
  const { chats } = useSelector((state) => state.chatbot);

  useEffect(() => {
    if (!loading) return;

    const dots = document.querySelectorAll(".blink");
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 0.3, ease: "power1.inOut" },
    });

    dots.forEach((dot, i) => {
      tl.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, repeat: 1, yoyo: true, delay: i * 0.2 },
        0,
      );
    });

    return () => tl.kill();
  }, [loading]);

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
        <div className="flex gap-1 p-1 px-2 rounded-2xl bg-gray-300 w-fit">
          {/* Thinking… | italic text-sm text-gray-500 */}
          <div className="h-2 w-2 bg-gray-500 rounded-full blink"></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full blink"></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full blink"></div>
        </div>
      )}
    </div>
  );
};

export default AiDisplay;
