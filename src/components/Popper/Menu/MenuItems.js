import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MenuItems({ dataItem, onClick }) {
   let Comp;
   dataItem.to ? (Comp = Link) : (Comp = 'li');

   return (
      <>
         <Comp className={dataItem.className} to={dataItem.to} onClick={onClick}>
            {dataItem.leftIcon}
            <span>{dataItem.title}</span>
            {dataItem.rightIcon}
            {dataItem.htmls && dataItem.htmls}
         </Comp>
      </>
   );
}

MenuItems.propTypes = {
   dataItem: PropTypes.object.isRequired,
   onClick: PropTypes.func,
};

export default MenuItems;
