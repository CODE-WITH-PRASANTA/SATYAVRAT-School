import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "./Pages/utils/resultSlice";

const store = configureStore({
  reducer: {
    results: resultReducer,
  },
});

export default store;