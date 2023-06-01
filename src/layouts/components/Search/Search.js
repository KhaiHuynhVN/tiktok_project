import HeadLessTippy from '@tippyjs/react/headless';
import { useRef, useEffect, useReducer } from 'react';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { RenderAccountItem } from '~/components/AccountItems';
import { CloseIcon, SearchIcon } from '~/components/Icons';
import * as services from '~/services';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const initState = {
   value: '',
   searchResult: [],
   showResult: false,
   showLoading: false,
};

const SET_VALUE = 'set_value';
const SET_SEARCH_RESULT = 'set_search_result';
const SET_SHOW_RESULT = 'set_show_result';
const SET_SHOW_LOADING = 'set_show_loading';

const setValue = (payload) => {
   return {
      type: SET_VALUE,
      payload,
   };
};

const setSearchResult = (payload) => {
   return {
      type: SET_SEARCH_RESULT,
      payload,
   };
};

const setShowResult = (payload) => {
   return {
      type: SET_SHOW_RESULT,
      payload,
   };
};

const setShowLoading = (payload) => {
   return {
      type: SET_SHOW_LOADING,
      payload,
   };
};

const reducer = (state, action) => {
   switch (action.type) {
      case SET_VALUE:
         return {
            ...state,
            value: action.payload,
         };
      case SET_SEARCH_RESULT:
         return {
            ...state,
            searchResult: action.payload,
         };
      case SET_SHOW_RESULT:
         return {
            ...state,
            showResult: action.payload,
         };
      case SET_SHOW_LOADING:
         return {
            ...state,
            showLoading: action.payload,
         };
      default:
         throw new Error('Lỗi!');
   }
};

function Search() {
   // const [inputSearch, setInputSearch] = useState('');
   // const [searchResult, setSearchResult] = useState([]);
   // const [showResult, setShowResult] = useState(false);
   // const [showLoading, setShowLoading] = useState(false);

   const [state, dispatch] = useReducer(reducer, initState);

   const { value, searchResult, showLoading, showResult } = state;

   let timer;

   const inputSearchEl = useRef();

   useEffect(() => {
      if (!value.trim()) {
         dispatch(setShowResult(false));
         dispatch(setSearchResult([]));
         dispatch(setShowLoading(false));
         return;
      }

      dispatch(setShowResult(true));

      const fetchApi = async () => {
         dispatch(setShowLoading(true));
         dispatch(setSearchResult([]));

         const result = await services.search(value);
         inputSearchEl.current.value.trim() && dispatch(setSearchResult(result));

         dispatch(setShowLoading(false));
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setTimeout(() => {
         fetchApi();
      }, 700);

      return () => clearTimeout(timer);
   }, [value]);

   // const handleInputSearch = (el) => {
   //    !el.value.startsWith(' ') && setInputSearch(el.value);
   // };

   const handleDeleteInputValue = (e) => {
      e.preventDefault();
      dispatch(setValue(''));
      inputSearchEl.current.focus();
      dispatch(setShowResult(false));
      dispatch(setSearchResult([]));
   };

   const handleFocusInputSearch = () => {
      inputSearchEl.current.value.trim() &&
         searchResult.length > 0 &&
         dispatch(setShowResult(true));
   };

   return (
      // Wrap thẻ <div> cho HeadLessTippy là để fix warning của Tippy
      <div>
         <HeadLessTippy
            visible={showResult && searchResult.length > 0}
            offset={[0, 8]}
            interactive
            onClickOutside={() => dispatch(setShowResult(false))}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper scrollbar>
                     <span className={cx('search-result-title')}>Accounts</span>
                     <RenderAccountItem data={searchResult} />
                  </PopperWrapper>
               </div>
            )}
         >
            <div className={cx('search')}>
               <form>
                  <input
                     ref={inputSearchEl}
                     value={value}
                     placeholder="Search accounts and videos"
                     spellCheck={false}
                     onFocus={() => handleFocusInputSearch()}
                     onChange={(e) => dispatch(setValue(e.target.value))}
                  />

                  {showLoading && (
                     <i id={cx('loading')} className="fa-solid fa-spinner-third fa-spin"></i>
                  )}
                  {value.trim() && !showLoading && (
                     <button className={cx('close')} onClick={(e) => handleDeleteInputValue(e)}>
                        <CloseIcon />
                     </button>
                  )}
                  <span className={cx('spliter')}></span>
                  <button
                     className={cx('btn-search')}
                     onClick={(e) => e.preventDefault()}
                     onMouseDown={(e) => e.preventDefault()}
                  >
                     <SearchIcon />
                  </button>
               </form>
            </div>
         </HeadLessTippy>
      </div>
   );
}

export default Search;
