import { useState } from "react";
import { BotMessageSquare, Send, Maximize2, Minimize2, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import callGemini from "../api/Gemini";
import { useEffect } from "react";
import AiNav from "../components/Ai/AiNav";
import { scrollToBottom } from "../services/function";
import AiForm from "../components/Ai/AiForm";

const Ai = () => {
  const [panalActive, setPanalActive] = useState(false);
  const [error,setError] = useState(false);
  const [maximizeBtn, setMaximizeBtn] = useState(false);
  useGSAP(
    () => {
      if (!panalActive) return;
      const tl = gsap.timeline();
      tl.to(".bubble", {
        scale: 350,
        duration: 0.9,
        ease: "power3.out",
      })



        .from(".input-p", {
          y: 400,
          duration: 0.6,
          autoAlpha: 0,
          stagger: 0.15,
        });
    },
    { dependencies: [panalActive] }
  );

  function setPanel() {
    if (!panalActive) {
      setPanalActive(true);
    } else {
      setPanalActive(false);
    }
  }





  useEffect(() => {
    if (!panalActive) return;
    const userP = document.createElement("p");
    userP.classList.add("chat-bot");
    userP.innerText = "  Welcome! How can I assist you today?";
    document.querySelector(".display").appendChild(userP);
    scrollToBottom();
  }, [panalActive]);

  return (
    <div className="botBox">
      {panalActive && (
        <div className="w-1/4 h-[75%] fixed right-16 bottom-16 rounded-2xl overflow-hidden z-10">
          {/* Bubble */}
          <div
            className="
            bubble 
            absolute right-0 bottom-0 
            w-1 h-1
            bg-[#f6f6f6d4] shadow-2xl border-2 border-transparent rounded-full z-12
          "
          ></div>

          {/* Inputs */}
          <div className="absolute top-0 left-0 h-full w-full z-20 flex flex-col">
            {/* Nav */}
            <AiNav error={error} setPanel={setPanel} maximizeBtn={maximizeBtn} btns={true} setMaximizeBtn={setMaximizeBtn} />
            {/* Display */}
            <div className="display sticky bottom-0 w-full flex flex-col gap-2 bg-transparent flex-1 py-2 px-4 overflow-y-scroll no-scrollbar"></div>
            {/* Input section */}
            <div className="h-20 py-2">
              <AiForm setError={setError} />
            </div>
          </div>
        </div>
      )}
      {/* Bot button section */}
      <div
        onClick={() => setPanel()}
        className="
              p-4 rounded-full text-white
              fixed bottom-4 right-4 z-30
              bg-indigo-600 cursor-pointer active:scale-95 active:opacity-95
        "
      >
        <BotMessageSquare size={30} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Ai;
