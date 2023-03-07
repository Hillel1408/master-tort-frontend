import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Tr } from '../../components/pages/purchase/Tr';
import { Alert } from '../../components/Alert';
import { Confirm } from '../../components/Confirm';
import { NoAccess } from '../../components/NoAccess';
import { setAlert } from '../../redux/cakeSlice';
import OrdersService from '../../services/OrdersService';
import styles from './Purchase.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import stylesCheckbox from '../../components/CustomCheckbox/Checkbox.module.scss';

export default function Purchase() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState([]);
    const [sumProducts, setSumProducts] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    const dispatch = useDispatch();

    const { dataUser_2 } = useSelector((state) => state.cakes);

    const clickHandler = () => {
        setCheckbox(!checkbox);
        sumProducts.map((item, index) => {
            index !== sumProducts.length - 1
                ? (item[1].checked = !checkbox)
                : '';
        });
        orders.map((order, orderIndex) => {
            order.total.map((a, totalIndex) => {
                totalIndex !== order.total.length - 1
                    ? (orders[orderIndex].total[totalIndex].checked = !checkbox)
                    : '';
            });
        });
        setSumProducts([...sumProducts]);
    };

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
            //сохраняем закупку пользователя
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
            let isChecked = true;
            data.map((item) => {
                item.total.map((product, index) => {
                    product.checked === false ? (isChecked = false) : '';
                    //вспомогательный объект и функция
                    const obj = {
                        name: product.name,
                        count: product.count,
                        price: product.price,
                        checked: product.checked,
                        key: [product.key],
                    };
                    const objFunc = (item) => {
                        return {
                            ...sum[item],
                            count: sum[item].count + product.count,
                            price: sum[item].price + product.price,
                            key: [...sum[item].key, product.key],
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
            setCheckbox(isChecked);
            //преобразуем объект в массив чтобы отсортировать по checked
            setSumProducts(
                Object.entries(sum).sort((a, b) => b[1].checked - a[1].checked)
            );
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                if (response.data) {
                    setOrders(response.data.purchase);
                    sumProducts(response.data.purchase);
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
        if (dataUser_2) checkAuth();
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
                    <div className={styles.column}>
                        <div className={stylesTable.overflow}>
                            <div
                                className={classNames(
                                    stylesTable.table,
                                    'small-text',
                                    styles.table
                                )}
                            >
                                {sumProducts && (
                                    <>
                                        <div
                                            className={stylesTable.wrapperHead}
                                        >
                                            <div
                                                className={stylesTable.th}
                                                style={{ display: 'flex' }}
                                            >
                                                <label
                                                    className={
                                                        stylesCheckbox.customCheckbox
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={checkbox}
                                                        readOnly
                                                    />
                                                    <span
                                                        onClick={() =>
                                                            clickHandler()
                                                        }
                                                    ></span>
                                                </label>
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
                                            {sumProducts.map(
                                                (item) =>
                                                    item[0] !== 'total' && (
                                                        <Tr
                                                            key={item[0]}
                                                            product={item[1]}
                                                            index={item[0]}
                                                            orders={orders}
                                                            sumProducts={
                                                                sumProducts
                                                            }
                                                            setSumProducts={
                                                                setSumProducts
                                                            }
                                                        />
                                                    )
                                            )}
                                        </div>
                                    </>
                                )}
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
                <NoAccess
                    title={'У вас нет заказов в закупке'}
                    text={'Перенесите заказ в раздел "Закупка" на канбан доске'}
                    linkBtn={'/orders'}
                    textBtn={'Перенести'}
                />
            )}
            <Alert />
            <Confirm modal={modal} setModal={setModal} func={deleteOrder} />
        </Layout>
    );
}
