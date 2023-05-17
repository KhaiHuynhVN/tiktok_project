import classNames from 'classnames/bind';
import styles from '~/page/Home/Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
   return <div className={cx('wrapper')}>Đây là trang Home</div>;
}

export default Home;
