import HeadLessTippy from "@tippyjs/react/headless";
import { useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import { RenderAccountItem } from "~/components/AccountItems";
import { CloseIcon, SearchIcon } from "~/components/Icons";
import * as services from "~/services";
import * as selector from "~/store/selector";
import searchSlice from "./searchSlice";

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
   const dispatch = useDispatch();
   const value = useSelector(selector.value);
   const searchResult = useSelector(selector.searchResult);
   const showLoading = useSelector(selector.showLoading);
   const showResult = useSelector(selector.showResult);

   const timer = useRef();

   const inputSearchEl = useRef();

   useEffect(() => {
      if (!value.trim()) {
         dispatch(searchSlice.actions.setShowResult(false));
         dispatch(searchSlice.actions.setSearchResult([]));
         dispatch(searchSlice.actions.setShowLoading(false));
         return;
      }

      dispatch(searchSlice.actions.setShowResult(true));

      const fetchApi = async () => {
         dispatch(searchSlice.actions.setShowLoading(true));
         dispatch(searchSlice.actions.setSearchResult([]));

         const result = await services.search(value);
         value.trim() && dispatch(searchSlice.actions.setSearchResult(result));

         dispatch(searchSlice.actions.setShowLoading(false));
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer.current = setTimeout(() => {
         fetchApi();
      }, 700);

      return () => {
         clearTimeout(timer.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value]);

   const handleInputSearch = (value) => {
      !value.startsWith(" ") && dispatch(searchSlice.actions.setValue(value));
   };

   const handleDeleteInputValue = (e) => {
      e.preventDefault();
      dispatch(searchSlice.actions.setValue(""));
      inputSearchEl.current.focus();
      dispatch(searchSlice.actions.setShowResult(false));
      dispatch(searchSlice.actions.setSearchResult([]));
   };

   const handleFocusInputSearch = () => {
      value.trim() && searchResult.length && dispatch(searchSlice.actions.setShowResult(true));
   };

   return (
      // Wrap thẻ <div> cho HeadLessTippy là để fix warning của Tippy
      <div>
         <HeadLessTippy
            visible={showResult && searchResult.length > 0}
            offset={[0, 8]}
            interactive
            onClickOutside={() => dispatch(searchSlice.actions.setShowResult(false))}
            render={(attrs) => (
               <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                  <PopperWrapper scrollbar>
                     <span className={cx("search-result-title")}>Accounts</span>
                     <RenderAccountItem data={searchResult} />
                     <span className={cx("search-result-subtitle")}>
                        View all result for "{value}"
                     </span>
                  </PopperWrapper>
               </div>
            )}
         >
            <div className={cx("search")}>
               <form>
                  <input
                     ref={inputSearchEl}
                     value={value}
                     placeholder="Search accounts and videos"
                     spellCheck={false}
                     onFocus={() => handleFocusInputSearch()}
                     onChange={(e) => handleInputSearch(e.target.value)}
                  />

                  {showLoading && (
                     <i id={cx("loading")} className="fa-solid fa-spinner-third fa-spin"></i>
                  )}
                  {value.trim() && !showLoading && (
                     <button className={cx("close")} onClick={(e) => handleDeleteInputValue(e)}>
                        <CloseIcon />
                     </button>
                  )}
                  <span className={cx("spliter")}></span>
                  <button
                     className={cx("btn-search")}
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
