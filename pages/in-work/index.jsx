import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import Head from 'next/head';
import classNames from 'classnames';
import Link from 'next/link';

import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Alert } from '../../components/Alert';
import { setAlert } from '../../redux/cakeSlice';
import { Tr } from '../../components/pages/in-work/Tr';
import { NoAccess } from '../../components/NoAccess';
import { Confirm } from '../../components/Confirm';

import OrdersService from '../../services/OrdersService';

import styles from '../purchase/Purchase.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';

export default function Purchase() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState([]);
    const [sumProducts, setSumProducts] = useState('');
    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    const dispatch = useDispatch();

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
        if (orders.length === 0) setOrders([]);
        try {
            const response = await OrdersService.deleteOrder(itemId, {
                userId: dataUser.id,
            });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const saveSettings = async () => {
        try {
            //сохраняем рецепты пользователя
            const response = await OrdersService.updateTable(
                dataUser.id,
                orders
            );
            dispatch(
                setAlert({
                    text: 'Рецепты успешно сохранены',
                    color: '#62ac62',
                })
            );
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAlert({ text: 'Возникла ошибка', color: '#c34a43' }));
        }
    };

    useEffect(() => {
        const sumProducts = (data) => {
            //считаем сумму продуктов по ярусам
            const obj = {};

            data.map((order) => {
                order.table.map((tableItem, index) => {
                    const a = tableItem.recipe.value;
                    const value = {
                        label: tableItem.recipe.label,
                        rings: [
                            `⌀ ${tableItem.diameter}` +
                                ` ↑ ${tableItem.height}`,
                        ],
                        checked: tableItem.checked,
                        products: order.calculation[index].products,
                        size: order.calculation[index].calculat.size,
                        id: [tableItem.id],
                        idRecipes: uuid(),
                    };
                    const pushFunc = (a) => {
                        obj[a].rings.push(
                            `⌀ ${tableItem.diameter}` + ` ↑ ${tableItem.height}`
                        );
                        obj[a].id.push(tableItem.id);
                    };
                    const func = (a) => {
                        obj[a].products.map((item, index2) => {
                            item.products.map((elem, index3) => {
                                obj[a].products[index2].products[index3].net +=
                                    order.calculation[index].products[
                                        index2
                                    ].products[index3].net;
                            });
                        });
                        obj[a].size += order.calculation[index].calculat.size;
                    };
                    if (obj[a]) {
                        if (tableItem.checked === obj[a].checked) {
                            pushFunc(a);
                            func(a);
                        } else {
                            if (obj[`${a}ch`]) {
                                pushFunc(`${a}ch`);
                                func(`${a}ch`);
                            } else
                                obj[`${a}ch`] = {
                                    ...value,
                                };
                        }
                    } else
                        obj[a] = {
                            ...value,
                        };
                });
            });
            setSumProducts(JSON.parse(JSON.stringify(obj)));
            localStorage.setItem('recipes', JSON.stringify(obj));
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                if (response.data) {
                    setOrders(response.data.inWork);
                    sumProducts(response.data.inWork);
                }
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

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="В работе"
        >
            <Head>
                <title>В работе</title>
            </Head>
            {orders.length > 0 ? (
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={classNames('text', styles.title)}>
                            Выбранные заказы
                        </h2>
                        {orders.length > 0 && (
                            <div className={styles.orders}>
                                {orders.map((item, index) => (
                                    <OrderCake
                                        key={index}
                                        item={item}
                                        style="purchaseCake"
                                        setModal={setModal}
                                        setItemId={setItemId}
                                        rushOrder={dataUser.rushOrder.value}
                                    />
                                ))}
                            </div>
                        )}
                        <Link href="/">
                            <div
                                className={classNames(
                                    'addBlock',
                                    styles.addBlock
                                )}
                            >
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
                    <div
                        className={classNames(styles.column, styles.workColumn)}
                    >
                        <div className={styles.workColumnWrapper}>
                            <h2 className={classNames('text', styles.title)}>
                                Рецепты
                            </h2>
                            <div className={classNames(styles.workGrid)}>
                                {sumProducts &&
                                    Object.keys(sumProducts).map((keyObj) => (
                                        <Tr
                                            key={keyObj}
                                            cake={sumProducts[keyObj].label}
                                            rings={sumProducts[keyObj].rings}
                                            checked={
                                                sumProducts[keyObj].checked
                                            }
                                            orders={orders}
                                            sumProducts={sumProducts}
                                            setSumProducts={setSumProducts}
                                            keyObj={keyObj}
                                            id={sumProducts[keyObj].id}
                                            idRecipes={
                                                sumProducts[keyObj].idRecipes
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className={styles.buttons}>
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
                <NoAccess
                    title={'У вас нет заказов в работе'}
                    text={
                        'Перенесите заказ в раздел "В работе" на канбан доске'
                    }
                    linkBtn={'/orders'}
                    textBtn={'Перенести'}
                />
            )}
            <Alert />
            <Confirm modal={modal} setModal={setModal} func={deleteOrder} />
        </Layout>
    );
}
