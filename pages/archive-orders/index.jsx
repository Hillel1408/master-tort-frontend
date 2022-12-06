import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import AuthService from '../../services/AuthService';
import OrdersService from '../../services/OrdersService';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';
import styles from '../purchase/Purchase.module.scss';

export default function ArchiveOrders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState();

    useEffect(() => {
        const filterOrders = async (orders) => {
            //забираем в стейт только архивные заказы
            const archiveOrders = orders.filter((item) => {
                return item.status === 'archive';
            });
            archiveOrders.length > 0 ? setOrders(archiveOrders) : setOrders('');
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getOrders(userId);
                filterOrders(response.data);
                setIsAuth(true);
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
                getOrders(response.data.user.id);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Архив"
        >
            <OrdersNav visibleTabs={false} />
            {orders ? (
                <div className={styles.orders}>
                    {orders.map((item) => (
                        <OrderCake
                            draggable={false}
                            key={item._id}
                            type={item.status}
                            item={item}
                        />
                    ))}
                </div>
            ) : (
                orders !== undefined && (
                    <h2
                        className={classNames(
                            'title',
                            stylesNoAccess.noOrders,
                            stylesNoAccess.title
                        )}
                    >
                        У вас нет архивных заказов
                    </h2>
                )
            )}
        </Layout>
    );
}
