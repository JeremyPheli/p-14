import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      if (action.payload && Object.keys(action.payload).length > 0) {
        const id = Date.now().toString();
        state[id] = action.payload;
      }
    },
  },
});

export const { addEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
