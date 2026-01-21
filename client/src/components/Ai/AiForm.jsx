import React, { useEffect, useState } from "react";
import callGemini from "../../api/Gemini";

import { scrollToBottom } from "../../services/function";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setMessages,
  setError,
} from "../../redux/features/ai/aiSlice";

const AiForm = ({ loading }) => {
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
        scrollToBottom();
        handleAiForm(userInput);
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

// function extractJSON(text) {
//   const match = text.match(/```json([\s\S]*?)```/);
//   if (!match) return null;
//   return JSON.parse(match[1].trim());
// }


  async function handleAiForm() {
    if (!userInput.trim()) return;

    const date = new Date();
    setRows(1);
    dispatch(setIsLoading());

    const systemPrompt = `You are LifeSync Bot, a personal productivity assistant.

      You have READ and WRITE access to the user's structured data.
      WRITE access is EXTREMELY RESTRICTED.

      ============================
      ABSOLUTE OUTPUT CONSTRAINT
      ============================
      - Your entire response MUST be a SINGLE valid JSON object.
      - Do NOT output explanations, reasoning, analysis, comments, or thoughts.
      - Do NOT repeat instructions.
      - Do NOT wrap output in markdown or code blocks.
      - Do NOT include any text before or after JSON.
      - Any violation is considered a critical failure.

      ============================
      DATA CONTEXT
      ============================
      ${contextData}

      ============================
      DEFAULT BEHAVIOR
      ============================
      - Default response type is "message".
      - If there is ANY doubt, missing data, or ambiguity → respond with "message".
      - NEVER infer, guess, auto-fill, improve, or hallucinate data.

      ============================
      CHAT MODE BOUNDARY (HARD)
      ============================
      If user input is:
      - Greeting (hi, hello, hey, etc.)
      - Question
      - Small talk
      - Emotional expression
      - Discussion or exploration

      You are STRICTLY FORBIDDEN from returning "action".
      You MUST return "message".

      ============================
      ACTION GATE (NON-NEGOTIABLE)
      ============================
      Return "action" ONLY IF ALL conditions are met:
      1. User explicitly commands an operation
      2. Intent is clear and unambiguous
      3. ALL required fields are provided verbatim
      4. No assumptions are required

      If ANY condition fails → return "message".

      ============================
      AVAILABLE TOOLS
      ============================
      - add_expense: { amount, category, description }
      - add_note: { title, content }
      - add_diary: { title, content }
      - add_task: { title }
      - delete_item: { type, id }
      - complete_habit: { id, title }

      ============================
      RESPONSE SCHEMAS
      ============================

      MESSAGE:
      {
        "type": "message",
        "content": "string"
      }

      ACTION:
      {
        "type": "action",
        "tool": "TOOL_NAME",
        "args": {}
      }

      ============================
      EXAMPLES (STRICT)
      ============================

      User: "hi"
      Response:
      {
        "type": "message",
        "content": "Hey! How can I help you?"
      }

      User: "add task"
      Response:
      {
        "type": "message",
        "content": "Please provide the task title."
      }

      ============================
      USER INPUT
      ============================
      "${userInput}"

      ============================
      TIME CONTEXT
      ============================
      ${date.toLocaleString()}
      `
    try {
      const rawResponse = await callGemini(systemPrompt);
      // const raw = rawResponse?.data?.reply;
      const raw = rawResponse.data

      console.log(rawResponse)

      let response;

      try {
        response = raw
      } catch {
        response = {
          type: "message",
          content: raw,
        };
      }

      console.log(response)

      if (!response?.type || !["message", "action"].includes(response.type)) {
        response = {
          type: "message",
          content: raw,
        };
      }

      if (response.type === "message") {
        dispatch(
          setMessages({
            role: "bot",
            text: response.content,
          }),
        );
      }

      if (response.type === "action") {
        dispatch(
          setMessages({
            role: "bot",
            text: `Action detected: ${response.tool}`,
          }),
        );

        console.log("ACTION:", response);
      }
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(
        setMessages({
          role: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        }),
      );
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
            if(!userInput.trim()) return
            dispatch(setMessages({ role: "user", text: userInput }));
            setUserInput("");
            handleAiForm();
            scrollToBottom();
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
