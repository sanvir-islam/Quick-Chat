import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: localStorage.getItem("userLoginInfo") ? JSON.parse(localStorage.getItem("userLoginInfo")) : null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("userLoginInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.value = null;
      localStorage.removeItem("userLoginInfo");
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
