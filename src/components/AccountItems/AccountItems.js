import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Image from "../Image";

import styles from "./AccountItems.module.scss";
import { CheckedIcon } from "../Icons";

const cx = classNames.bind(styles);

function AccountItems({ data }) {
   return (
      <Link to={`/@${data.nickname}`} className={cx("wrapper")}>
         <div className={cx("account-container")}>
            <li>
               <Image className={cx("avatar")} alt={data.full_name} src={data.avatar} />
               <div className={cx("content")}>
                  <div className={cx("name")}>
                     <span>{data.nickname}</span>
                     {data.tick && <CheckedIcon />}
                  </div>
                  <span className={cx("user-name")}>{data.full_name}</span>
               </div>
            </li>
         </div>
      </Link>
   );
}

AccountItems.propTypes = {
   data: PropTypes.object.isRequired,
};

export default AccountItems;
