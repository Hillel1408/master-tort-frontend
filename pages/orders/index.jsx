import classNames from 'classnames';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { OrdersNav } from '../../components/OrdersNav';
import { OrderCake } from '../../components/OrderCake';
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
    const [boards, setBoards] = useState('');

    useEffect(() => {
        const filterOrders = async (orders) => {
            //создаем доску с заказами
            const ordersFiltered = [
                {
                    id: 1,
                    title: 'Предстоящие',
                    textLink: 'Добавить заказы',
                    items: [],
                },
                {
                    id: 2,
                    title: 'Закупка',
                    textLink: 'Составить закупку',
                    items: [],
                },
                {
                    id: 3,
                    title: 'В работе',
                    textLink: '',
                    items: [],
                },
                {
                    id: 4,
                    title: 'Готово',
                    textLink: 'Отправить в архив',
                    items: [],
                },
            ];
            //забираем не архивные заказы и фильтруем их по статусу заказа
            orders.forEach((item) => {
                if (item.type !== 'archive') {
                    switch (item.type) {
                        case 'upcoming':
                            ordersFiltered[0].items.push(item);
                            break;
                        case 'purchase':
                            ordersFiltered[1].items.push(item);
                            break;
                        case 'in-work':
                            ordersFiltered[2].items.push(item);
                            break;
                        case 'ready':
                            ordersFiltered[3].items.push(item);
                            break;
                    }
                }
            });
            setBoards(ordersFiltered);
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
                                    {boards &&
                                        boards.map((board) => (
                                            <div
                                                className={styles.kanbanColumn}
                                            >
                                                <span
                                                    className={classNames(
                                                        'text',
                                                        styles.kanbanTitle
                                                    )}
                                                >
                                                    {board.title}
                                                </span>
                                                <div
                                                    className={
                                                        styles.kanbanOrders
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.kanbanWrapper
                                                        }
                                                    >
                                                        {board.items &&
                                                            board.items.map(
                                                                (item) => (
                                                                    <OrderCake
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        name={
                                                                            item.orderName
                                                                        }
                                                                        number={
                                                                            item.number
                                                                        }
                                                                        date={
                                                                            item.date
                                                                        }
                                                                        image={
                                                                            item
                                                                                .imagesUrl[0]
                                                                        }
                                                                        style="kanbanCake"
                                                                        draggable={
                                                                            true
                                                                        }
                                                                    />
                                                                )
                                                            )}
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
                                                                {board.textLink}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
