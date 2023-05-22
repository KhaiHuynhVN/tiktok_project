import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ leftIcon, rightIcon, activeIcon, title, dot, news, to, ...passProps }) {
   return (
      <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })}>
         {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
         {activeIcon && <span className={cx('active-icon')}>{activeIcon}</span>}
         <div className={cx('title')}>
            <span>{title}</span>
            {dot && <div className={cx('circle')}></div>}
            {news && <span className={cx('new')}>New</span>}
         </div>
         {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
         {rightIcon && activeIcon && <span className={cx('active-icon')}>{activeIcon}</span>}
      </NavLink>
   );
}

MenuItem.propTypes = {
   leftIcon: PropTypes.node,
   rightIcon: PropTypes.node,
   activeIcon: PropTypes.node,
   title: PropTypes.string.isRequired,
   dot: PropTypes.bool,
   news: PropTypes.bool,
   to: PropTypes.string.isRequired,
};

export default MenuItem;
