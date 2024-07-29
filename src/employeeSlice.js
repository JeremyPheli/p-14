import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('employees')) || [];

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newState = [...state, action.payload];
      localStorage.setItem('employees', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
