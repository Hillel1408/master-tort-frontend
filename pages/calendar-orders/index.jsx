import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import classNames from 'classnames';
import Head from 'next/head';

import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Confirm } from '../../components/Confirm';
import { OrdersNav } from '../../components/OrdersNav';
import { Td } from '../../components/pages/calendar-orders/Td';

import styles from './CalendarOrders.module.scss';
import OrdersService from '../../services/OrdersService';

export default function CalendarOrders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [nums, setNums] = useState();
    const [day, setDay] = useState();
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [dateNow, setDateNow] = useState();
    const [orders, setOrders] = useState();
    const [filteredOrders, setFilteredOrders] = useState();
    const [activeDay, setActiveDay] = useState('');
    const [isActive, setIsActive] = useState('');
    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    const { dataUser_2 } = useSelector((state) => state.cakes);

    const monthArr = [
        ['январь', 'января'],
        ['февраль', 'февраля'],
        ['март', 'марта'],
        ['апрель', 'апреля'],
        ['май', 'мая'],
        ['июнь', 'июня'],
        ['июль', 'июля'],
        ['август', 'августа'],
        ['сентябрь', 'сентября'],
        ['октябрь', 'октября'],
        ['ноябрь', 'ноября'],
        ['декабрь', 'декабря'],
    ];

    //формируем массив с днями месяца
    const range = (count) => {
        let mas = [];
        for (let i = 1; i <= count; i++) {
            mas.push(i);
        }
        return mas;
    };

    //получаем последний день предыдущего месяца
    const getLastDayPrewMonth = (year, month) => {
        let date = new Date(year, month, 0);
        return date.getDate();
    };

    //получаем последний день месяца
    const getLastDay = (year, month) => {
        let date = new Date(year, month + 1, 0);
        return date.getDate();
    };

    //получаем номер дня недели первого дня месяца
    const getFirstWeekDay = (year, month) => {
        let date = new Date(year, month, 1);
        let num = date.getDay();
        if (num == 0) {
            return 6;
        } else {
            return num - 1;
        }
    };

    //получаем номер дня недели последнего дня месяца
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
        //добавляем в массив с днями месяца дни предыдущего месяца и последующего
        for (let i = LastDayPrewMonth; i > LastDayPrewMonth - left; i--) {
            arr.unshift(i);
        }
        for (let i = 1; i <= right; i++) {
            arr.push(i);
        }
        return arr;
    };

    const chunk = (arr, n) => {
        //формируем двумерный массив с днями месяца по 7 дней в строку
        let result = [];
        let count = Math.ceil(arr.length / n);
        for (let i = 0; i < count; i++) {
            let elems = arr.splice(0, n);
            result.push(elems);
        }
        return result;
    };

    const toUpperCase = (str) => {
        //делаем первую букву заглавной
        let newStr = str[0].toUpperCase() + str.slice(1);
        return newStr;
    };

    const draw = (year, month) => {
        let arr = range(getLastDay(year, month));
        let firstWeekDay = getFirstWeekDay(year, month);
        let lastWeekDay = getLastWeekDay(year, month);
        //записываем в стейт текущий месяц и год для отображения на календаре
        setDateNow(toUpperCase(monthArr[month][0]) + ' ' + year);
        return chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
    };

    const getNextYear = (year, month) => {
        //следующий год
        if (month == 11) return ++year;
        else return year;
    };

    const getNextMonth = (month) => {
        //следующий месяц
        if (month == 11) return 0;
        else return ++month;
    };

    const getPrevYear = (year, month) => {
        //предыдущий год
        if (month == 0) return --year;
        else return year;
    };

    const getPrevMonth = (month) => {
        //предыдущий месяц
        if (month == 0) return 11;
        else return --month;
    };

    const nextClickHandler = () => {
        //получаем следующий месяц, и когда нужно меняем год
        const month2 = getNextMonth(month);
        setYear(getNextYear(year, month));
        setMonth(month2);
        setActiveDay('');
    };

    const prevClickHandler = () => {
        //получаем предыдущий месяц, и когда нужно меняем год
        setYear(getPrevYear(year, month));
        setMonth(getPrevMonth(month));
        setActiveDay('');
    };

    useEffect(() => {
        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getOrders(userId);
                const newOrders = response.data.filter((item) => {
                    return item.status !== 'delete';
                });
                setOrders(newOrders);
                //получаем текущий год, месяц и день
                const date = new Date();
                setYear(date.getFullYear());
                setMonth(date.getMonth());
                setDay(date.getDate());
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = () => {
            setDataUser(dataUser_2);
            getOrders(dataUser_2.id);
        };
        if (dataUser_2) checkAuth();
        else setIsAuth(false);
    }, []);

    const filterOrders = (orders, year, month) => {
        //фильтруем и получаем в стейт заказы текущего месяца на календаре
        const asd = {};
        const today = new Date();
        orders.forEach((item) => {
            const date = new Date(
                dateFormat(item.date, 'yyyy-mm-dd') +
                    'T' +
                    dateFormat(item.time, 'HH:MM')
            );
            if (date.getMonth() === month && date.getFullYear() === year) {
                //проверяем является ли заказ срочным
                const day = date.getDate();
                const a = (date - today) / (1000 * 3600 * 24);
                let status = '';
                if (a > 0 && a <= dataUser.rushOrder.value) status = 'urgent';
                else if (a < 0) status = 'archive';
                else status = 'ordinary';
                const obj = {
                    ...item,
                    isRushOrder: status,
                };
                asd[day] ? (asd[day] = [...asd[day], obj]) : (asd[day] = [obj]);
            }
        });
        setFilteredOrders(asd);
    };

    const deleteOrder = async () => {
        //удаляем заказ пользователя
        setModal(false);
        document.body.classList.remove('lock');
        filteredOrders[activeDay].map((item, index) => {
            if (item._id === itemId) {
                filteredOrders[activeDay].splice(index, 1);
                if (filteredOrders[activeDay].length === 0) {
                    setActiveDay('');
                }
            }
        });
        orders.map((a, index) => {
            if (a._id === itemId) {
                orders.splice(index, 1);
            }
        });
        try {
            const response = await OrdersService.deleteOrder(itemId, {
                userId: dataUser.id,
            });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    useEffect(() => {
        if (month !== undefined) {
            const date = new Date();
            //записываем в стейт массив с днями месяца для отображения на календаре
            setNums(draw(year, month));
            filterOrders(orders, year, month);
            //проверяем является ли отображаемые месяц и год текущими, чтобы выделить текущий день
            year === date.getFullYear() && month === date.getMonth()
                ? setIsActive(true)
                : setIsActive(false);
        }
    }, [month]);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Календарь"
        >
            <Head>
                <title>Календарь</title>
            </Head>
            <OrdersNav visibleTabs={true} />
            <div className={styles.root}>
                <div className={styles.block}>
                    <div className={styles.container}>
                        {nums && (
                            <>
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
                                            <tr key={indexTr}>
                                                {item.map((amount, indexTd) => (
                                                    <Td
                                                        key={indexTd}
                                                        st={
                                                            (indexTr === 0 &&
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
                                                        count={
                                                            filteredOrders[
                                                                amount
                                                            ] &&
                                                            filteredOrders[
                                                                amount
                                                            ].length > 0 &&
                                                            filteredOrders[
                                                                amount
                                                            ].length
                                                        }
                                                        isRushOrder={
                                                            filteredOrders[
                                                                amount
                                                            ] &&
                                                            filteredOrders[
                                                                amount
                                                            ].length > 0 &&
                                                            filteredOrders[
                                                                amount
                                                            ][0].isRushOrder
                                                        }
                                                        today={
                                                            amount === day &&
                                                            isActive
                                                        }
                                                        activeDay={activeDay}
                                                        setActiveDay={
                                                            setActiveDay
                                                        }
                                                    />
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.orders}>
                    {activeDay ? (
                        <>
                            <h2
                                className="text"
                                style={{
                                    marginBottom: '20px',
                                }}
                            >
                                {`Заказы ${activeDay} ${monthArr[month][1]} ${year}`}
                            </h2>
                            <div className={styles.overflow}>
                                {filteredOrders[activeDay].map((item) => (
                                    <OrderCake
                                        key={item._id}
                                        item={item}
                                        type={
                                            item.status === 'archive' &&
                                            'archive'
                                        }
                                        bg={
                                            item.status === 'archive' &&
                                            '#f4f2f1'
                                        }
                                        style="calendarCake"
                                        rushOrder={dataUser.rushOrder.value}
                                        setModal={setModal}
                                        setItemId={setItemId}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.ordersNo}>
                            <span className="icon-9"></span>
                            <p className="text">
                                Выберите дату, чтобы посмотреть заказы
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Confirm modal={modal} setModal={setModal} func={deleteOrder} />
        </Layout>
    );
}
