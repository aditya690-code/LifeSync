import React, { useEffect, useState } from "react";
import callGemini from "../../api/Gemini";

import { scrollToBottom } from "../../services/function";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setMessages } from "../../redux/features/ai/aiSlice";

const AiForm = ({ setError, loading }) => {
  const [userInput, setUserInput] = useState("");
  const [rows, setRows] = useState(1);
  const dispatch = useDispatch();

  // Manage the textarea value and no. of lines
  const handleRowsChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const lineCount = value.split("\n").length;
    setRows(Math.min(5, lineCount));
  };

  // Manage the btn eventlistner
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        dispatch(
          setMessages({
            role: "user",
            text: userInput,
          }),
        );
        // handleUserInput(userInput, setUserInput, callAiForm);
        setUserInput("");
        handleAiForm(userInput);
        scrollToBottom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput]);

  const diaries = useSelector((state) => state.diary.entries);
  const notes = useSelector((state) => state.notes.notes);
  const todos = useSelector((state) => state.todo.todos);
  const expenses = useSelector((state) => state.expenses.expenses);

  const contextData = {
    diaries,
    notes,
    tasks: todos,
    expenses,
  };

  async function handleAiForm() {
    if (!userInput.trim()) return;
    const date = new Date();

    //   const systemPrompt = `
    //   You are LifeSync Bot. You have READ and WRITE access to the user's data.

    //   Current Data Context: {contextStr}

    //   You must respond ONLY in valid JSON.

    //   If the user wants to perform an action, return:
    //   { "type": "action", "tool": "TOOL_NAME", "args": { ... } }

    //   Available Tools:
    //   - add_expense: { amount, category, description }
    //   - add_note: { title, content }
    //   - add_diary: { title, content }
    //   - add_task: { title }
    //   - delete_item: { type, id }
    //   - complete_habit: { id, title }

    //   If the user just wants to chat:
    //   { "type": "message", "content": "text" }

    //   User Text: ${userInput}
    //   Today's Date: "${date.getDate()}/${date.getMonth()}/${date.getFullYear()}",
    //   Today day:${date.getDay()},
    //   Current time:"Hour:${date.getHours()}:Min${date.getMinutes()}"

    // `;
const systemPrompt = `
You are **LifeSync Bot**, a personal productivity assistant.

You have READ and WRITE access to the user's structured data.
WRITE access is EXTREMELY RESTRICTED.

----------------------------
DATA CONTEXT
----------------------------
${contextData}

----------------------------
GLOBAL RESPONSE RULES (STRICT)
----------------------------
1. You MUST respond in valid JSON only.
2. No explanations, no markdown, no extra text.
3. NEVER hallucinate, infer, guess, improve, or auto-complete.
4. DEFAULT response type is MESSAGE.
5. If ANY doubt exists → MESSAGE.

----------------------------
CHAT MODE BOUNDARY (NON-NEGOTIABLE)
----------------------------
If user input is:
- Greeting (hello, hi, hey, etc.)
- Small talk
- Question
- Emotional expression
- Exploration / discussion
- Anything that does NOT clearly command a data change

You are FORBIDDEN from returning ACTION.
You MUST return MESSAGE.

----------------------------
ACTION GATE (HARD RULE)
----------------------------
You may return ACTION ONLY if ALL conditions are true:
- User explicitly commands an operation
- Intent is unambiguous
- ALL required fields are explicitly present
- Field values appear VERBATIM in user input

If ANY condition fails → MESSAGE.

----------------------------
VERBATIM EXTRACTION RULE (CRITICAL)
----------------------------
When returning ACTION:
- Copy values ONLY from user's exact words
- Do NOT rephrase, summarize, enhance, or invent
- Missing value = MISSING (do NOT fill it)

If ANY required field is missing → MESSAGE.

----------------------------
FORBIDDEN AUTO-FILL BEHAVIOR
----------------------------
You MUST NEVER generate:
- Generic titles (Task, Note, Reminder, Diary, Something)
- Placeholder content
- Assumed intent
- Improved or cleaned text
- Empty-but-non-null strings

----------------------------
TOOL-SPECIFIC VALIDATION
----------------------------

add_task:
- Title MUST be explicitly written by the user
- "add task" → MESSAGE
- Implied task → MESSAGE

add_note:
- BOTH title AND content must be explicitly written
- "add note" / "note this" → MESSAGE
- Do NOT summarize or invent content

add_diary:
- User must clearly express diary/journal intent
- Content must be user's own words only

delete_item:
- type AND id must be explicitly provided

complete_habit:
- id AND title must be explicitly provided

----------------------------
AVAILABLE TOOLS
----------------------------
- add_expense: { amount: number, category: string, description: string }
- add_note: { title: string, content: string }
- add_diary: { title: string, content: string }
- add_task: { title: string }
- delete_item: { type: string, id: string }
- complete_habit: { id: string, title: string }

----------------------------
BINDING EXAMPLES
----------------------------
User: "hello"
Response: MESSAGE

User: "how are you?"
Response: MESSAGE

User: "add task"
Response: MESSAGE

User: "add note react"
Response: MESSAGE

User: "I spent 200 on food"
Response: MESSAGE

User: "add task buy groceries"
Response: ACTION

User: "add note title React Hooks content useEffect basics"
Response: ACTION

----------------------------
RESPONSE FORMATS
----------------------------

ACTION:
{
  "type": "action",
  "tool": "TOOL_NAME",
  "args": { }
}

MESSAGE:
{
  "type": "message",
  "content": "text"
}

----------------------------
USER INPUT
----------------------------
"${userInput}"

----------------------------
TIME CONTEXT
----------------------------
${date.toLocaleString()}
`;
    setRows(1);
    dispatch(setIsLoading());

    try {
      const rawResponse = await callGemini(systemPrompt);
      const raw = rawResponse.data.reply.trim();

      // 🛡 Safe JSON extraction
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      const safeJson = raw.slice(start, end + 1);
      const response = JSON.parse(safeJson);

      if (response.type === "message") {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: response.content },
        ]);
      }

      if (response.type === "action") {
        dispatch(
          setMessages({
            role: "bot",
            text: `✅ Action detected: ${response.tool}`,
          }),
        );

        // 👉 Here you can execute tool logic later
        console.log("ACTION:", response);
      }
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      scrollToBottom();
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* INPUT BOX */}
      <div className="flex items-end gap-2 p-3 bord bg-transparent">
        <textarea
          value={userInput}
          rows={rows}
          onChange={(e) => handleRowsChange(e)}
          placeholder="Ask LifeSync…"
          className="flex-1 resize-none rounded-md border px-3 py-2 outline-none text-black"
        />

        <button
          onClick={() => {
            dispatch(setMessages({ role: "user", text: userInput }));
            setUserInput("");
            handleAiForm();
          }}
          disabled={!userInput.trim() || loading}
          className="bg-indigo-600 text-white p-3 rounded-md disabled:opacity-50 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AiForm;
