import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseCookies, setCookie } from 'nookies';
import Head from 'next/head';
import classNames from 'classnames';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { OrderCake } from '../../components/OrderCake';
import { Tr } from '../../components/pages/purchase/Tr';
import { Alert } from '../../components/Alert';
import { Confirm } from '../../components/Confirm';
import { setAlert } from '../../redux/cakeSlice';
import AuthService from '../../services/AuthService';
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
    const [sumProducts, setSumProducts] = useState(true);
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
                    if (obj[tableItem.recipe.value]) {
                        obj[tableItem.recipe.value].products.map(
                            (item, index2) => {
                                item.products.map((elem, index3) => {
                                    obj[tableItem.recipe.value].products[
                                        index2
                                    ].products[index3].net =
                                        obj[tableItem.recipe.value].products[
                                            index2
                                        ].products[index3].net +
                                        order.calculation[index].products[
                                            index2
                                        ].products[index3].net;
                                });
                            }
                        );
                    } else
                        obj[tableItem.recipe.value] = {
                            label: tableItem.recipe.label,
                            products: order.calculation[index].products,
                        };
                });
            });
            console.log(obj);
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
                                {orders.map((item) => (
                                    <OrderCake
                                        key={item.id}
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
                                                    Начинка
                                                </div>
                                                <div className={stylesTable.th}>
                                                    Кольца
                                                </div>
                                                <div className={stylesTable.th}>
                                                    Рецепт
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={stylesTable.tbody}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.total}>
                            <p className={classNames('text', styles.totalText)}>
                                Итоговая стоимость продуктов
                            </p>
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
