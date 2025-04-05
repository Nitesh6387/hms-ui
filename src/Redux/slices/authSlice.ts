import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    session:null
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.session = action.payload;
        },
        logout: (state:any) => {
            state.session = null;
        },
    },
});
// Export actions 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 