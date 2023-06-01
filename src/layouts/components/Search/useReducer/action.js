import * as constant from './constant';

const setValue = (payload) => {
   return {
      type: constant.SET_VALUE,
      payload,
   };
};

const setSearchResult = (payload) => {
   return {
      type: constant.SET_SEARCH_RESULT,
      payload,
   };
};

const setShowResult = (payload) => {
   return {
      type: constant.SET_SHOW_RESULT,
      payload,
   };
};

const setShowLoading = (payload) => {
   return {
      type: constant.SET_SHOW_LOADING,
      payload,
   };
};

export { setValue, setSearchResult, setShowResult, setShowLoading };
