import React, { useEffect, useState } from "react";

import {
  handleAiForm,
  handleUserInput,
} from "../../services/function";
import { Send } from "lucide-react";

const AiForm = ({ setError, setMessages }) => {
  const [userInput, setUserInput] = useState("");
  const [rows, setRows] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRowsChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const lineCount = value.split("\n").length;
    setRows(Math.min(5, lineCount));
  };

  function callAiForm() {
    handleAiForm(
      userInput,
      setUserInput,
      setMessages,
      setRows,
      setLoading,
      setError,
    );
  }

  // ⌨️ Enter / Shift+Enter handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleUserInput(userInput, setUserInput, callAiForm);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* INPUT BOX */}
      <div className="flex items-end gap-2 p-3 bord bg-transparent">
        <textarea
          value={userInput}
          rows={rows}
          onChange={handleRowsChange}
          placeholder="Ask LifeSync…"
          className="flex-1 resize-none rounded-md border px-3 py-2 outline-none text-black"
        />

        <button
          onClick={() => handleUserInput(userInput, setUserInput, callAiForm)}

          disabled={!userInput.trim() || loading}
          className="bg-indigo-600 text-white p-3 rounded-md disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AiForm;