import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import todoSlice from "./todoSlice";

const store = configureStore({
  reducer: { authStore: authSlice, todosStore: todoSlice },
});

export default store;
