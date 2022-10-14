import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import styles from '../purchase/Purchase.module.scss';

export default function ArchiveOrders() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Заказы" />
                <main className="main">
                    <OrdersNav visibleTabs={false} />
                    <div className={styles.orders}>
                        <OrderCake type="archive" />
                        <OrderCake type="archive" />
                        <OrderCake type="archive" />
                        <OrderCake type="archive" />
                        <OrderCake type="archive" />
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}