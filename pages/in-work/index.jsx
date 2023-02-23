import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Alert } from '../../components/Alert';
import { Tr } from '../../components/pages/in-work/Tr';
import { Confirm } from '../../components/Confirm';
import OrdersService from '../../services/OrdersService';
import styles from '../purchase/Purchase.module.scss';
import stylesTable from '../../components/Table/Table.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';
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

    const clickHandler = () => {};

    useEffect(() => {
        const sumProducts = (data) => {
            const obj = {};
            data.map((order) => {
                order.table.map((tableItem, index) => {
                    const a = tableItem.recipe.value;
                    if (obj[a]) {
                        obj[a].rings.push(
                            `⌀ ${tableItem.diameter}` + ` ↑ ${tableItem.height}`
                        );
                        obj[a].products.map((item, index2) => {
                            item.products.map((index3) => {
                                obj[a].products[index2].products[index3].net =
                                    obj[a].products[index2].products[index3]
                                        .net +
                                    order.calculation[index].products[index2]
                                        .products[index3].net;
                            });
                        });
                    } else
                        obj[a] = {
                            label: tableItem.recipe.label,
                            rings: [
                                `⌀ ${tableItem.diameter}` +
                                    ` ↑ ${tableItem.height}`,
                            ],
                            products: order.calculation[index].products,
                        };
                });
            });
            setSumProducts(obj);
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                if (response.data) {
                    setOrders(response.data.inWork);
                    sumProducts(response.data.inWork);
                }
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
                                                    gridTemplateColumns: '100%',
                                                }}
                                            >
                                                <div className={stylesTable.th}>
                                                    Наименование
                                                </div>
                                            </div>
                                        </div>
                                        <div className={stylesTable.tbody}>
                                            {Object.keys(sumProducts).map(
                                                (keyObj) => (
                                                    <Tr
                                                        key={keyObj}
                                                        cake={
                                                            sumProducts[keyObj]
                                                                .label
                                                        }
                                                        rings={
                                                            sumProducts[keyObj]
                                                                .rings
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
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
                    У вас нет заказов в работе
                </h2>
            )}
            <Alert />
            <Confirm modal={modal} setModal={setModal} />
        </Layout>
    );
}
