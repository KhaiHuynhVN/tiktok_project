import classNames from 'classnames/bind';

import Header from '../components/Header';

import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
   return (
      <div>
         <Header />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>{children}</div>
         </div>
      </div>
   );
}

export default HeaderOnly;
