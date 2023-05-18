import HeadLessTippy from '@tippyjs/react/headless';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItems from '~/components/AccountItems';
import { CloseIcon, SearchIcon } from '~/components/Icons';
import * as services from '~/services';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
   const [inputSearch, setInputSearch] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [showLoading, setShowLoading] = useState(false);

   let timer;

   const inputSearchEl = useRef();

   useEffect(() => {
      if (!inputSearch.trim()) {
         setShowResult(false);
         setSearchResult([]);
         setShowLoading(false);
         return;
      }

      setShowResult(true);

      const fetchApi = async () => {
         setShowLoading(true);
         setSearchResult([]);

         const result = await services.search(inputSearch);
         inputSearchEl.current.value.trim() && setSearchResult(result);

         setShowLoading(false);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setTimeout(() => {
         fetchApi();
      }, 700);

      return () => clearTimeout(timer);
   }, [inputSearch]);

   const handleInputSearch = (el) => {
      !el.value.startsWith(' ') && setInputSearch(el.value);
   };

   const handleDeleteInputValue = (e) => {
      e.preventDefault();
      setInputSearch('');
      inputSearchEl.current.focus();
      setSearchResult(false);
   };

   const handleFocusInputSearch = () => {
      inputSearchEl.current.value.trim() && searchResult.length > 0 && setShowResult(true);
   };

   return (
      // Wrap thẻ <div> cho HeadLessTippy là để fix warning của Tippy
      <div>
         <HeadLessTippy
            visible={showResult && searchResult.length > 0}
            offset={[0, 8]}
            interactive
            onClickOutside={() => setShowResult(false)}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper scrollbar>
                     <span className={cx('search-result-title')}>Accounts</span>
                     {searchResult.length > 0 &&
                        searchResult.map((result) => (
                           <AccountItems key={result.id} data={result} />
                        ))}
                  </PopperWrapper>
               </div>
            )}
         >
            <div className={cx('search')}>
               <form>
                  <input
                     ref={inputSearchEl}
                     value={inputSearch}
                     placeholder="Search accounts and videos"
                     spellCheck={false}
                     onFocus={() => handleFocusInputSearch()}
                     onChange={(e) => handleInputSearch(e.target)}
                  />

                  {showLoading && (
                     <i id={cx('loading')} className="fa-solid fa-spinner-third fa-spin"></i>
                  )}
                  {inputSearch.trim() && !showLoading && (
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
