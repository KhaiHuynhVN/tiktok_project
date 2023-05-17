import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
   to,
   href,
   primary,
   outline,
   round,
   text,
   size = 'medium',
   disabled,
   leftIcon,
   rightIcon,
   className,
   children,
   onClick,
   ...passProps
}) {
   let Comp = 'button';
   const classes = cx('wrapper', {
      primary,
      outline,
      round,
      text,
      disabled,
      [size]: size,
      [className]: className,
   });

   const _props = {
      onClick,
      ...passProps,
   };

   if (disabled) {
      Object.keys(_props).forEach((key) => {
         key.startsWith('on') && typeof _props[key] === 'function' && delete _props[key];
      });
   }

   if (to) {
      _props.to = to;
      Comp = Link;
   }
   if (href) {
      _props.href = href;
      Comp = 'a';
   }

   return (
      <Comp className={classes} {..._props}>
         {leftIcon && <span>{leftIcon}</span>}
         <span>{children}</span>
         {rightIcon && <span>{rightIcon}</span>}
      </Comp>
   );
}

Button.propTypes = {
   to: PropTypes.string,
   href: PropTypes.string,
   size: PropTypes.string,
   className: PropTypes.string,
   primary: PropTypes.bool,
   outline: PropTypes.bool,
   round: PropTypes.bool,
   text: PropTypes.bool,
   disabled: PropTypes.bool,
   leftIcon: PropTypes.node,
   rightIcon: PropTypes.node,
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func,
};

export default Button;
