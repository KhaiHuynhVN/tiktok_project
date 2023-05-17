import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from './Search';
import * as config from '~/config';

import {
   CoinIcon,
   DarkModeIcon,
   FeedbackAndHelpIcon,
   KeyboardIcon,
   LanguageIcon,
   LogOutIcon,
   MessageIcon,
   ProfileIcon,
   SettingIcon,
} from '~/components/Icons';

import images from '~/assets/images';

import styles from './Header.module.scss';
import '~/fontawesome/font-awesome-pro-v6-6.2.0/css/all.min.css';

const cx = classNames.bind(styles);

function Header() {
   const currentUser = true;

   const MENU_ITEMS = [
      {
         leftIcon: <LanguageIcon />,
         title: 'English',
         children: {
            title: 'Language',
            data: [
               {
                  type: 'language',
                  code: 'en',
                  title: 'English',
               },
               {
                  type: 'language',
                  code: 'vi',
                  title: 'Việt Nam',
                  children: {
                     title: 'Việt Nam',
                     data: [
                        {
                           title: 'Tiếng Nam',
                        },
                        {
                           title: 'Tiếng Trung',
                        },
                        {
                           title: 'Tiếng Bắc',
                        },
                     ],
                  },
               },
               {
                  type: 'language',
                  code: 'jav',
                  title: 'Japan',
               },
               {
                  type: 'language',
                  code: 'hq',
                  title: 'Korea',
               },
               {
                  type: 'language',
                  code: 'tl',
                  title: 'Thailand',
               },
               {
                  type: 'language',
                  code: 'id',
                  title: 'Indonesia',
               },
               {
                  type: 'language',
                  code: 's',
                  title: 'Singapore',
               },
               {
                  type: 'language',
                  code: 'tl',
                  title: 'Thailand',
               },
               {
                  type: 'language',
                  code: 'id',
                  title: 'Indonesia',
               },
               {
                  type: 'language',
                  code: 's',
                  title: 'Singapore',
               },
               {
                  type: 'language',
                  code: 'tl',
                  title: 'Thailand',
               },
               {
                  type: 'language',
                  code: 'id',
                  title: 'Indonesia',
               },
               {
                  type: 'language',
                  code: 's',
                  title: 'Singapore',
               },
               {
                  type: 'language',
                  code: 'tl',
                  title: 'Thailand',
               },
               {
                  type: 'language',
                  code: 'id',
                  title: 'Indonesia',
               },
               {
                  type: 'language',
                  code: 's',
                  title: 'Singapore',
               },
               {
                  type: 'language',
                  code: 's',
                  title: 'Singapore',
               },
               {
                  type: 'language',
                  code: 'tl',
                  title: 'Thailand',
               },
               {
                  type: 'language',
                  code: 'id',
                  title: 'Indonesia',
               },
               {
                  type: 'language',
                  code: 's',
                  title: 'Singapore',
               },
            ],
         },
      },
      {
         leftIcon: <FeedbackAndHelpIcon />,
         title: 'Feedback and help',
         to: '/feedback',
      },
      {
         leftIcon: <KeyboardIcon />,
         title: 'Keyboard shortcuts',
      },
      {
         leftIcon: <DarkModeIcon />,
         title: 'Dark mode',
         htmls: (
            <button
               className={cx('switch')}
               onClick={(e) => e.target.classList.toggle(cx('active'))}
            >
               <div className={cx('circle')}></div>
            </button>
         ),
      },
   ];

   const userMenu = [
      {
         leftIcon: <ProfileIcon />,
         title: 'View profile',
         to: '/@[your_profile]',
      },
      {
         leftIcon: <CoinIcon />,
         title: 'Get Coins',
         to: '/coins',
      },
      {
         leftIcon: <SettingIcon />,
         title: 'Settings',
         to: '/settings',
      },
      ...MENU_ITEMS,
      {
         leftIcon: <LogOutIcon />,
         title: 'Log out',
         to: '/logout',
         className: cx('logout-btn'),
      },
   ];

   const handleMenuChange = (item, _this) => {
      // eslint-disable-next-line default-case
      switch (item.type) {
         case 'language':
            alert(item.title);
      }

      // eslint-disable-next-line no-useless-concat
      const innerEl = _this.querySelector(`.${cx('switch')}`);

      innerEl && innerEl.classList.toggle(cx('active'));
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('logo')}>
               <Link to={config.routes.home}>
                  <Image src={images.logo} alt="Tiktok_logo" />
               </Link>
            </div>
            <div className={cx('center')}>
               <Search />
            </div>

            <div className={cx('actions')}>
               {currentUser ? (
                  <>
                     <Tippy duration={[0, 0]} delay={[0, 100]} placement="bottom" content="Upload">
                        <Link to={config.routes.upload} className={cx('action-btn')}>
                           <i className="fa-regular fa-cloud-arrow-up"></i>
                        </Link>
                     </Tippy>
                     <Tippy
                        duration={[0, 0]}
                        delay={[0, 100]}
                        placement="bottom"
                        content="Messages"
                     >
                        <button className={cx('action-btn')}>
                           <MessageIcon />
                        </button>
                     </Tippy>
                     <Tippy duration={[0, 0]} delay={[0, 100]} placement="bottom" content="Inbox">
                        <button className={cx('action-btn')}>
                           <span>10000</span>
                           <i className="fa-regular fa-message-minus"></i>
                        </button>
                     </Tippy>
                  </>
               ) : (
                  <>
                     <Button text leftIcon={<i className="fa-regular fa-plus"></i>}>
                        Upload
                     </Button>
                     <Button primary>Log in</Button>
                  </>
               )}
               <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                  {currentUser ? (
                     <Image
                        src={images.defaultAvatar}
                        className={cx('user-avatar')}
                        alt="user-avatar"
                     />
                  ) : (
                     <button className={cx('more-btn')}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                     </button>
                  )}
               </Menu>
            </div>
         </div>
      </div>
   );
}

export default Header;
