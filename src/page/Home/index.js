import classNames from "classnames/bind";
import { useEffect } from "react";
import styles from "~/page/Home/Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
   useEffect(() => {
      // fetch("mongodb://127.0.0.1:27017")
      //    .then((res) => res.json())
      //    .then((res) => console.log(res));
   }, []);
   return <h1 className={cx("wrapper")}>Đây là trang Home</h1>;
}

export default Home;
