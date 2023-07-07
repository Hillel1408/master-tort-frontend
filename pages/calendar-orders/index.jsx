import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Confirm } from '../../components/Confirm';
import { OrdersNav } from '../../components/OrdersNav';
import { Header } from './Header';
import { Table } from './Table';

import { draw, monthArr, filterOrders } from './helpers';

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

    useEffect(() => {
        const getOrders = async (userId) => {
            try {
                const response = await OrdersService.getOrders(userId);
                const newOrders = response.data.filter((item) => {
                    return item.status !== 'delete';
                });
                setOrders(newOrders);
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

        dataUser_2 ? checkAuth() : setIsAuth(false);
    }, []);

    const deleteOrder = async () => {
        setModal(false);
        document.body.classList.remove('lock');
        filteredOrders[activeDay].map((item, index) => {
            if (item._id === itemId) {
                filteredOrders[activeDay].splice(index, 1);
                filteredOrders[activeDay].length === 0 && setActiveDay('');
            }
        });
        orders.map((a, index) => a._id === itemId && orders.splice(index, 1));
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

            setNums(draw(year, month, setDateNow));
            filterOrders(orders, year, month, dataUser, setFilteredOrders);
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
                                <Header
                                    dateNow={dateNow}
                                    month={month}
                                    setYear={setYear}
                                    year={year}
                                    setMonth={setMonth}
                                    setActiveDay={setActiveDay}
                                />
                                <Table
                                    nums={nums}
                                    year={year}
                                    month={month}
                                    filteredOrders={filteredOrders}
                                    day={day}
                                    activeDay={activeDay}
                                    setActiveDay={setActiveDay}
                                    isActive={isActive}
                                />
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
