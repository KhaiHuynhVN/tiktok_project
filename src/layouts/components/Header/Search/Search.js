import HeadLessTippy from '@tippyjs/react/headless';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useDebounce } from '~/hooks';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItems from '~/components/AccountItems';
import { CloseIcon, SearchIcon } from '~/components/Icons';
import * as services from '~/services';

import images from '~/assets/images';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
   const [inputSearch, setInputSearch] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [showLoading, setShowLoading] = useState(false);

   const debounce = useDebounce(inputSearch, 700);

   const inputSearchEl = useRef();

   useEffect(() => {
      if (!debounce.trim()) {
         setShowResult(false);
         return;
      }

      const fetchApi = async () => {
         setShowLoading(true);

         const result = await services.search(debounce);
         setSearchResult(result);

         setShowLoading(false);
      };
      fetchApi();
   }, [debounce]);

   useEffect(() => {
      inputSearch.trim() ? setShowResult(true) : setShowResult(false);
      !inputSearch.trim() &&
         setSearchResult([
            {
               id: 2,
               first_name: 'Minecraft',
               last_name: 'PE',
               full_name: 'Minecraft PE',
               nickname: 'minecraft_pocket_edition',
               avatar: images.defaultAvatar,
               bio: '✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
               tick: true,
               followings_count: 1,
               followers_count: 60,
               likes_count: 1000,
               website_url: 'https://fullstack.edu.vn/',
               facebook_url: '',
               youtube_url: '',
               twitter_url: '',
               instagram_url: '',
               created_at: '2022-05-05 23:10:05',
               updated_at: '2022-05-05 23:11:39',
            },
         ]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
