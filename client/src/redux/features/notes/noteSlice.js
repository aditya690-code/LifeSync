import { createSlice } from "@reduxjs/toolkit";
import { notes } from "../../../services/data";

const initialState = {
  notes: notes,
  totalNotes:0,
  skip: {
    isSkip: true,
    value: 0,
  },
  limit: 15,
  hashMore: false,

  activeDiary: {},
  searchDiary: null,

  isLoading: false,
  error: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.entry = action.payload;
    },
    setTotalNotes:(state,action)=>{
      state.totalEntry = action.payload;
    },
    addNote: (state, action) => {
      state.entry += action.payload;
    },
    editNote: (state, action) => {
      state.entry = action.payload;
    },
    deleteNote: (state) => {
      state.entry = [];
    },
    setActiveDiary: (state, action) => {
      state.activeDiary = action.payload;
    },
    setSkip: (state, action) => {
      state.skip.value = action.payload;
      state.skip.isSkip = false;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setHashMore: (state, action) => {
      state.hashMore = action.payload;
    },
  },
});

export const {
  setNote,
  setTotalNotes,
  editNote,
  deleteNote,
  setActiveDiary,
  setIsLoading,
  setError,
  setSkip,
  setHashMore,
} = notesSlice.actions;
export default notesSlice.reducer;
