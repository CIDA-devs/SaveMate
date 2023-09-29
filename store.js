// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "./slices/goalsSlice";

const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
