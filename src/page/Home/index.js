import classNames from 'classnames/bind';
import styles from '~/page/Home/Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
   return <h1 className={cx('wrapper')}>Đây là trang Home</h1>;
}

export default Home;
