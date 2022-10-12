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
                    <div className={styles.orders__calendar}>
                        <div className={styles.orders__calendarBlock}>
                            <div className={styles.orders__calendarContainer}>
                                <div className={styles.orders__calendarHeader}>
                                    <span
                                        className={classNames(
                                            'text',
                                            styles.orders__calendarTitle
                                        )}
                                    >
                                        Сентябрь 2022
                                    </span>
                                    <div className={styles.orders__calendarNav}>
                                        <span
                                            className={classNames(
                                                'icon-29',
                                                styles.orders__calendarNext
                                            )}
                                        ></span>
                                        <span
                                            className={classNames(
                                                'icon-30',
                                                styles.orders__calendarPrev
                                            )}
                                        ></span>
                                    </div>
                                </div>
                                <table className={styles.orders__calendarTable}>
                                    <thead
                                        className={styles.orders__calendarThead}
                                    >
                                        <tr
                                            className={classNames(
                                                'small-text',
                                                styles.orders__calendarSmallText
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
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    26
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    27
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    28
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    29
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    30
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    31
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.orders__calendarStatus_archive,
                                                        styles.orders__calendarStatus
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
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.orders__calendarStatus_ordinary,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    5<div>4</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    6
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    7
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    8
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
                                                    9
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    10
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    11
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    12
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    13
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    14
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.orders__calendarStatus_archive,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    15<div>4</div>
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
                                                    16
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    17
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    18
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.orders__calendarStatus_ordinary,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    19<div>4</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    20
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    21
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    22
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.orders__calendarStatus_urgent,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    23<div>4</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    24
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    25
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    26
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    27
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    28
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.orders__calendarStatus_urgent,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    29<div>4</div>
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
                                                    30
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        styles.orders__calendarStatus
                                                    }
                                                >
                                                    31
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    1
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    2
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    3
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
                                                    )}
                                                >
                                                    4
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={classNames(
                                                        styles.st,
                                                        styles.orders__calendarStatus
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
                        <div className={styles.orders__calendarOrders}>
                            <div className={styles.orders__calendarOverflow}>
                                <OrderCake style="orders__calendarCake" />
                                <OrderCake style="orders__calendarCake" />
                                <OrderCake style="orders__calendarCake" />
                                <OrderCake style="orders__calendarCake" />
                                <OrderCake style="orders__calendarCake" />
                            </div>
                            <div
                                className={styles.orders__calendarOrders_no}
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
