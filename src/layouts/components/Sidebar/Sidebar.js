import classNames from 'classnames/bind';

import { Menu, MenuItem } from './Menu';
import {
   CompassIconOutline,
   CompassIconSolid,
   EverybodyIconOutline,
   EverybodyIconSolid,
   HomeIconOutline,
   HomeIconSolid,
   LiveIconOutline,
   LiveIconSolid,
} from '~/components/Icons';

import styles from './Sidebar.module.scss';
import { routes } from '~/config';

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <aside className={cx('container')}>
         <div className={cx('wrapper')}>
            <Menu>
               <MenuItem
                  leftIcon={<HomeIconOutline />}
                  activeIcon={<HomeIconSolid />}
                  title="For You"
                  to={routes.home}
               />
               <MenuItem
                  leftIcon={<EverybodyIconOutline />}
                  activeIcon={<EverybodyIconSolid />}
                  title="Following"
                  dot
                  to={routes.following}
               />
               <MenuItem
                  leftIcon={<CompassIconOutline />}
                  activeIcon={<CompassIconSolid />}
                  title="Explore"
                  news
                  to={routes.explore}
               />
               <MenuItem
                  leftIcon={<LiveIconOutline />}
                  activeIcon={<LiveIconSolid />}
                  title="LIVE"
                  to={routes.live}
               />
            </Menu>
         </div>
      </aside>
   );
}

export default Sidebar;
