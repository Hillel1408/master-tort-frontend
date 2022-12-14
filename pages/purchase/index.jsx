import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Tr } from '../../components/pages/purchase/Tr';
import { Alert } from '../../components/Alert';
import { setAlert } from '../../redux/cakeSlice';
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

    const dispatch = useDispatch();

    const saveSettings = async () => {
        try {
            const response = await OrdersService.updateTotal(
                dataUser.id,
                orders
            );
            dispatch(
                setAlert({
                    text: 'Закупка успешно сохранена',
                    color: '#62ac62',
                })
            );
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
    };

    useEffect(() => {
        //считаем сумму продуктов и общий итог по ярусам
        const sumProducts = (data) => {
            const sum = {};
            let total = 0;
            data.map((item) => {
                item.total.map((product, index) => {
                    //вспомогательный объект и функция
                    const obj = {
                        name: product.name,
                        count: product.count,
                        price: product.price,
                        checked: product.checked,
                    };
                    const objFunc = (item) => {
                        return {
                            ...sum[item],
                            count: sum[item].count + product.count,
                            price: sum[item].price + product.price,
                        };
                    };
                    //последний элемент не сморим, так как там итог
                    if (index !== item.total.length - 1) {
                        //если продукт с ID уже есть в нашем объекте, то...
                        if (sum[product.id]) {
                            //делим продукты на закупленные и не закупленные
                            if (sum[product.id].checked === product.checked)
                                sum[product.id] = {
                                    ...objFunc(product.id),
                                };
                            else {
                                //хз как объяснить но работает отлично :D
                                if (sum[`${product.id}ch`])
                                    sum[`${product.id}ch`] = {
                                        ...objFunc(`${product.id}ch`),
                                    };
                                else
                                    sum[`${product.id}ch`] = {
                                        ...obj,
                                    };
                            }
                        } //иначе создаем его
                        else
                            sum[product.id] = {
                                ...obj,
                            };
                    } else total = total + product;
                });
            });
            sum.total = total;
            //преобразуем объект в массив чтобы отсортировать по checked
            setSumProducts(
                Object.entries(sum).sort((a, b) => b[1].checked - a[1].checked)
            );
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                response.data && setOrders(response.data.purchase);
                sumProducts(response.data.purchase);
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
            <Head>
                <title>Закупка</title>
            </Head>
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
                                    <div
                                        className={stylesTable.th}
                                        style={{ display: 'flex' }}
                                    >
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
                                        sumProducts.map(
                                            (item) =>
                                                item[0] !== 'total' && (
                                                    <Tr
                                                        key={item[0]}
                                                        product={item[1]}
                                                        index={item[0]}
                                                        orders={orders}
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
                            {sumProducts && (
                                <span
                                    className={classNames(
                                        'text',
                                        styles.totalPrice
                                    )}
                                >
                                    {`${sumProducts[
                                        sumProducts.length - 1
                                    ][1].toFixed(2)} руб.`}
                                </span>
                            )}
                        </div>
                        <div className={styles.buttons}>
                            <button
                                className={classNames(
                                    stylesBtn.btn,
                                    'small-text'
                                )}
                                onClick={() => {
                                    window.print();
                                }}
                            >
                                Печать
                            </button>
                            <button
                                className={classNames(
                                    stylesBtn.btn,
                                    stylesBtn.btn__secondary,
                                    'small-text'
                                )}
                                onClick={() => saveSettings()}
                            >
                                Сохранить
                            </button>
                        </div>
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
            <Alert />
        </Layout>
    );
}
