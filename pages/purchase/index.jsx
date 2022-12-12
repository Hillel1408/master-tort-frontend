import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Tr } from '../../components/pages/purchase/Tr';
import AuthService from '../../services/AuthService';
import OrdersService from '../../services/OrdersService';
import styles from './Purchase.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';

export default function Purchase() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState([]);
    const [sumProducts, setSumProducts] = useState('');

    useEffect(() => {
        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                response.data && setOrders(response.data.purchase);
                console.log(response.data.purchase);
                const sumProducts = {};
                response.data.purchase.map((item) => {
                    item.total.map((product, index) => {
                        if (index !== item.total.length - 1) {
                            sumProducts[product.id]
                                ? (sumProducts[product.id] = {
                                      ...sumProducts[product.id],
                                      count:
                                          sumProducts[product.id].count +
                                          product.count,
                                      price:
                                          sumProducts[product.id].price +
                                          product.price,
                                  })
                                : (sumProducts[product.id] = {
                                      name: product.name,
                                      count: product.count,
                                      price: product.price,
                                  });
                        }
                    });
                });
                console.log(sumProducts);
                setSumProducts(sumProducts);
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
            title="Закупка"
        >
            {orders.length > 0 ? (
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={classNames('text', styles.title)}>
                            Выбранные заказы
                        </h2>
                        {orders.length > 0 && (
                            <div className={styles.orders}>
                                {orders.map((item) => (
                                    <OrderCake key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                        <Link href="/">
                            <div className="addBlock">
                                <span
                                    className={classNames(
                                        'small-text',
                                        'icon-8'
                                    )}
                                >
                                    Добавить заказы
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.column}>
                        <div className={stylesTable.overflow}>
                            <div
                                className={classNames(
                                    stylesTable.table,
                                    'small-text',
                                    styles.table
                                )}
                            >
                                <div className={stylesTable.wrapperHead}>
                                    <div className={stylesTable.th}>
                                        <input type="checkbox" />
                                    </div>
                                    <div
                                        className={classNames(
                                            'text',
                                            stylesTable.thead
                                        )}
                                        style={{
                                            gridTemplateColumns:
                                                '33.3% 33.3% 33.3%',
                                        }}
                                    >
                                        <div className={stylesTable.th}>
                                            Наименование
                                        </div>
                                        <div className={stylesTable.th}>
                                            Количество
                                        </div>
                                        <div className={stylesTable.th}>
                                            Стоимость, ₽
                                        </div>
                                    </div>
                                </div>
                                <div className={stylesTable.tbody}>
                                    {sumProducts &&
                                        Object.keys(sumProducts).map(
                                            (keyObj) => (
                                                <Tr
                                                    key={keyObj}
                                                    product={
                                                        sumProducts[keyObj]
                                                    }
                                                />
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.total}>
                            <p className={classNames('text', styles.totalText)}>
                                Итоговая стоимость продуктов
                            </p>
                            <span
                                className={classNames(
                                    'text',
                                    styles.totalPrice
                                )}
                            >
                                4260.80 ₽
                            </span>
                        </div>
                        <button
                            className={classNames(stylesBtn.btn, 'small-text')}
                            href="#"
                        >
                            Печать
                        </button>
                    </div>
                </div>
            ) : (
                <h2
                    className={classNames(
                        'title',
                        stylesNoAccess.noOrders,
                        stylesNoAccess.title
                    )}
                >
                    У вас нет заказов в закупке
                </h2>
            )}
        </Layout>
    );
}
