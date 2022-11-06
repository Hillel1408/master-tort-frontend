import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import styles from './CalendarOrders.module.scss';
import { Td } from './Td';

export default function CalendarOrders() {
    const [nums, setNums] = useState();
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [dateNow, setDateNow] = useState();
    const monthArr = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

    const range = (count) => {
        let mas = [];
        for (let i = 1; i <= count; i++) {
            mas.push(i);
        }
        return mas;
    };
    const getLastDayPrewMonth = (year, month) => {
        let date = new Date(year, month, 0);
        return date.getDate();
    };
    const getLastDay = (year, month) => {
        let date = new Date(year, month + 1, 0);
        return date.getDate();
    };
    const getFirstWeekDay = (year, month) => {
        let date = new Date(year, month, 1);
        let num = date.getDay();
        if (num == 0) {
            return 6;
        } else {
            return num - 1;
        }
    };
    const getLastWeekDay = (year, month) => {
        let date = new Date(year, month + 1, 0);
        let num = date.getDay();
        if (num == 0) {
            return 6;
        } else {
            return num - 1;
        }
    };
    const normalize = (arr, left, right) => {
        const LastDayPrewMonth = getLastDayPrewMonth(year, month);
        for (let i = LastDayPrewMonth; i > LastDayPrewMonth - left; i--) {
            arr.unshift(i);
        }
        for (let i = 1; i <= right; i++) {
            arr.push(i);
        }
        return arr;
    };
    const chunk = (arr, n) => {
        let result = [];
        let count = Math.ceil(arr.length / n);
        for (let i = 0; i < count; i++) {
            let elems = arr.splice(0, n);
            result.push(elems);
        }
        return result;
    };
    const draw = (year, month) => {
        let arr = range(getLastDay(year, month));
        let firstWeekDay = getFirstWeekDay(year, month);
        let lastWeekDay = getLastWeekDay(year, month);
        setDateNow(monthArr[month] + ' ' + year);
        return chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
    };
    const getNextYear = (year, month) => {
        if (month == 11) return ++year;
        else return year;
    };
    const getNextMonth = (month) => {
        if (month == 11) return 0;
        else return ++month;
    };
    const getPrevYear = (year, month) => {
        if (month == 0) return --year;
        else return year;
    };
    const getPrevMonth = (month) => {
        if (month == 0) return 11;
        else return --month;
    };
    const nextClickHandler = () => {
        setYear(getNextYear(year, month));
        setMonth(getNextMonth(month));
    };
    const prevClickHandler = () => {
        setYear(getPrevYear(year, month));
        setMonth(getPrevMonth(month));
    };

    useEffect(() => {
        let date = new Date();
        setYear(date.getFullYear());
        setMonth(date.getMonth());
    }, []);

    useEffect(() => {
        setNums(draw(year, month));
    }, [month]);

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
                                        {dateNow}
                                    </span>
                                    <div className={styles.nav}>
                                        <span
                                            className={classNames(
                                                'icon-29',
                                                styles.prev
                                            )}
                                            onClick={() => prevClickHandler()}
                                        ></span>
                                        <span
                                            className={classNames(
                                                'icon-30',
                                                styles.next
                                            )}
                                            onClick={() => nextClickHandler()}
                                        ></span>
                                    </div>
                                </div>
                                {nums && (
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
                                            {nums.map((item, indexTr) => (
                                                <tr>
                                                    {item.map(
                                                        (amount, indexTd) => (
                                                            <Td
                                                                st={
                                                                    (indexTr ===
                                                                        0 &&
                                                                        indexTd <
                                                                            getFirstWeekDay(
                                                                                year,
                                                                                month
                                                                            )) ||
                                                                    (indexTr ===
                                                                        nums.length -
                                                                            1 &&
                                                                        indexTd >=
                                                                            item.length -
                                                                                (6 -
                                                                                    getLastWeekDay(
                                                                                        year,
                                                                                        month
                                                                                    )))
                                                                        ? true
                                                                        : false
                                                                }
                                                                amount={amount}
                                                            />
                                                        )
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                        <div className={styles.orders}>
                            <div className={styles.overflow}></div>
                            <div className={styles.ordersNo}>
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
