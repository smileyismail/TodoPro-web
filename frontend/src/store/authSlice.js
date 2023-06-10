import { createSlice } from "@reduxjs/toolkit";

function getUserIdFromLocalStorage() {
  const userId = localStorage.getItem("userId");
  return userId ? userId : "";
}

const initialAuthSliceState = {
  userId: getUserIdFromLocalStorage(),
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthSliceState,
  reducers: {
    authenticate: (state, action) => {
      const { userId } = action.payload;
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },

    logOut: (state, action) => {
      state.userId = "";
      localStorage.removeItem("userId");
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
