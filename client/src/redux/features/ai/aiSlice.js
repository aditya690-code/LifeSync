import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [
    {
      role: "bot",
      text: "Welcome! How can I assist you today?",
    },
  ],

  isLoading: false,
  error: null,
};
const aiSlice = createSlice({
  name: "chatbot",
  initialState,

  reducers: {
    setMessages: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      console.log(actions.payload);
      state.chats.push(actions.payload);
    },
    setIsLoading: (state) => {
      state.error = null;
      state.isLoading = true;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setMessages, setIsLoading, setError } = aiSlice.actions;
export default aiSlice.reducer;
