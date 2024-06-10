import { createSlice } from "@reduxjs/toolkit";
import initialExpense from "../../data/dummyData.json";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expense: initialExpense,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expense = [...state.expense, action.payload];
    },
    updateExpense: (state, action) => {
      const { id, date, item, amount, description } = action.payload;
      state.expense = state.expense.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              date,
              item,
              amount: +amount,
              description,
            }
          : obj
      );
    },
    deleteExpense: (state, action) => {
      state.expense = state.expense.filter(
        (obj) => obj.id !== action.payload.id
      );
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
