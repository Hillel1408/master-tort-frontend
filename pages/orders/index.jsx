import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { OrdersNav } from '../../components/OrdersNav';
import { OrderCake } from '../../components/OrderCake';
import { Modal } from '../../components/Modal';
import AuthService from '../../services/AuthService';
import OrdersService from '../../services/OrdersService';
import styles from './Orders.module.scss';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';

export default function Orders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [boards, setBoards] = useState();
    const [currentBoard, setCurrentBoard] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [modalActive, setModalActive] = useState(false);

    const updateStatusOrder = async (currentBoard, board) => {
        //обновляем доски на сервере, так как у них меняются элементы и их порядок
        const values = {
            userId: dataUser.id,
            currentBoard: currentBoard,
            board: board,
        };
        try {
            const response = await OrdersService.setKanban(values);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const checkKanbanOrders = (boards) => {
        //проверяем остались ли у нас заказы на досках,
        let flag = false;
        boards.forEach((item) => {
            if (item.items.length > 0) flag = true;
        });
        return flag;
    };

    const sendArchive = async (dataUser, boards, board) => {
        //проверяем есть ли вообще элементы на доске "архив"
        if (board.items.length > 0) {
            let flag = false;
            //проверяем есть ли заказ с актуальной датой
            board.items.map((item) => {
                const today = new Date();
                const date = new Date(item.date + 'T' + item.time);
                if ((date - today) / (1000 * 3600 * 24) > 0) flag = true;
            });
            if (flag) {
                //если есть то выводим модалку с сообщением
                setModalActive(true);
            } else {
                try {
                    const response = await OrdersService.updateOrders(
                        dataUser.id,
                        board
                    );
                    let copy = Object.assign([], boards);
                    copy[3].items = [];
                    //если заказов на досках не осталось то скрываем доски и выводим сообщение
                    if (checkKanbanOrders(boards)) setBoards(copy);
                    else setBoards('');
                } catch (e) {
                    console.log(e.response?.data?.message);
                }
            }
        }
    };

    const dragOverHandler = (e) => {
        //срабатывает когда мы находимся над каким-то другим элементом
        e.preventDefault();
        if (e.currentTarget.closest(`.item`)) {
            e.currentTarget.style.boxShadow = '0 4px 3px grey';
        }
    };

    const dragLeaveHandler = (e) => {
        //срабатывает когда мы вошли за пределы другого элемента
        e.currentTarget.style.boxShadow = 'none';
    };

    const dragStartHandler = (e, board, item) => {
        //срабатывает когда мы взяли элемент
        setCurrentBoard(board);
        setCurrentItem(item);
    };

    const dragEndHandler = (e) => {
        //срабатывает когда мы отпустили элемент
        e.currentTarget.style.boxShadow = 'none';
    };

    const dropHandler = (e, board, item) => {
        //срабатывает когда мы отпустили элемент
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.boxShadow = 'none';
        //индекс в массиве у текущего элемента, которую держим в руке
        const currentIndex = currentBoard.items.indexOf(currentItem);
        //удаляем этот элемент из текущей доски
        currentBoard.items.splice(currentIndex, 1);
        //индекс элемента над которым мы держим элемент
        const droptIndex = board.items.indexOf(item);
        //вставляем после этого элемента элемент который держим в руке
        board.items.splice(droptIndex + 1, 0, currentItem);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    //возвращаем доску которую мы изменили
                    return board;
                }
                if (b.id === currentBoard.id) {
                    //возвращаем доску которую мы изменили
                    return currentBoard;
                }
                //возвращаем просто элемент итерации
                return b;
            })
        );
        updateStatusOrder(currentBoard, board);
    };

    const dropCardHandler = (e, board) => {
        board.items.push(currentItem);
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
        e.currentTarget.style.boxShadow = 'none';
        updateStatusOrder(currentBoard, board);
    };

    //проверяем есть ли заказы
    const checkOrders = (orders) => {
        return (
            orders.inWork.length ||
            orders.purchase.length ||
            orders.ready.length ||
            orders.upcoming.length
        );
    };

    useEffect(() => {
        const filterOrders = async (orders) => {
            //создаем доску, если у нас есть заказы
            if (orders && checkOrders(orders)) {
                const ordersFiltered = [
                    {
                        id: 1,
                        title: 'Предстоящие',
                        type: 'upcoming',
                        textLink: 'Добавить заказы',
                        items: orders.upcoming,
                        link: '/',
                    },
                    {
                        id: 2,
                        title: 'Закупка',
                        type: 'purchase',
                        textLink: 'Составить закупку',
                        items: orders.purchase,
                        link: '/purchase',
                    },
                    {
                        id: 3,
                        title: 'В работе',
                        type: 'inWork',
                        textLink: '',
                        items: orders.inWork,
                    },
                    {
                        id: 4,
                        title: 'Готово',
                        type: 'ready',
                        textLink: 'Отправить в архив',
                        function: sendArchive,
                        items: orders.ready,
                    },
                ];
                setBoards(ordersFiltered);
            } else setBoards('');
        };

        const getOrders = async (userId) => {
            //получаем заказы пользователя
            try {
                const response = await OrdersService.getKanban(userId);
                filterOrders(response.data);
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
            title="Заказы"
        >
            <Head>
                <title>Заказы</title>
            </Head>
            <OrdersNav visibleTabs={true} />
            {boards ? (
                <div className={styles.kanban}>
                    {boards.map((board) => (
                        <div
                            className={classNames(
                                styles.kanbanColumn,
                                'column'
                            )}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropCardHandler(e, board)}
                        >
                            <span
                                className={classNames(
                                    'text',
                                    styles.kanbanTitle
                                )}
                            >
                                {board.title}
                            </span>
                            <div className={styles.kanbanOrders}>
                                <div className={styles.kanbanWrapper}>
                                    {board.items &&
                                        board.items.map((item) => (
                                            <OrderCake
                                                key={item._id}
                                                style="kanbanCake"
                                                draggable={true}
                                                dragOverHandler={
                                                    dragOverHandler
                                                }
                                                dragLeaveHandler={
                                                    dragLeaveHandler
                                                }
                                                dragStartHandler={
                                                    dragStartHandler
                                                }
                                                dragEndHandler={dragEndHandler}
                                                dropHandler={dropHandler}
                                                item={item}
                                                board={board}
                                                boards={boards}
                                                setBoards={setBoards}
                                                updateStatusOrder={
                                                    updateStatusOrder
                                                }
                                                rushOrder={
                                                    dataUser.rushOrder.value
                                                }
                                            />
                                        ))}
                                </div>
                                <div
                                    className={classNames(
                                        'addBlock',
                                        'addBlock__noIcon',
                                        styles.addBlock
                                    )}
                                >
                                    {board.link ? (
                                        <Link href={board.link}>
                                            <span
                                                className={classNames(
                                                    'small-text',
                                                    'icon-8'
                                                )}
                                            >
                                                {board.textLink}
                                            </span>
                                        </Link>
                                    ) : (
                                        <span
                                            className={classNames(
                                                'small-text',
                                                'icon-8'
                                            )}
                                            onClick={() => {
                                                board.function &&
                                                    board.function(
                                                        dataUser,
                                                        boards,
                                                        board
                                                    );
                                            }}
                                        >
                                            {board.textLink}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                boards !== undefined && (
                    <h2
                        className={classNames(
                            'title',
                            stylesNoAccess.noOrders,
                            stylesNoAccess.title
                        )}
                    >
                        У вас нет активных заказов
                    </h2>
                )
            )}
            <Modal
                active={modalActive}
                setActive={setModalActive}
                closeIcon={true}
            >
                <span className="icon-16"></span>
                <p className={classNames('text', styles.modalText)}>
                    Нельзя отправить в архив заказы с актуальной датой
                </p>
            </Modal>
        </Layout>
    );
}
