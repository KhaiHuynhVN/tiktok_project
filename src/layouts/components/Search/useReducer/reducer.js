import * as constant from './constant';

const initState = {
   value: '',
   searchResult: [],
   showResult: false,
   showLoading: false,
};

const reducer = (state, action) => {
   switch (action.type) {
      case constant.SET_VALUE:
         return {
            ...state,
            value: action.payload,
         };
      case constant.SET_SEARCH_RESULT:
         return {
            ...state,
            searchResult: action.payload,
         };
      case constant.SET_SHOW_RESULT:
         return {
            ...state,
            showResult: action.payload,
         };
      case constant.SET_SHOW_LOADING:
         return {
            ...state,
            showLoading: action.payload,
         };
      default:
         throw new Error('Lỗi!');
   }
};

export default reducer;
export { initState };
