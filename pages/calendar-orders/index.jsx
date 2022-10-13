import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import styles from './CalendarOrders.module.scss';

export default function CalendarOrders() {
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <Header title="Заказы" />
                <main className="main">
                    <OrdersNav visibleTabs={true} />
                    <div className={styles.root}>
                        <div className={styles.block}>
                            <div className={styles.container}>
                                <div className={styles.header}>
                                    <span
                                        className={classNames(
                                            'text',
                                            styles.title
                                        )}
                                    >
                                        Сентябрь 2022
                                    </span>
                                    <div className={styles.nav}>
                                        <span
                                            className={classNames(
                                                'icon-29',
                                                styles.next
                                            )}
                                        ></span>
                                        <span
                                            className={classNames(
                                                'icon-30',
                                                styles.prev
                                            )}
                                        ></span>
                                    </div>
                                </div>
                                <table className={styles.table}>
                                    <thead className={styles.thead}>
                                        <tr
                                            className={classNames(
                                                'small-text',
                                                styles.smallText
                                            )}
                                        >
                                            <th>пн</th>
                                            <th>вт</th>
                                            <th>ср</th>
                                            <th>чт</th>
                                            <th>пт</th>
                                            <th>сб</th>
                                            <th>вс</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    26
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    27
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    28
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    29
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    30
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    31
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.statusArchive,
                                                        styles.status
                                                    )}
                                                >
                                                    1<div>4</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.statusOrdinary,
                                                        styles.status
                                                    )}
                                                >
                                                    5<div>4</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    6
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    7
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    8
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.status}>
                                                    9
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    10
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    11
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    12
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    13
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    14
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.statusArchive,
                                                        styles.status
                                                    )}
                                                >
                                                    15<div>4</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.status}>
                                                    16
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    17
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    18
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.statusOrdinary,
                                                        styles.status
                                                    )}
                                                >
                                                    19<div>4</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    20
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    21
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    22
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.statusUrgent,
                                                        styles.status
                                                    )}
                                                >
                                                    23<div>4</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    24
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    25
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    26
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    27
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    28
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.statusUrgent,
                                                        styles.status
                                                    )}
                                                >
                                                    29<div>4</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.status}>
                                                    30
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.status}>
                                                    31
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.status
                                                    )}
                                                >
                                                    5
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={styles.orders}>
                            <div className={styles.overflow}>
                                <OrderCake style="calendarCake" />
                                <OrderCake style="calendarCake" />
                                <OrderCake style="calendarCake" />
                                <OrderCake style="calendarCake" />
                                <OrderCake style="calendarCake" />
                            </div>
                            <div
                                className={styles.ordersNo}
                                style={{ display: 'none' }}
                            >
                                <span className="icon-9"></span>
                                <p className="text">
                                    Выберите дату, чтобы посмотреть заказы
                                </p>
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
