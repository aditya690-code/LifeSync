import { createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../../services/data";

const initialState = {
  todo: tasks,
  progress:0,
  isLoading: false,
  error: null,
};


const calculateProgress = (todo) => {
  if (todo.length === 0) return 0;
  const completed = todo.filter(t => t.status === "completed").length;
  const tasks = todo.filter(t => t.status != 'inbox');
  return Math.round((completed / tasks.length) * 100);
};

export const todoSlice = createSlice({
  name:'todo',
  initialState,
  reducers:{
    addTask :(state,action)=>{
      state.todo.push({
        title:action.payload.title,
        description:action.payload.description,
        status:'',
      });
      calculateProgress(state.todo);
    },
    changeStatus:(state,action) =>{
      const { id, status } = action.payload;
      state.todo = state.todo.map(
        (task)=> {
          task.id == id ? 
          { ...task , status }
          : task
        });
        calculateProgress(state.todo);
    },

  }

})

export const { addTask, changeStatus,} = todoSlice.actions;
export default todoSlice.reducer;