import { createSlice } from "@reduxjs/toolkit";

const monthSlice = createSlice({
  name: "month",
  initialState: {
    month: JSON.parse(localStorage.getItem("month")) || 1,
  },
  reducers: {
    changeMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const { changeMonth } = monthSlice.actions;
export default monthSlice.reducer;
