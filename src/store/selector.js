import { createSelector } from "@reduxjs/toolkit";

const value = (state) => state.search.value;
const searchResult = (state) => state.search.searchResult;
const showLoading = (state) => state.search.showLoading;
const showResult = (state) => state.search.showResult;

export { value, searchResult, showLoading, showResult };
