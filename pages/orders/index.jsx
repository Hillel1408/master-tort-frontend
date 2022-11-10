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
import stylesNoAccess from '../../components/NoAccess/NoAccess.module.scss';
import stylesOrder from '../../components/OrderCake/OrderCake.module.scss';

export default function Orders() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [boards, setBoards] = useState();
    const [currentBoard, setCurrentBoard] = useState('');
    const [currentItem, setCurrentItem] = useState('');

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
        //очищаем архив в стейте и на сервере
        try {
            //проверяем есть ли вообще элементы на доске "архив"
            if (board.items.length > 0) {
                const response = await OrdersService.updateOrders(
                    dataUser.id,
                    board
                );
                let copy = Object.assign([], boards);
                copy[3].items = [];
                //если заказов на досках не осталось то скрываем доски и выводим сообщение
                if (checkKanbanOrders(boards)) setBoards(copy);
                else setBoards('');
            }
        } catch (e) {
            console.log(e.response?.data?.message);
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
            if (checkOrders(orders)) {
                const ordersFiltered = [
                    {
                        id: 1,
                        title: 'Предстоящие',
                        type: 'upcoming',
                        textLink: 'Добавить заказы',
                        items: orders.upcoming,
                    },
                    {
                        id: 2,
                        title: 'Закупка',
                        type: 'purchase',
                        textLink: 'Составить закупку',
                        items: orders.purchase,
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
                            height={34}
                            width={34}
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
                                {boards ? (
                                    <div className={styles.kanban}>
                                        {boards.map((board) => (
                                            <div
                                                className={classNames(
                                                    styles.kanbanColumn,
                                                    'column'
                                                )}
                                                onDragOver={(e) =>
                                                    dragOverHandler(e)
                                                }
                                                onDrop={(e) =>
                                                    dropCardHandler(e, board)
                                                }
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
                                                                        style="kanbanCake"
                                                                        draggable={
                                                                            true
                                                                        }
                                                                        dragOverHandler={
                                                                            dragOverHandler
                                                                        }
                                                                        dragLeaveHandler={
                                                                            dragLeaveHandler
                                                                        }
                                                                        dragStartHandler={
                                                                            dragStartHandler
                                                                        }
                                                                        dragEndHandler={
                                                                            dragEndHandler
                                                                        }
                                                                        dropHandler={
                                                                            dropHandler
                                                                        }
                                                                        item={
                                                                            item
                                                                        }
                                                                        board={
                                                                            board
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                    </div>
                                                    <div
                                                        className={classNames(
                                                            'addBlock',
                                                            'addBlock__noIcon',
                                                            styles.addBlock
                                                        )}
                                                    >
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
