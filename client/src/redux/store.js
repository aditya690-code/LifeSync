import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./features/diary/diarySlice";
import todoSlice from "./features/todo/todoSlice";
import notesSlice from "./features/notes/noteSlice";
import expensesSlice from "./features/expenses/expensesSlice";
import aiSlice from "./features/ai/aiSlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    notes: notesSlice,
    todo: todoSlice,
    expenses: expensesSlice,
    chatbot: aiSlice,
  },
});
