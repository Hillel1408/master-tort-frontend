import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import { Content } from './Content';
import { Buttons } from './Buttons';

import { API_URL } from '../../http';

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
                        src={`${API_URL}${item.imagesUrl[0]}`}
                        alt=""
                        draggable="false"
                        fill
                    />
                ) : (
                    <Image
                        src="/1.png"
                        alt=""
                        draggable="false"
                        fill
                        style={{ border: '2px solid #f4f2f1' }}
                    />
                )}
            </div>
            <div className={styles.content}>
                <Content item={item} />
                {draggable && (
                    <Buttons
                        board={board}
                        boards={boards}
                        updateStatusOrder={updateStatusOrder}
                        setBoards={setBoards}
                        item={item}
                    />
                )}
            </div>
        </Link>
    );
}

export { OrderCake };
