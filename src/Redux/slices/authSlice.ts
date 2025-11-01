// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     session:null
// };
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             state.session = action.payload;
//         },
//         logout: (state:any) => {
//             state.session = null;
//         },
//     },
// });
// // Export actions 
// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer; 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_state, action) => {
      return { session: action.payload }; // Return new state instead of mutating
    },
    logout: () => {
      return { session: null };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
