import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../slices/expenseSlice";
import monthSlice from "../slices/monthSlice";

const store = configureStore({
  reducer: {
    expense: expenseSlice,
    month: monthSlice,
  },
});

export default store;
