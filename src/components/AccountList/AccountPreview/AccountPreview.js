import classNames from 'classnames/bind';

import { CheckedIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button';

import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            <Image src="" className={cx('avatar')} />
            <Button className={cx('follow-btn')} primary>
               Follow
            </Button>
         </div>

         <div className={cx('body')}>
            <div className={cx('nickname')}>
               <span>jediclasherdddddddddddddddddddddddddddddddddddddddddddddd d</span>
               <CheckedIcon />
            </div>
            <span className={cx('name')}>Jedi CLasher</span>
         </div>

         <div className={cx('bottom')}>
            <p>
               <span className={cx('statistics')}>123M</span>
               <span>Followers</span>
            </p>
            <p>
               <span className={cx('statistics')}>321M</span>
               <span>Likes</span>
            </p>
         </div>
      </div>
   );
}

export default AccountPreview;
