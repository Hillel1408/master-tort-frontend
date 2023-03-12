import { useState, useEffect } from 'react';
import dateFormat, { masks } from 'dateformat';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';
import { IMAGE_URL } from '../../http';
import styles from './OrderCake.module.scss';
import stylesOrders from '../../pages/orders/Orders.module.scss';

function OrderCake({
    dropHandler,
    style,
    bg,
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    board,
    dragStartHandler,
    draggable,
    item,
    type,
    boards,
    setBoards,
    updateStatusOrder,
    rushOrder,
    setModal,
    setItemId,
}) {
    const [typeOrder, setTypeOrder] = useState(type);

    const updateKanban = (index) => {
        const currentIndex = board.items.indexOf(item);
        let clone = JSON.parse(JSON.stringify(boards[index]));
        board.items.splice(currentIndex, 1);
        clone.items.unshift(item);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === clone.id) {
                    return clone;
                }
                return b;
            })
        );
        updateStatusOrder(clone, board);
    };

    const deleteOrder = (e) => {
        e.preventDefault();
        setModal(true);
        setItemId(item._id);
    };

    useEffect(() => {
        if (item.status !== 'archive') {
            const date = new Date(
                dateFormat(item.date, 'yyyy-mm-dd') +
                    'T' +
                    dateFormat(item.time, 'HH:MM')
            );
            const today = new Date();
            const a = (date - today) / (1000 * 3600 * 24);
            if (a < 0) setTypeOrder('normal');
            else if (a < rushOrder) setTypeOrder('urgent');
        }
    }, []);

    return (
        <Link
            href={`/${item._id}`}
            className={classNames(
                styles.root,
                styles[typeOrder],
                stylesOrders[style],
                'item'
            )}
            style={{ backgroundColor: `${bg}` }}
            draggable={draggable}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
        >
            <i
                className="icon-11"
                title="Удалить"
                onClick={(e) => deleteOrder(e)}
            ></i>
            <div className={styles.img}>
                {item.imagesUrl[0] ? (
                    <Image
                        src={`${IMAGE_URL}${item.imagesUrl[0]}`}
                        alt=""
                        draggable="false"
                        fill
                    />
                ) : (
                    <Image src="/1.png" alt="" draggable="false" fill />
                )}
            </div>
            <div className={styles.content}>
                <span className={classNames(styles.contentNumber, 'icon-27')}>
                    №{item.number}
                </span>
                <p className={classNames(styles.contentText, 'small-text')}>
                    {item.orderName}
                </p>
                <div className={styles.contentBlock}>
                    <span
                        className={classNames(
                            styles.contentDate,
                            'icon-9',
                            'small-text'
                        )}
                    >
                        {dateFormat(item.date, 'mm/dd/yyyy')}
                    </span>
                    <span
                        className={classNames(styles.contentTime, 'small-text')}
                    >
                        {dateFormat(item.time, 'HH:MM')}
                    </span>
                </div>
                {draggable && (
                    <div className={styles.contentButton}>
                        <button
                            title="Назад"
                            className={classNames('small-text')}
                            disabled={board.title === 'Предстоящие'}
                            onClick={(e) => {
                                e.preventDefault();
                                let index = '';
                                switch (board.title) {
                                    case 'Закупка':
                                        index = 0;
                                        break;
                                    case 'В работе':
                                        index = 1;
                                        break;
                                    case 'Готово':
                                        index = 2;
                                        break;
                                }
                                updateKanban(index);
                            }}
                        >
                            ←
                        </button>
                        <button
                            title="Вперед"
                            className={classNames('small-text')}
                            disabled={board.title === 'Готово'}
                            onClick={(e) => {
                                e.preventDefault();
                                let index = '';
                                switch (board.title) {
                                    case 'Предстоящие':
                                        index = 1;
                                        break;
                                    case 'Закупка':
                                        index = 2;
                                        break;
                                    case 'В работе':
                                        index = 3;
                                        break;
                                }
                                updateKanban(index);
                            }}
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}

export { OrderCake };
