import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '~/components/Popper/Menu/Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onClick }) {
   return (
      <header className={cx('header')}>
         <button onClick={onClick}>
            <i className="fa-solid fa-chevron-left"></i>
         </button>
         <span>{title}</span>
      </header>
   );
}

Header.propTypes = {
   title: PropTypes.node.isRequired,
   onClick: PropTypes.func.isRequired,
};

export default Header;
