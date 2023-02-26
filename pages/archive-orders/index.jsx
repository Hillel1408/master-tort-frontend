import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import { Confirm } from '../../components/Confirm';
import OrdersService from '../../services/OrdersService';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';
import styles from '../purchase/Purchase.module.scss';

export default function ArchiveOrders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState(undefined);
    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    const { dataUser_2 } = useSelector((state) => state.cakes);

    const deleteOrder = async () => {
        //удаляем заказ пользователя
        setModal(false);
        document.body.classList.remove('lock');
        orders.map((a, index) => {
            if (a._id === itemId) {
                orders.splice(index, 1);
            }
        });
        if (orders.length === 0) setOrders('');
        try {
            const response = await OrdersService.deleteOrder(itemId, {
                userId: dataUser.id,
            });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    useEffect(() => {
        const filterOrders = async (orders) => {
            //забираем в стейт только архивные заказы
            const archiveOrders = orders.filter((item) => {
                return item.status === 'archive';
            });
            //сортируем по убыванию номера заказа
            archiveOrders.length > 0
                ? setOrders(archiveOrders.sort((a, b) => b.number - a.number))
                : setOrders('');
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getOrders(userId);
                filterOrders(response.data);
                console.log(response.data);
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

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Архив"
        >
            <Head>
                <title>Архив</title>
            </Head>
            <OrdersNav visibleTabs={false} />
            {orders ? (
                <div className={styles.archiveOrders}>
                    {orders.map((item) => (
                        <OrderCake
                            draggable={false}
                            key={item._id}
                            type={item.status}
                            item={item}
                            setModal={setModal}
                            setItemId={setItemId}
                            rushOrder={dataUser.rushOrder.value}
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
            <Confirm modal={modal} setModal={setModal} func={deleteOrder} />
        </Layout>
    );
}
