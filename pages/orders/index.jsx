import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { OrdersNav } from '../../components/OrdersNav';
import { OrderCake } from '../../components/OrderCake';
import { Modal } from '../../components/Modal';
import { Confirm } from '../../components/Confirm';
import OrdersService from '../../services/OrdersService';
import styles from './Orders.module.scss';
import stylesBtn from '../../components/Btn/Btn.module.scss';
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';

export default function Orders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [boards, setBoards] = useState();
    const [currentBoard, setCurrentBoard] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    const { dataUser_2 } = useSelector((state) => state.cakes);

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
        console.log(1);
        console.log(board);
        if (board.items.length > 0) {
            let flag = false;
            //проверяем есть ли заказ с актуальной датой
            const today = new Date();
            board.items.map((item) => {
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
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const droptIndex = board.items.indexOf(item);
        board.items.splice(droptIndex + 1, 0, currentItem);
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

    const checkOrders = (orders) => {
        //проверяем есть ли заказы
        return (
            orders.inWork.length ||
            orders.purchase.length ||
            orders.ready.length ||
            orders.upcoming.length
        );
    };

    const deleteOrder = async () => {
        //удаляем заказ пользователя
        let flag = true;
        setModal(false);
        document.body.classList.remove('lock');
        boards.map((a) => {
            a.items.map((b, index) => {
                if (b._id === itemId) {
                    a.items.splice(index, 1);
                }
            });
            if (a.items.length > 0) {
                flag = false;
            }
        });
        if (flag) setBoards('');
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
            //создаем доску, если у нас есть заказы
            if (orders && checkOrders(orders)) {
                const ordersFiltered = [
                    {
                        id: 1,
                        title: 'Предстоящие',
                        type: 'upcoming',
                        textLink: 'Добавить заказы',
                        function: '',
                        items: orders.upcoming,
                        link: '/',
                    },
                    {
                        id: 2,
                        title: 'Закупка',
                        type: 'purchase',
                        textLink: 'Составить закупку',
                        function: '',
                        items: orders.purchase,
                        link: '/purchase',
                    },
                    {
                        id: 3,
                        title: 'В работе',
                        type: 'inWork',
                        textLink: '',
                        function: '',
                        items: orders.inWork,
                    },
                    {
                        id: 4,
                        title: 'Готово',
                        type: 'ready',
                        textLink: 'Отправить в архив',
                        function: 'sendArchive',
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
                                                dragEndHandler={dragEndHandler}
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
                                                setModal={setModal}
                                                setItemId={setItemId}
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
                                                board.function ===
                                                    'sendArchive' &&
                                                    sendArchive(
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
                <button
                    className={classNames(
                        stylesBtn.btn,
                        stylesBtn.btn__secondary,
                        'small-text'
                    )}
                    style={{ marginTop: '14px' }}
                    onClick={() => {
                        setModalActive(false);
                        document.body.classList.remove('lock');
                    }}
                >
                    Понятно
                </button>
            </Modal>
            <Confirm modal={modal} setModal={setModal} func={deleteOrder} />
        </Layout>
    );
}
