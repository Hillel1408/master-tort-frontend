import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import styles from './CalendarOrders.module.scss';
import { Td } from './Td';
import AuthService from '../../services/AuthService';
import stylesHeader from '../../components/Header/Header.module.scss';
import { Oval } from 'react-loader-spinner';
import stylesLogin from '../login/Login.module.scss';
import { NoAccess } from '../../components/NoAccess';
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
        //получаем следующий месяц, и когда нужно меняем год
        setYear(getNextYear(year, month));
        setMonth(getNextMonth(month));
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
                setOrders(response.data);
                //получаем текущий год, месяц и день
                const date = new Date();
                setYear(date.getFullYear());
                setMonth(date.getMonth());
                setDay(date.getDate());
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };

        const checkAuth = async () => {
            //проверяем авторизован ли пользователь
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                setIsAuth(true);
                getOrders(response.data.user.id);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    const filterOrders = (orders, year, month) => {
        //фильтруем и получаем в стейт заказы текущего месяца на календаре
        const asd = {};
        orders.forEach((item) => {
            const date = new Date(item.date);
            if (date.getMonth() === month && date.getFullYear() === year) {
                const day = date.getDate();
                asd[day]
                    ? (asd[day] = [...asd[day], item])
                    : (asd[day] = [item]);
            }
        });
        setFilteredOrders(asd);
    };

    useEffect(() => {
        if (month) {
            console.log(123);
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
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <header className={stylesHeader.root}>
                    <h1 className={classNames('title', stylesHeader.title)}>
                        Заказы
                    </h1>
                    {isAuth !== '' ? (
                        <Header
                            userName={dataUser.fullName}
                            isAuth={isAuth}
                            setIsAuth={setIsAuth}
                        />
                    ) : (
                        <Oval
                            height={34}
                            width={34}
                            color="#009998"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#7a7a7a"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    )}
                </header>
                <main className="main">
                    {isAuth !== '' ? (
                        isAuth ? (
                            <>
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
                                                        onClick={() =>
                                                            prevClickHandler()
                                                        }
                                                    ></span>
                                                    <span
                                                        className={classNames(
                                                            'icon-30',
                                                            styles.next
                                                        )}
                                                        onClick={() =>
                                                            nextClickHandler()
                                                        }
                                                    ></span>
                                                </div>
                                            </div>
                                            {nums && (
                                                <table className={styles.table}>
                                                    <thead
                                                        className={styles.thead}
                                                    >
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
                                                        {nums.map(
                                                            (item, indexTr) => (
                                                                <tr>
                                                                    {item.map(
                                                                        (
                                                                            amount,
                                                                            indexTd
                                                                        ) => (
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
                                                                                amount={
                                                                                    amount
                                                                                }
                                                                                count={
                                                                                    filteredOrders[
                                                                                        amount
                                                                                    ] &&
                                                                                    filteredOrders[
                                                                                        amount
                                                                                    ]
                                                                                        .length
                                                                                }
                                                                                today={
                                                                                    amount ===
                                                                                        day &&
                                                                                    isActive
                                                                                }
                                                                                activeDay={
                                                                                    activeDay
                                                                                }
                                                                                setActiveDay={
                                                                                    setActiveDay
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
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
                                                <div
                                                    className={styles.overflow}
                                                >
                                                    {filteredOrders[
                                                        activeDay
                                                    ].map((item) => (
                                                        <OrderCake
                                                            key={item._id}
                                                            item={item}
                                                            type={item.status} //archive или kanban
                                                            bg={
                                                                item.status ===
                                                                    'archive' &&
                                                                '#f4f2f1'
                                                            }
                                                            style="calendarCake"
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className={styles.ordersNo}>
                                                <span className="icon-9"></span>
                                                <p className="text">
                                                    Выберите дату, чтобы
                                                    посмотреть заказы
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <NoAccess
                                title={'Доступ закрыт'}
                                text={
                                    'Зарегистрируйтесь или войдите в учетную запись, чтобы использовать все возможности сервиса'
                                }
                                linkBtn={'/login'}
                                textBtn={'Войти'}
                            />
                        )
                    ) : (
                        <div className={stylesLogin.wrapper}>
                            <Oval
                                height={40}
                                width={40}
                                color="#009998"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#7a7a7a"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    )}
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
