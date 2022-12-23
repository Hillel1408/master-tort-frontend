import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import { Modal } from '../../components/Modal';
import AuthService from '../../services/AuthService';
import OrdersService from '../../services/OrdersService';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';
import styles from '../purchase/Purchase.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function ArchiveOrders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState(undefined);
    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    const deleteOrder = async () => {
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
            <Modal active={modal} setActive={setModal} closeIcon={true}>
                <p className={classNames('text', styles.modalText)}>
                    Подтвердите действие
                </p>
                <div className={styles.modalButtons}>
                    <button
                        className={classNames(stylesBtn.btn, 'small-text')}
                        onClick={() => {
                            setModal(false);
                            document.body.classList.remove('lock');
                        }}
                    >
                        Отмена
                    </button>
                    <button
                        className={classNames(
                            stylesBtn.btn,
                            stylesBtn.btn__secondary,
                            'small-text'
                        )}
                        onClick={() => deleteOrder()}
                    >
                        Ok
                    </button>
                </div>
            </Modal>
        </Layout>
    );
}
