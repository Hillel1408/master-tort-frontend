import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrderCake } from '../../components/OrderCake';
import { OrdersNav } from '../../components/OrdersNav';
import styles from './Orders.module.scss';
import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { NoAccess } from '../../components/NoAccess';
import AuthService from '../../services/AuthService';
import OrdersService from '../../services/OrdersService';
import stylesHeader from '../../components/Header/Header.module.scss';
import stylesLogin from '../login/Login.module.scss';

export default function Orders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [orders, setOrders] = useState('');

    useEffect(() => {
        const filterOrders = async (orders) => {
            //забираем в стейт только архивные заказы
            const archiveOrders = orders.filter((item) => {
                return item.type !== 'archive';
            });
            setOrders(archiveOrders);
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getOrders(userId);
                filterOrders(response.data);
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
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);
    return (
        <div className={classNames('wrapper', 'container')}>
            <Sidebar />
            <div className="content">
                <header className={stylesHeader.root}>
                    <h1 className={classNames('title', stylesHeader.title)}>
                        Заказы
                    </h1>
                    {isAuth !== '' ? (
                        <Header
                            userName={dataUser.fullName}
                            isAuth={isAuth}
                            setIsAuth={setIsAuth}
                        />
                    ) : (
                        <Oval
                            height={40}
                            width={40}
                            color="#009998"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#7a7a7a"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    )}
                </header>
                <main className="main">
                    {isAuth !== '' ? (
                        isAuth ? (
                            <>
                                <OrdersNav visibleTabs={true} />
                                <div className={styles.kanban}>
                                    <div className={styles.kanbanColumn}>
                                        <span
                                            className={classNames(
                                                'text',
                                                styles.kanbanTitle
                                            )}
                                        >
                                            Предстоящие
                                        </span>
                                        <div className={styles.kanbanOrders}>
                                            <div
                                                className={styles.kanbanWrapper}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className={styles.kanbanColumn}>
                                        <span
                                            className={classNames(
                                                'text',
                                                styles.kanbanTitle
                                            )}
                                        >
                                            Закупка
                                        </span>
                                        <div className={styles.kanbanOrders}>
                                            <div
                                                className={styles.kanbanWrapper}
                                            >
                                                <div className="addBlock">
                                                    <span
                                                        className={classNames(
                                                            'small-text',
                                                            'icon-8'
                                                        )}
                                                    >
                                                        Составить список
                                                        продуктов для закупки
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.kanbanColumn}>
                                        <span
                                            className={classNames(
                                                'text',
                                                styles.kanbanTitle
                                            )}
                                        >
                                            В работе
                                        </span>
                                        <div className={styles.kanbanOrders}>
                                            <div
                                                className={styles.kanbanWrapper}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className={styles.kanbanColumn}>
                                        <span
                                            className={classNames(
                                                'text',
                                                styles.kanbanTitle
                                            )}
                                        >
                                            Готово
                                        </span>
                                        <div className={styles.kanbanOrders}>
                                            <div
                                                className={styles.kanbanWrapper}
                                            >
                                                <div
                                                    className={classNames(
                                                        'addBlock',
                                                        'addBlock__noIcon'
                                                    )}
                                                >
                                                    <span
                                                        className={classNames(
                                                            'small-text',
                                                            'icon-8'
                                                        )}
                                                    >
                                                        Отправить в архив
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <NoAccess
                                title={'Доступ закрыт'}
                                text={
                                    'Зарегистрируйтесь или войдите в учетную запись, чтобы использовать все возможности сервиса'
                                }
                                linkBtn={'/login'}
                                textBtn={'Войти'}
                            />
                        )
                    ) : (
                        <div className={stylesLogin.wrapper}>
                            <Oval
                                height={40}
                                width={40}
                                color="#009998"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#7a7a7a"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    )}
                </main>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}
