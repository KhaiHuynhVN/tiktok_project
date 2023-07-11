import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import HeadLessTippy from "@tippyjs/react/headless";
import { useSpring, motion } from "framer-motion";

import { Wrapper as PopperWrapper } from "~/components/Popper/index";
import MenuItems from "./MenuItems";
import Header from "./Header";

import styles from "~/components/Popper/Menu/Menu.module.scss";

const cx = classNames.bind(styles);

function Menu({ children, items = [], onChange = () => {} }) {
   const [history, setHistory] = useState([{ data: items }]);
   const current = history[history.length - 1];

   const [isOpen, setIsOpen] = useState(false);
   const durationClose = 0.3;
   const variants = {
      open: { opacity: 1, transition: { duration: 0 } },
      closed: { opacity: 0, transition: { duration: durationClose } },
   };

   let unmountTippy = useRef();

   useEffect(() => {
      return () => {
         unmountTippy.current && clearTimeout(unmountTippy);
      };
   });

   function onMount() {
      setIsOpen(true);
   }

   function onHide({ unmount }) {
      unmountTippy.current = setTimeout(() => unmount(), durationClose * 1000);
      setIsOpen(false);
   }

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
      <motion.div
         className={cx("menu")}
         animate={isOpen ? "open" : "closed"}
         variants={variants}
         tabIndex="-1"
         {...attrs}
      >
         <PopperWrapper>
            {history.length > 1 && <Header title={current.title || ""} onClick={handleBack} />}
            <div className={cx({ "menu-container": history.length > 1 })}>{renderItems()}</div>
         </PopperWrapper>
      </motion.div>
   );

   const handleResetMenu = () => setHistory((pre) => [pre[0]]);

   return (
      // Wrap thẻ <div> cho HeadLessTippy là để fix warning của Tippy
      <div>
         <HeadLessTippy
            hideOnClick={false}
            interactive
            delay={[0, 700]}
            offset={[20, 12]}
            placement="bottom-end"
            animation={true}
            render={renderMenu}
            onMount={onMount}
            onHide={(e) => {
               handleResetMenu();
               onHide(e);
            }}
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
