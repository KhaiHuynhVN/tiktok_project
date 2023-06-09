import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import HeadLessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper/index';
import MenuItems from './MenuItems';
import Header from './Header';

import styles from '~/components/Popper/Menu/Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items = [], onChange = () => {} }) {
   const [history, setHistory] = useState([{ data: items }]);
   const current = history[history.length - 1];

   const renderItems = () => {
      return current.data.map((item, index) => {
         const isParent = !!item.children;
         return (
            <MenuItems
               key={index}
               dataItem={item}
               onClick={(e) =>
                  isParent
                     ? setHistory((prev) => [...prev, item.children])
                     : onChange(item, e.target)
               }
            />
         );
      });
   };

   const handleBack = () => setHistory((pre) => pre.slice(0, history.length - 1));

   const renderMenu = (attrs) => (
      <div className={cx('menu')} tabIndex="-1" {...attrs}>
         <PopperWrapper>
            {history.length > 1 && <Header title={current.title || ''} onClick={handleBack} />}
            <div className={cx({ 'menu-container': history.length > 1 })}>{renderItems()}</div>
         </PopperWrapper>
      </div>
   );

   const handleResetMenu = () => setHistory((pre) => [pre[0]]);

   return (
      // Wrap thẻ <div> cho HeadLessTippy là để fix warning của Tippy
      <div>
         <HeadLessTippy
            hideOnClick={false}
            interactive
            delay={[0, 600]}
            offset={[20, 12]}
            placement="bottom-end"
            render={renderMenu}
            onHidden={handleResetMenu}
         >
            {children}
         </HeadLessTippy>
      </div>
   );
}

Menu.propTypes = {
   children: PropTypes.node.isRequired,
   items: PropTypes.array,
   onChange: PropTypes.func,
};

export default Menu;
