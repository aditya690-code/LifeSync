import React, { useEffect, useState } from "react";
import callGemini from "../../api/Gemini";
import { handleUserInput, scrollToBottom } from "../../services/function";
import { Send } from "lucide-react";

const AiForm = ({ setError }) => {
  const [userInput, setUserInput] = useState("");
  const [rows, setRows] = useState(1);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleAiForm() {
    if (!userInput.trim()) return;

    const date = new Date();

    const systemPrompt = `
You are LifeSync Bot. You have READ and WRITE access to the user's data.

Current Data Context: {contextStr}

You must respond ONLY in valid JSON.

If the user wants to perform an action, return:
{ "type": "action", "tool": "TOOL_NAME", "args": { ... } }

Available Tools:
- add_expense: { amount, category, description }
- add_note: { title, content }
- add_diary: { title, content }
- add_routine: { title }
- delete_item: { type, id }
- complete_habit: { id, title }

If the user just wants to chat:
{ "type": "message", "content": "text" }

User Text: ${userInput}
Today's Date: ${date}
`;

    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
    setUserInput("");
    setRows(1);
    setLoading(true);

    try {
      const rawResponse = await callGemini(systemPrompt);
      const raw = rawResponse.data.reply.trim();

      // 🛡 Safe JSON extraction
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      const safeJson = raw.slice(start, end + 1);
      const response = JSON.parse(safeJson);

      setError(false);

      if (response.type === "message") {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: response.content },
        ]);
      }

      if (response.type === "action") {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `✅ Action detected: ${response.tool}`,
          },
        ]);

        // 👉 Here you can execute tool logic later
        console.log("ACTION:", response);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  const handleRowsChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const lineCount = value.split("\n").length;
    setRows(Math.min(5, lineCount));
  };

  // ⌨️ Enter / Shift+Enter handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleUserInput(userInput, setUserInput, handleAiForm);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* CHAT DISPLAY */}
      <div className="display flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-indigo-600 text-white self-end ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </p>
        ))}

        {loading && (
          <p className="text-sm text-gray-500 italic">LifeSync is thinking…</p>
        )}
      </div>

      {/* INPUT BOX */}
      <div className="flex items-end gap-2 p-3 border-t bg-white">
        <textarea
          value={userInput}
          rows={rows}
          onChange={handleRowsChange}
          placeholder="Ask LifeSync…"
          className="flex-1 resize-none rounded-md border px-3 py-2 outline-none text-black"
        />

        <button
          onClick={() =>
            handleUserInput(userInput, setUserInput, handleAiForm)
          }
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