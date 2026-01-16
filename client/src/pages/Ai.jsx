import { useState } from "react";
import { BotMessageSquare, Send, Maximize2, Minimize2, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import callGemini from "../api/Gemini";
import { useEffect } from "react";

const Ai = () => {
  const [panalActive, setPanalActive] = useState(false);
  const [error,setError] = useState(false);
  const [maximizeBtn, _] = useState(true); //setMaximizeBtn
  const [userInput, setUserInput] = useState("");
  useGSAP(
    () => {
      if (!panalActive) return;
      const tl = gsap.timeline();
      tl.to(".bubble", {
        scale: 350,
        duration: 0.9,
        ease: "power3.out",
      })

        .from(".ai-nav", {
          y: -400,
          duration: 0.6,
          autoAlpha: 0,
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
  function scrollToBottom() {
    const el = document.querySelector(".display");
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }

  function setPanel() {
    if (!panalActive) {
      setPanalActive(true);
    } else {
      setPanalActive(false);
    }
  }

  useEffect(() => {
    if (userInput != "") {
      addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          handleUserInput();
        }
      });
    }
  },[]);

  async function handleAiForm() {
    const date = new Date();
    const systemPrompt = `
        You are LifeSync Bot. You have READ and WRITE access to the user's data.
        
        Current Data Context: {contextStr}

        You must respond in JSON format.
        
        If the user wants to perform an action, return:
        { "type": "action", "tool": "TOOL_NAME", "args": { ...arguments } }
        
        Available Tools:
        - add_expense: { amount (number), category (string), description (string) }
        - add_note: { title (string), content (string) }
        - add_diary : { title (string), content (string) }
        - add_routine: { title (string) }
        - delete_item: { type (string: 'expense'|'note'|'habit'|'diary'), id (string from context) }
        - complete_habit: { id (string), title (string) }

        If the user just wants to chat or asks a question, return:
        { "type": "message", "content": "Your response text here" }

        Important: For deletion or completing habits, you MUST find the correct ID from the 'Current Data Context' based on the user's description (e.g., 'delete the last note' -> find ID of last note). If ambiguous, ask for clarification in a message.
        User Text :${userInput}
        Today's Date : ${date}
  `;
    let response;
    try {
      const rawResponse = await callGemini(systemPrompt);
      response = JSON.parse(rawResponse.data.reply);
      setError(false);
      scrollToBottom();
    } catch (err) {
      setError(true);
      console.log(err);
      return;
    }

    const p = document.createElement("p");
    p.classList.add("chat-bot");
    if (response.type === "message") {
      p.innerText = response.content;
    }

    if (response.type === "action") {
      console.log(response);
      p.innerText = `Action detected: ${response.tool}`;
    }

    document.querySelector(".display").appendChild(p);
    scrollToBottom();
  }

  function handleUserInput() {
    if(userInput.trim() == '') return;
    const userP = document.createElement("p");
    userP.classList.add("chat-user");
    userP.innerText = userInput;
    document.querySelector(".display").append(userP);
    scrollToBottom();
    setUserInput("");
    handleAiForm();
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
                <h2 className="w-full font-medium text-white">
                  Active Assistant
                </h2>
                <div className="text-xs text-gray-300 flex items-center justify-start w-fit pl-3">
                  <p className={`${error == true ? 'bg-red-500' : 'bg-green-400 ' } w-2 h-2 rounded-full animate-pulsepulse`}></p>
                  <p className="pl-1 text-[10px]">{error ? 'Offline' : 'Online'}</p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end pr-4 text-white gap-3">
                {!maximizeBtn && (
                  <Maximize2
                    size={20}
                    className="cursor-pointer hover:opacity-75 hover:scale-110"
                  />
                )}
                {!maximizeBtn && (
                  <Minimize2
                    size={20}
                    className="cursor-pointer hover:opacity-75 hover:scale-90"
                  />
                )}
                <X
                  onClick={() => setPanel()}
                  size={20}
                  className="cursor-pointer active:scale-90 active:opacity-85"
                />
              </div>
            </div>
            {/* Display */}
            <div className="display sticky bottom-0 w-full flex flex-col gap-2 bg-transparent flex-1 py-2 px-4 overflow-y-scroll no-scrollbar"></div>
            {/* Input section */}
            <div className="input relative w-full h-20 text-white flex justify-between items-center px-0">
              <input
                type="text"
                placeholder="Ask ..."
                className="
                  input-p
                    placeholder:text-gray-500
                      flex-1
                      outline-none 
                      h-1/2 px-4 m-0
                      bg-transparent border-l-2 border-gray-300 rounded-sm pr-12 text-black
                  "
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                onClick={handleUserInput}
                id="inputBox"
                disabled={userInput === ""}
                className="input-p absolute p-3 bg-indigo-600 rounded-lg right-0 scale-90 cursor-pointer"
              >
                <Send size={20} />
              </button>
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
