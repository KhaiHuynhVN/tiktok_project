import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "~/layouts/components/Search";

const store = configureStore({
   reducer: {
      search: searchSlice.reducer,
   },
});

export default store;
