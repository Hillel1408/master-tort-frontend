import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import styles from './Orders.module.scss';

export default function Orders() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Заказы" />
                <main className="main">
                    <OrdersNav visibleTabs={true} />
                    <div className={styles.kanban}>
                        <div className={styles.kanbanColumn}>
                            <span
                                className={classNames(
                                    'text',
                                    styles.kanbanTitle
                                )}
                            >
                                Предстоящие
                            </span>
                            <div className={styles.kanbanOrders}>
                                <div className={styles.kanbanWrapper}>
                                    <OrderCake style="kanbanCake" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.kanbanColumn}>
                            <span
                                className={classNames(
                                    'text',
                                    styles.kanbanTitle
                                )}
                            >
                                Закупка
                            </span>
                            <div className={styles.kanbanOrders}>
                                <div className={styles.kanbanWrapper}>
                                    <OrderCake style="kanbanCake" />
                                    <div className="addBlock">
                                        <span
                                            className={classNames(
                                                'small-text',
                                                'icon-8'
                                            )}
                                        >
                                            Составить список продуктов для
                                            закупки
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.kanbanColumn}>
                            <span
                                className={classNames(
                                    'text',
                                    styles.kanbanTitle
                                )}
                            >
                                В работе
                            </span>
                            <div className={styles.kanbanOrders}>
                                <div className={styles.kanbanWrapper}>
                                    <OrderCake style="kanbanCake" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.kanbanColumn}>
                            <span
                                className={classNames(
                                    'text',
                                    styles.kanbanTitle
                                )}
                            >
                                Готово
                            </span>
                            <div className={styles.kanbanOrders}>
                                <div className={styles.kanbanWrapper}>
                                    <OrderCake style="kanbanCake" />
                                    <div
                                        className={classNames(
                                            'addBlock',
                                            'addBlock__noIcon'
                                        )}
                                    >
                                        <span
                                            className={classNames(
                                                'small-text',
                                                'icon-8'
                                            )}
                                        >
                                            Отправить в архив
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
