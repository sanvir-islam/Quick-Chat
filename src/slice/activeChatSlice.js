import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    value: localStorage.getItem("activeChatInfo") ? JSON.parse(localStorage.getItem("activeChatInfo")) : null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("activeChatInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setActiveChat } = activeChatSlice.actions;
export default activeChatSlice.reducer;
