import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, scrollbar = false }) {
   const classes = cx('wrapper', {
      scrollbar,
   });
   return <div className={classes}>{children}</div>;
}

Wrapper.propTypes = {
   children: PropTypes.node.isRequired,
   scrollbar: PropTypes.bool,
};

export default Wrapper;
