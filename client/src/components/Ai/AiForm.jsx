import React, { useEffect, useState } from "react";
import callGemini from "../../api/Gemini";
import { scrollToBottom } from "../../services/function";
import { Send } from "lucide-react";

const AiForm = ({ setError }) => {
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    if (userInput != "") {
      addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          handleUserInput();
        }
      });
    }
  });
  function handleUserInput() {
    if (userInput.trim() == "") return;
    const userP = document.createElement("p");
    userP.classList.add("chat-user");
    userP.innerText = userInput;
    document.querySelector(".display").append(userP);
    scrollToBottom();
    setUserInput("");
    handleAiForm();
  }
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

  return (
    <div className="input relative w-full h-20 text-white flex justify-between items-center px-0">
      <textarea
        name=""
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask..."
        className="input-p placeholder:text-gray-500 flex-1 outline-none h-full py-2 pr-3 text-black resize-none
        border-l-4 border-gray-400 rounded-md pl-4"
        id=""
      ></textarea>
      <button
        onClick={handleUserInput}
        id="inputBox"
        disabled={userInput === ""}
        className="input-p  p-3 bg-indigo-600 rounded-lg right-0 scale-90 cursor-pointer"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default AiForm;
