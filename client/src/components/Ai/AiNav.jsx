import { BotMessageSquare, Maximize2, X } from "lucide-react";
import React from "react";
import Tab from "../service/Tab";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AiNav = ({ maximizeBtn, setPanel, error, btns }) => {
  useGSAP(() => {
    gsap.from(".ai-nav", {
      y: -400,
      duration: 0.6,
      autoAlpha: 0,
    });
  });

  return (
    <div
      className="ai-nav w-full
                animate-slide-up 
                bg-linear-to-r 
                from-indigo-600 
                to-purple-600
                h-16 pl-6
                
                flex items-center justify-between
            "
    >
      <span className="p-2 bg-[#ffffff7b] text-white rounded-full">
        <BotMessageSquare size={20} />
      </span>

      <div className="h-full px-4 flex flex-col justify-center leading-5 items-start">
        <h2 className="w-full font-medium text-white">Active Assistant</h2>
        <div className="text-xs text-gray-300 flex items-center justify-start w-fit pl-3">
          <p
            className={`${error == true ? "bg-red-500" : "bg-green-400 "} w-2 h-2 rounded-full animate-pulsepulse`}
          ></p>
          <p className="pl-1 text-[10px]">
            {error ? "Offline" : "Online(Local)"}
          </p>
        </div>
      </div>
      {btns == true ? (
        <div className="flex flex-1 items-center justify-end pr-4 text-white gap-3">
          {!maximizeBtn && (
            <Tab
              label={
                <Maximize2
                  size={20}
                  className="cursor-pointer hover:opacity-75 hover:scale-110 p-0.5"
                />
              }
              route={"/chatbot"}
            />
          )}
          <X
            onClick={() => setPanel()}
            size={20}
            className="cursor-pointer active:scale-90 active:opacity-85"
          />
        </div>
      ) : (
        <div className="flex-1"></div>
      )}
    </div>
  );
};

export default AiNav;
