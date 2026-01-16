import { createSlice } from "@reduxjs/toolkit";
import { expenses as expe } from "../../../services/data";

const initialState = {
  expenses:expe,
  total:0,
  month:1,
  year:2026,
  
  isLoading:false,
  error:null,
}

const expensesSlice = createSlice({
  name:'expenses',
  initialState,
  reducers:{
    addExpense:(state,action)=>{

    },
    editExpense:()=>{},
    deleteExpenses:()=>{},

  }
});


export const { addExpense, editExpense, deleteExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;