import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TippyHeadLess from '@tippyjs/react/headless';

import { CheckedIcon } from '../Icons';
import { Wrapper as PopperWrapper } from '../Popper';
import Image from '~/components/Image/Image';
import AccountPreview from './AccountPreview';

import styles from './AccountList.module.scss';

const cx = classNames.bind(styles);

const a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function AccountList({ title, titleBtn = 'See more', data, isDisableTippy = false }) {
   return (
      <div className={cx('wrapper')}>
         <h2>{title}</h2>
         <ul className={cx('account-list')}>
            {a.map((item, index) => (
               <TippyHeadLess
                  disabled={isDisableTippy}
                  key={index}
                  hideOnClick={false}
                  interactive
                  offset={[0, -2]}
                  delay={[600, 0]}
                  placement="bottom"
                  appendTo={() => document.body}
                  render={(attrs) => {
                     return (
                        <div className={cx('menu')} tabIndex="-1" {...attrs}>
                           <PopperWrapper>
                              <AccountPreview />
                           </PopperWrapper>
                        </div>
                     );
                  }}
               >
                  <li>
                     <Link className={cx('account-item')}>
                        <Image src="" />
                        <div className={cx('info')}>
                           <div className={cx('nickname')}>
                              <span>
                                 jediclasherdddddddddddddddddddddddddddddddddddddddddddddd d
                              </span>
                              <CheckedIcon />
                           </div>
                           <span className={cx('name')}>Jedi CLasher</span>
                        </div>
                     </Link>
                  </li>
               </TippyHeadLess>
            ))}
         </ul>
         <button className={cx('more-btn')}>{titleBtn}</button>
      </div>
   );
}

AccountList.propTypes = {
   title: PropTypes.string.isRequired,
   titleBtn: PropTypes.string,
   // data: PropTypes.object.isRequired,
};

export default AccountList;
