import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
   name: "search",
   initialState: {
      value: "",
      searchResult: [],
      showResult: false,
      showLoading: false,
   },
   reducers: {
      setValue(state, action) {
         state.value = action.payload;
      },
      setSearchResult(state, action) {
         state.searchResult = action.payload;
      },
      setShowResult(state, action) {
         state.showResult = action.payload;
      },
      setShowLoading(state, action) {
         state.showLoading = action.payload;
      },
   },
});

export default searchSlice;
